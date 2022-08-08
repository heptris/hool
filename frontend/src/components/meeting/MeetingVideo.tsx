import React, { useEffect, useState } from "react";

import {
  OpenVidu,
  Session,
  Subscriber,
  Stream,
  Publisher,
} from "openvidu-browser";
import axios from "axios";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import UserVideoComponent from "./UserVideoComponent";
import Button from "components/commons/Button";

type VideoRoomState = {
  mySessionId: string;
  myUserName: string;
  session: Session | undefined;
  mainStreamManager: Publisher | Subscriber | Stream | undefined;
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  currentVideoDevice?: any;
};

type SessionEvent = {
  stream: Stream;
  preventDefault: Function;
};

const MeetingVideo = () => {
  const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
  const OPENVIDU_SERVER_SECRET = "MY_SECRET";

  let OV: OpenVidu;
  const [state, setState] = useState<VideoRoomState>({
    mySessionId: "SessionA",
    myUserName: "Participant" + Math.floor(Math.random() * 100).toString(),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });

  useEffect(() => {
    const mySession = state.session;

    mySession?.on("streamCreated", (e: SessionEvent) => {
      const subscriber: Subscriber = mySession.subscribe(
        e.stream,
        undefined as unknown as HTMLElement
      );
      const subscribers = state.subscribers;

      subscribers.push(subscriber);

      setState({
        ...state,
        subscribers: subscribers,
      });
    });

    mySession?.on("streamDestroyed", (e: SessionEvent) => {
      e.preventDefault();

      deleteSubscriber(e.stream.streamManager);
    });

    mySession?.on("exception", (exception: any) => {
      console.warn(exception);
    });

    getToken().then((token: string) => {
      mySession
        ?.connect(token, { clientData: state.myUserName })
        .then(async () => {
          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device: any) => device.kind === "videoinput"
          );

          const publisher: Publisher = OV.initPublisher(
            undefined as unknown as HTMLElement,
            {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: true,
            }
          );

          mySession.publish(publisher);

          setState({
            ...state,
            currentVideoDevice: videoDevices[0],
            mainStreamManager: publisher,
            publisher: publisher,
          });
        })
        .catch((error: any) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  }, [state.session]);

  const handleMainVideoStream = (stream: Stream) => {
    if (state.mainStreamManager !== stream) {
      setState({
        ...state,
        mainStreamManager: stream,
      });
    }
  };

  const getToken = () => {
    return createSession(state.mySessionId).then((sessionId: string) =>
      createToken(sessionId)
    );
  };

  const createSession = (sessionId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          console.log("CREATE SESSION", response);
          resolve(response.data.id);
        })
        .catch((response: any) => {
          var error = Object.assign({}, response);
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
  };

  const createToken = (sessionId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      var data = {};
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
            },
          }
        )
        .then((response: any) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error: any) => reject(error));
    });
  };

  const deleteSubscriber = (streamManager: any) => {
    let subscribers = state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setState({
        ...state,
        subscribers: subscribers,
      });
    }
  };

  const joinSession = () => {
    OV = new OpenVidu();

    setState({
      ...state,
      session: OV.initSession(),
    });
  };

  const leaveSession = () => {
    const mySession = state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  return (
    <VideoBox>
      <>
        <div onClick={joinSession}>
          <Button width={7} height={3} text={"Join"} />
        </div>
        <div onClick={leaveSession}>
          <Button width={7} height={3} text={"Leave"} />
        </div>
        {state.mainStreamManager !== undefined ? (
          <div>
            <UserVideoComponent
              streamManager={state.mainStreamManager as Publisher | Subscriber}
            />
          </div>
        ) : (
          <></>
        )}
        {state.subscribers.map((sub, i) => (
          <div key={i}>
            <UserVideoComponent
              streamManager={state.publisher as Publisher}
              mainVideoStream={handleMainVideoStream}
            />
          </div>
        ))}
      </>
    </VideoBox>
  );
};

const VideoBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${darkTheme.adaptiveGrey500};
`;

export default MeetingVideo;
