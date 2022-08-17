import React, { Component, Key } from "react";
import { connect } from "react-redux";
import * as actions from "store";

import axios from "axios";
import {
  OpenVidu,
  Publisher,
  Subscriber,
  Stream,
  StreamManager,
  Device,
  SignalEvent,
  StreamEvent,
} from "openvidu-browser";

import styled from "styled-components";

import UserVideoComponent from "./UserVideoComponent";
import { darkTheme } from "styles";
import { SessionStateType } from "./MeetingRoom";

const OPENVIDU_SERVER_URL =
  "https://" +
  window.location.hostname +
  (import.meta.env.VITE_OPENVIDU_SERVER_PORT || "");
const OPENVIDU_SERVER_SECRET = import.meta.env.VITE_OPENVIDU_SERVER_SECRET;

interface State {
  sessionState: SessionStateType;
  handleSessionState: Function;

  mySessionTitle?: string;
  mySessionId?: string;
  myUserName?: string;
  audioEnabled?: boolean;
  videoEnabled?: boolean;
  msgToSend?: string;
  emojiEvents?: Array<string>;
  chatEvents?: Array<string>;
  isDisplayEmoji?: boolean;
  currentVideoDevice?: Device | undefined;
  isPublic?: boolean;
  isHost?: boolean;
  setMySessionId?: Function;
  setMyUserName?: Function;
  setAudioEnabled?: Function;
  setVideoEnabled?: Function;
  setMsgToSend?: Function;
  setChatEvents?: Function;
  setEmojiEvents?: Function;
  setIsDisplayEmoji?: Function;
}
class VideoContainer extends Component<State, SessionStateType> {
  handleSessionState: (state: SessionStateType) => void;
  OV?: OpenVidu | null;
  constructor(props: State & Readonly<State>) {
    super(props);
    this.state = {
      session: props.sessionState.session,
      mainStreamManager: props.sessionState.mainStreamManager,
      publisher: props.sessionState.publisher,
      subscribers: props.sessionState.subscribers,
      currentVideoDevice: undefined,
    };

    this.handleSessionState = props.handleSessionState.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    // this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.recvSignal = this.recvSignal.bind(this);
  }

  componentDidMount() {
    this.joinSession();
  }

  componentWillUnmount() {
    this.leaveSession();
  }

  handleChangeSessionId(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setMySessionId!(e.target.value);
  }

  handleChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setMyUserName!(e.target.value);
  }

  handleMainVideoStream(stream: Publisher | Subscriber | Stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState(
        {
          mainStreamManager: stream,
        },
        () => {
          this.props.handleSessionState({ ...this.state });
        }
      );
    }
  }

  deleteSubscriber(streamManager: StreamManager) {
    const subscribers = this.state.subscribers;
    const index = subscribers.indexOf(streamManager as Subscriber, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState(
        {
          subscribers: subscribers,
        },
        () => {
          this.props.handleSessionState({ ...this.state });
        }
      );
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        const mySession = this.state.session;
        if (mySession === undefined) return;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event: StreamEvent) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = mySession.subscribe(
            event.stream,
            undefined as unknown as HTMLElement
          );
          const subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event: StreamEvent) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception: any) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token as string, { clientData: this.props.myUserName })
            .then(async () => {
              if (this.OV === null || this.OV === undefined) return;

              const devices = await this.OV.getDevices();
              const videoDevices = devices.filter(
                (device: Device) => device.kind === "videoinput"
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              const publisher = this.OV.initPublisher(
                undefined as unknown as HTMLElement,
                {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: undefined, // The source of video. If undefined default webcam
                  publishAudio: this.props.audioEnabled, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: this.props.videoEnabled, // Whether you want to start publishing with your video enabled or not
                  resolution: "1280x720", // The resolution of your video
                  frameRate: 30, // The frame rate of your video
                  insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                  mirror: true, // Whether to mirror your local video or not
                }
              );

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState(
                {
                  currentVideoDevice: videoDevices[0],
                  mainStreamManager: publisher,
                  publisher: publisher,
                },
                () => {
                  this.props.handleSessionState({
                    ...this.state,
                  });
                }
              );

              this.recvSignal();
            })
            .catch((error: { code: any; message: any }) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // clientSession 초기화
    this.props.setMySessionId!("SessionA");
    this.props.setMyUserName!("Participant" + Math.floor(Math.random() * 100));
    this.props.setAudioEnabled!(false);
    this.props.setVideoEnabled!(false);
    this.props.setMsgToSend!("");
    this.props.setChatEvents!(new Array());
    this.props.setEmojiEvents!(new Array(9).fill(""));
    this.props.setIsDisplayEmoji!(false);

    // Empty all properties...
    this.OV = null;
    this.setState(
      {
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: new Array(),
      },
      () => {
        this.props.handleSessionState({ ...this.state });
      }
    );
  }

  // async switchCamera() {
  //   try {
  //     const devices = await this.OV?.getDevices();
  //     const videoDevices = devices?.filter(
  //       (device: { kind: string }) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       const newVideoDevice = videoDevices.filter(
  //         (device: { deviceId: any }) =>
  //           device.deviceId !== this.state.currentVideoDevice!.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         const newPublisher = this.OV?.initPublisher(
  //           undefined as unknown as HTMLElement,
  //           {
  //             videoSource: newVideoDevice[0].deviceId,
  //             publishAudio: true,
  //             publishVideo: true,
  //             mirror: true,
  //           }
  //         );

  //         //newPublisher.once("accessAllowed", () => {
  //         await this.state.session.unpublish(this.state.mainStreamManager);

  //         await this.state.session.publish(newPublisher);
  //         this.setState({
  //           currentVideoDevice: newVideoDevice,
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  recvSignal() {
    const mySession = this.state.session;
    if (mySession === undefined) return;

    mySession.on("signal:emoji", (event: SignalEvent) => {
      if (event.from === undefined) return;
      if (this.state.publisher === undefined) return;

      console.log(event.data);
      console.log(event.from);
      console.log(event.type);

      const sender = event.from.connectionId;
      const publisher = this.state.publisher.stream.connection.connectionId;
      const subscribers = this.state.subscribers.map(
        (sub: Subscriber) => sub.stream.connection.connectionId
      );

      // connection.data "{\"clientData\":\"myUserName#105957535666388128155\"}"
      // connection.role "PUBLISHER"

      const idx = sender !== publisher ? subscribers.indexOf(sender) + 1 : 0;

      const newEmojiEvents = this.props.emojiEvents?.map(
        (emo: string, i: number) => (idx === i ? event.data : emo)
      );

      this.props.setEmojiEvents!(newEmojiEvents);
    });
  }

  render() {
    const { mySessionTitle, mySessionId, myUserName } = this.props;

    return (
      <Container>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <SessionWrapper>
            <SessionHeader>
              <SessionTitle>{mySessionTitle}</SessionTitle>
            </SessionHeader>

            <SessionBody>
              {/* PIP */}
              {/* {this.state.mainStreamManager !== undefined ? (
                <MainVideoContainer>
                  <UserVideoComponent
                    streamManager={this.state.mainStreamManager}
                  />
                  <input
                    type="button"
                    id="buttonSwitchCamera"
                    onClick={this.switchCamera}
                    value="Switch Camera"
                  />
                </MainVideoContainer>
              ) : null} */}

              {this.state.publisher !== undefined ? (
                <StreamContainer
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher!)
                  }
                >
                  <UserVideoComponent
                    idx={0}
                    streamManager={this.state.publisher}
                  />
                </StreamContainer>
              ) : null}

              {this.state.subscribers.map(
                (sub: Subscriber, i: Key | null | undefined) => (
                  <StreamContainer
                    key={i}
                    onClick={() => this.handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent
                      idx={Number(i) + 1}
                      streamManager={sub}
                    />
                  </StreamContainer>
                )
              )}
            </SessionBody>
          </SessionWrapper>
        ) : null}
      </Container>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.props.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId: unknown) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + window.btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
          },
        })
        .then((response) => {
          console.log("CREATE SESSION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          const error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId: unknown) {
    return new Promise((resolve, reject) => {
      const data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + window.btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const SessionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
const SessionHeader = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${darkTheme.adaptiveGrey800};
  border-radius: 0 6px 0 0;
  position: absolute;
  top: 0;
  box-sizing: border-box;
`;
const SessionTitle = styled.h1`
  font-size: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SessionBody = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  /* ratio 16:9 */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
`;
const MainVideoContainer = styled.div`
  width: 100%;
  height: auto;
`;
const StreamContainer = styled.div`
  width: 100%;
  height: auto;
`;

const mapStateToProps = (state: { clientSession: any }) => ({
  ...state.clientSession,
});
const mapDispatchToProps = (
  dispatch: (arg0: {
    payload: string | boolean | string[];
    type: string;
  }) => any
) => ({
  setMySessionId: (payload: string) =>
    dispatch(actions.setMySessionId(payload)),
  setMyUserName: (payload: string) => dispatch(actions.setMyUserName(payload)),
  setAudioEnabled: (payload: boolean) =>
    dispatch(actions.setAudioEnabled(payload)),
  setVideoEnabled: (payload: boolean) =>
    dispatch(actions.setVideoEnabled(payload)),
  setMsgToSend: (payload: string) => dispatch(actions.setMsgToSend(payload)),
  setChatEvents: (payload: string[]) =>
    dispatch(actions.setChatEvents(payload)),
  setEmojiEvents: (payload: string[]) =>
    dispatch(actions.setEmojiEvents(payload)),
  setIsDisplayEmoji: (payload: boolean) =>
    dispatch(actions.setIsDisplayEmoji(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
