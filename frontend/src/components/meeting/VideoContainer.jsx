import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "store";

import axios from "axios";
import { OpenVidu } from "openvidu-browser";

import styled from "styled-components";

import Button from "components/commons/Button";
import UserVideoComponent from "./UserVideoComponent";

const OPENVIDU_SERVER_URL =
  "https://" +
  window.location.hostname +
  (import.meta.env.VITE_OPENVIDU_SERVER_PORT || "");
const OPENVIDU_SERVER_SECRET = import.meta.env.VITE_OPENVIDU_SERVER_SECRET;

class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: props.sessionState.session,
      mainStreamManager: props.sessionState.mainStreamManager,
      publisher: props.sessionState.publisher,
      subscribers: props.sessionState.subscribers,
    };

    this.handleSessionState = props.handleSessionState.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.sendEmojiSignal = this.sendEmojiSignal.bind(this);
    this.recvSignal = this.recvSignal.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.props.setMySessionId(e.target.value);
  }

  handleChangeUserName(e) {
    this.props.setMyUserName(e.target.value);
  }

  handleMainVideoStream(stream) {
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

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
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

  // 수정완료
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

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = mySession.subscribe(event.stream, undefined);
          const subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.props.myUserName })
            .then(async () => {
              const devices = await this.OV.getDevices();
              const videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              const publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: this.props.audioEnabled, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: this.props.videoEnabled, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });

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
            .catch((error) => {
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

  // 수정완료
  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

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
        this.props.setMySessionId("SessionA");
        this.props.setMyUserName(
          "Participant" + Math.floor(Math.random() * 100)
        );
        this.props.setAudioEnabled(false);
        this.props.setVideoEnabled(false);
        this.props.setMsgToSend("");
        this.props.setChatEvents(new Array());
        this.props.setEmojiEvents(new Array());
      }
    );
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          const newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  sendEmojiSignal() {
    const mySession = this.state.session;

    mySession
      .signal({
        data: "My custom emoji",
        to: [],
        type: "emoji",
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  recvSignal() {
    const mySession = this.state.session;

    mySession.on("signal:emoji", (event) => {
      console.log(event.data);
      console.log(event.from);
      console.log(event.type);
    });
  }

  render() {
    const { mySessionId, myUserName, audioEnabled, videoEnabled, msgToSend } =
      this.props;

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
          <Session>
            <SessionHeader>
              <SessionTitle>{mySessionId}</SessionTitle>
              <input
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
              <Button
                width={3}
                height={3}
                text={"이모지"}
                onClick={this.sendEmojiSignal}
              />
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
              {/* <div id="video-container" className="col-md-6"> */}

              {this.state.publisher !== undefined ? (
                <StreamContainer
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </StreamContainer>
              ) : null}

              {this.state.subscribers.map((sub, i) => (
                <StreamContainer
                  key={i}
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </StreamContainer>
              ))}
              {/* </div> */}
            </SessionBody>
          </Session>
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

  createSession(sessionId) {
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

  createToken(sessionId) {
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Session = styled.div`
  width: 100%;
  height: auto;
`;
const SessionHeader = styled.div``;
const SessionTitle = styled.h1``;
const SessionBody = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  justify-content: center;
  align-items: center;
  /* ratio 4:3 */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
`;
const MainVideoContainer = styled.div`
  max-width: 100%;
  height: auto;
`;
const StreamContainer = styled.div`
  max-width: 100%;
  height: auto;
`;

const mapStateToProps = (state) => ({ ...state.clientSession });
const mapDispatchToProps = (dispatch) => ({
  setMySessionId: (payload) => dispatch(actions.setMySessionId(payload)),
  setMyUserName: (payload) => dispatch(actions.setMyUserName(payload)),
  setAudioEnabled: (payload) => dispatch(actions.setAudioEnabled(payload)),
  setVideoEnabled: (payload) => dispatch(actions.setVideoEnabled(payload)),
  setMsgToSend: (payload) => dispatch(actions.setMsgToSend(payload)),
  setChatEvents: (payload) => dispatch(actions.setChatEvents(payload)),
  setEmojiEvents: (payload) => dispatch(actions.setEmojiEvents(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
