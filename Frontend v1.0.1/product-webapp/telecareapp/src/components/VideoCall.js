import React, { useEffect, useRef, useState } from "react";
import { MeetingProvider, useMeeting, useParticipant, useConnection, usePubSub, } from "@videosdk.live/react-sdk";
import { getToken, validateMeeting } from "../Service/VideoService";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./VideoCall.css"
import { BsFillMicFill, BsChatRightText } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";

// import { JoiningScreen } from "./components/JoiningScreen";

const primary = "#3E84F6";

const width = 400;
const height = (width * 2) / 3;
const borderRadius = 8;

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const Title = ({ title, dark }) => {
  return <h2 style={{ color: dark ? 'black' : "black" }}>{title}</h2>;
};

const ExternalVideo = () => {
  const [{ link, playing }, setVideoInfo] = useState({
    link: null,
    playing: false,
  });

  const onVideoStateChanged = (data) => {
    const { currentTime, link, status } = data;

    switch (status) {
      case "stopped":
        console.log("stopped in switch");
        externalPlayer.current.src = null;
        setVideoInfo({ link: null, playing: false });
        break;
      case "resumed":
        if (typeof currentTime === "number") {
          externalPlayer.current.currentTime = currentTime;
        }
        externalPlayer.current.play();
        setVideoInfo((s) => ({ ...s, playing: true }));
        break;
      case "paused":
        externalPlayer.current.pause();
        setVideoInfo((s) => ({ ...s, playing: false }));
        break;
      case "started":
        setVideoInfo({ link, playing: true });
        break;
      default:
        break;
    }
  };

  const onVideoSeeked = (data) => {
    const { currentTime } = data;
    if (typeof currentTime === "number") {
      externalPlayer.current.currentTime = currentTime;
    }
  };

  useMeeting({ onVideoStateChanged, onVideoSeeked });
  const externalPlayer = useRef();

  return !link ? null : (
    <div
      style={{
        borderRadius,
        padding: borderRadius,
        margin: borderRadius,
        backgroundColor: primary,
        display: "flex",
      }}
    >
      <Title title={"Externam Video"} />

      <video
        style={{ borderRadius, height, width, backgroundColor: "black" }}
        autoPlay
        ref={externalPlayer}
        src={link}
      />
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages?.map((message, i) => {
        const { senderName, message: text, timestamp } = message;

        return (
          <div
            style={{
              margin: 8,
              backgroundColor: "darkblue",
              borderRadius: 8,
              overflow: "hidden",
              padding: 8,
              color: "#fff",
            }}
            key={i}
          >
            <p style={{ margin: 0, padding: 0, fontStyle: "italic" }}>
              {senderName}
            </p>
            <h3 style={{ margin: 0, padding: 0, marginTop: 4, wordBreak: 'break-word' }}>{text}</h3>
            <p
              style={{
                margin: 0,
                padding: 0,
                opacity: 0.6,
                marginTop: 4,
              }}
            >
              {formatAMPM(new Date(timestamp))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const MeetingChat = ({ tollbarHeight }) => {
  const { publish, messages } = usePubSub("CHAT", {});
  const [message, setMessage] = useState("");
  return (
    <div
      style={{
        // marginLeft: borderRadius,
        width: "30%",
        backgroundColor: "#ffff",
        // overflowY: "scroll",
        // borderRadius,
        height: `calc(100vh - ${tollbarHeight + 2 * borderRadius}px)`,
        padding: borderRadius,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ height: '10%', textAlign: 'center' }}>
        <Title title={"Chat"} style={{ color: "black" }} />
      </div>
      <div style={{ overflowY: "auto" }} >
        <MessageList messages={messages} />
      </div>

      <div style={{ display: "flex", height: '10%', position: 'relative' }}>
        <input placeholder="Type message here" style={{ width: '100%', border: 'none' }} value={message} onChange={(e) => { const v = e.target.value; setMessage(v); }} />
        <button c style={{ position: 'absolute', border: 'none', margin: 0, background: 'transparent', height: '100%', right: '1px' }} onClick={() => {
          const m = message;
          if (m.length) {
            publish(m, { persist: true });
            setMessage("");
          }
        }}
        >
          <RiSendPlaneFill style={{ width: '34px', height: '25px' }} />
        </button>
      </div>
    </div>
  );
};

const ParticipantView = ({ participantId, index, len }) => {
  const webcamRef = useRef(null);
  const micRef = useRef(null);
  const screenShareRef = useRef(null);

  const onStreamEnabled = (stream) => { };
  const onStreamDisabled = (stream) => { };

  const {
    displayName,
    participant,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isLocal,
    isActiveSpeaker,
    isMainParticipant,
    switchTo,
    pinState,
    setQuality,
    enableMic,
    disableMic,
    enableWebcam,
    disableWebcam,
    pin,
    unpin,
  } = useParticipant(participantId, {
    onStreamEnabled,
    onStreamDisabled,
  });

  useEffect(() => {
    if (webcamRef.current) {
      if (webcamOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);

        webcamRef.current.srcObject = mediaStream;
        webcamRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        webcamRef.current.srcObject = null;
      }
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  useEffect(() => {
    if (screenShareRef.current) {
      if (screenShareOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(screenShareStream.track);

        screenShareRef.current.srcObject = mediaStream;
        screenShareRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        screenShareRef.current.srcObject = null;
      }
    }
  }, [screenShareStream, screenShareOn]);

  return (
    // <div
    //   style={{
    //     width,
    //     backgroundColor: primary,
    //     // borderRadius: borderRadius,
    //     overflow: "hidden",
    //     // margin: borderRadius,
    //     // padding: borderRadius,
    //     display: "flex",
    //     flex: 1,
    //     flexDirection: "column",
    //     position: "relative",
    //     height:"100%"
    //   }}
    // >

    //len == 1 ? "bigInVideo" : 
    <div className={len == 1 ? "bigInVideo" : index == 0 ? "smallInVideo" : "bigInVideo"}>
      <audio ref={micRef} autoPlay muted={isLocal} />

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <video
            height={"100%"}
            width={"100%"}
            ref={webcamRef}
            style={{
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "contain",
            }}
            autoPlay
          />
          <div
            style={{
              position: "absolute",
              top: borderRadius,
              right: borderRadius,
            }}
          >
            {/* <p
              style={{
                color: webcamOn ? "green" : "red",
                fontSize: 16,
                fontWeight: "bold",
                opacity: 1,
              }}
            >
              WEB CAM
            </p> */}
          </div>

          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            {/* <button
              className="button blue"
              style={
                {
                  // height: 50,
                  // width: 200,
                }
              }
              onClick={async () => {
                const meetingId = prompt(
                  `Please enter meeting id where you want to switch ${displayName}`
                );
                const token = await getToken();
                if (meetingId && token) {
                  try {
                    await switchTo({
                      meetingId,
                      payload: "Im Switching",
                      token: token,
                    });
                  } catch (e) {
                    console.log("swithc To Error", e);
                  }
                } else {
                  alert("Empty meetingId!");
                }
              }}
            >
              Switch Participant
            </button> */}
          </div>
        </div>
      </div>

      {/* <div
        style={{
          marginTop: borderRadius,
          position: "relative",
          borderRadius: borderRadius,
          overflow: "hidden",
          backgroundColor: "lightgreen",
          width: "100%",
          height: 300,
        }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <video
            height={"100%"}
            width={"100%"}
            ref={screenShareRef}
            style={{
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "contain",
            }}
            autoPlay
          />
          <div
            style={{
              position: "absolute",
              top: borderRadius,
              right: borderRadius,
            }}
          >
            <p
              style={{
                color: screenShareOn ? "green" : "red",
                fontSize: 16,
                fontWeight: "bold",
                opacity: 1,
              }}
            >
              SCREEN SHARING
            </p>
          </div>
        </div>
      </div>
      <table>
        {[
          { k: "Name", v: displayName },
          { k: "webcamOn", v: webcamOn ? "YES" : "NO" },
          { k: "micOn", v: micOn ? "YES" : "NO" },
          { k: "screenShareOn", v: screenShareOn ? "YES" : "NO" },
          { k: "isLocal", v: isLocal ? "YES" : "NO" },
          { k: "isActiveSpeaker", v: isActiveSpeaker ? "YES" : "NO" },
          { k: "isMainParticipant", v: isMainParticipant ? "YES" : "NO" },
        ].map(({ k, v }) => (
          <tr key={k}>
            <td style={{ border: "1px solid #fff", padding: 4 }}>
              <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>{k}</h3>
            </td>
            <td style={{ border: "1px solid #fff", padding: 4 }}>
              <h3 style={{ margin: 0, padding: 0, color: "#fff" }}>{v}</h3>
            </td>
          </tr>
        ))}
      </table> */}
    </div>
  );
};

const ParticipantsView = () => {
  console.log(useMeeting(), 'useMeeting')
  const { participants } = useMeeting();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        // padding: borderRadius,
        height: '100%'
      }}
    >


      {/* <Title dark title={"Participants"} /> */}
      {chunk([...participants.keys()]).map((k) => (
        <div style={{ display: "flex", height: "100%", position: "relative" }}>
          {k.map((l, i) => (
            <ParticipantView key={l} participantId={l} index={i} len={k.length} />
          ))}
        </div>
      ))}
    </div>
  );
};

const ConnectionView = ({ connectionId }) => {
  const { connection } = useConnection(connectionId, {
    onMeeting: {
      onChatMessage: ({ message, participantId }) => {
        alert(
          `A Person ${participantId} from ${connectionId} Wants to say : ${message}`
        );
      },
    },
  });

  const connectionParticipants = [...connection.meeting.participants.values()];

  const ConnectionParticipant = ({ participant }) => {
    return (
      <div style={{ padding: 4, border: "1px solid blue" }}>
        <p>{participant.displayName}</p>
        <button
          onClick={async () => {
            const meetingId = prompt(
              `In Which meetingId you want to switch ${participant.displayName} ?`
            );
            const payload = prompt("enter payload you want to pass");

            const token = await getToken();
            if ((meetingId, token, payload)) {
              participant
                .switchTo({ meetingId, token, payload })
                .catch(console.log);
            } else {
              alert("Empty meetingId or payload ");
            }
          }}
          className={"button "}
        >
          Switch
        </button>
      </div>
    );
  };

  return (
    <div
      style={{
        width,
        backgroundColor: primary,
        borderRadius: borderRadius,
        overflow: "hidden",
        margin: borderRadius,
        padding: borderRadius,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <button
        onClick={() => {
          connection.close();
        }}
        className={"button"}
      >
        Close Connection
      </button>

      <button
        onClick={() => {
          const message = prompt("Enter You Message");
          if (message) {
            connection.meeting.sendChatMessage(message);
          } else {
            alert("Empty Message ");
          }
        }}
        className={"button"}
      >
        Send Meessage
      </button>

      <button
        onClick={() => {
          connection.meeting.end();
        }}
        className={"button"}
      >
        End Meeting
      </button>
      <p>
        {connection.id} : {connection.payload}
      </p>
      {connectionParticipants.map((participant) => {
        return (
          <ConnectionParticipant
            key={`${connection.id}_${participant.id}`}
            participant={participant}
          />
        );
      })}
    </div>
  );
};

const ConnectionsView = () => {
  const { connections, meetingId } = useMeeting();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: borderRadius,
      }}
    >
      <Title dark title={"Connections"} />
      {chunk([...connections.keys()]).map((k) => (
        <div style={{ display: "flex" }} key={k}>
          {k.map((l) => (
            <ConnectionView key={`${meetingId}_${l}`} connectionId={l} />
          ))}
        </div>
      ))}
    </div>
  );
};

function MeetingView({ onNewMeetingIdToken, onMeetingLeave }) {
  const [participantViewVisible, setParticipantViewVisible] = useState(true);
  const [showChat, setShowChat] = useState(false)

  // const meeting = useMeeting()

  function onParticipantJoined(participant) {
    console.log(" onParticipantJoined", participant);
  }
  function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
  }
  const onSpeakerChanged = (activeSpeakerId) => {
    console.log(" onSpeakerChanged", activeSpeakerId);
  };
  function onPresenterChanged(presenterId) {
    console.log(" onPresenterChanged", presenterId);
  }
  function onMainParticipantChanged(participant) {
    console.log(" onMainParticipantChanged", participant);
  }
  function onEntryRequested(participantId, name) {
    console.log(" onEntryRequested", participantId, name);
  }
  function onEntryResponded(participantId, name) {
    console.log(" onEntryResponded", participantId, name);
  }
  function onRecordingStarted() {
    console.log(" onRecordingStarted");
  }
  function onRecordingStopped() {
    console.log(" onRecordingStopped");
  }
  function onChatMessage(data) {
    console.log(" onChatMessage", data);
  }
  function onMeetingJoined() {
    console.log("onMeetingJoined");
  }
  function onMeetingLeft() {
    console.log("onMeetingLeft");
    onMeetingLeave();
  }
  const onLiveStreamStarted = (data) => {
    console.log("onLiveStreamStarted example", data);
  };
  const onLiveStreamStopped = (data) => {
    console.log("onLiveStreamStopped example", data);
  };

  const onVideoStateChanged = (data) => {
    console.log("onVideoStateChanged", data);
  };
  const onVideoSeeked = (data) => {
    console.log("onVideoSeeked", data);
  };

  const onWebcamRequested = (data) => {
    console.log("onWebcamRequested", data);
  };
  const onMicRequested = (data) => {
    console.log("onMicRequested", data);
  };
  const onPinStateChanged = (data) => {
    console.log("onPinStateChanged", data);
  };
  const onSwitchMeeting = (data) => {
    window.focus();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to switch Meeting ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onNewMeetingIdToken(data);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  const onConnectionOpen = (data) => {
    console.log("onConnectionOpen", data);
  };

  const {
    meetingId,
    meeting,
    localParticipant,
    mainParticipant,
    activeSpeakerId,
    participants,
    presenterId,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
    messages,
    isRecording,
    isLiveStreaming,
    pinnedParticipants,
    //
    join,
    leave,
    connectTo,
    end,
    //
    startRecording,
    stopRecording,
    //
    respondEntry,
    //
    muteMic,
    unmuteMic,
    toggleMic,
    //
    disableWebcam,
    enableWebcam,
    toggleWebcam,
    //
    disableScreenShare,
    enableScreenShare,
    toggleScreenShare,
    //
    getMics,
    getWebcams,
    changeWebcam,
    changeMic,

    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
  } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamStarted,
    onLiveStreamStopped,
    onVideoStateChanged,
    onVideoSeeked,
    onWebcamRequested,
    onMicRequested,
    onPinStateChanged,
    onSwitchMeeting,
    onConnectionOpen,
  });

  const handlestartVideo = () => {
    console.log("handlestartVideo");

    startVideo({
      link: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    });
  };
  const handlestopVideo = () => {
    stopVideo();
  };
  const handleresumeVideo = () => {
    resumeVideo();
  };
  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 2 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 5 });
  };
  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: "rtmp://a.rtmp.youtube.com/live2",
        streamKey: "key",
      },
    ]);
  };
  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const tollbarHeight = 120;

  return (
    <div
      style={{ backgroundColor: "#ffff", height: '93.5vh', position: "relative", overflow: "hidden" }}>
      <div style={{ display: 'flex', position: 'absolute', top: '90%', zIndex: '9999', alignItems: 'center', justifyContent: 'center', width: '100%', }}>

        <button className={"button blue"} onClick={toggleMic}>
          <BsFillMicFill />
        </button>
        <button className={"button red"} onClick={leave}>
          <ImPhoneHangUp />
        </button>
        <button className={"button blue"} onClick={toggleWebcam}>
          <BsFillCameraVideoFill />
        </button>
        <button className={"button black"} onClick={() => setShowChat(!showChat)}>
          <BsChatRightText />
        </button>
        {/* <button className={"button blue"} onClick={toggleScreenShare}>
          toggleScreenShare
        </button>
        <button className={"button blue"} onClick={handlestartVideo}>
          startVideo
        </button>
        <button className={"button blue"} onClick={handlestopVideo}>
          stopVideo
        </button>
        <button className={"button blue"} onClick={handleresumeVideo}>
          resumeVideo
        </button>
        <button className={"button blue"} onClick={handlepauseVideo}>
          pauseVideo
        </button>
        <button className={"button blue"} onClick={handlesseekVideo}>
          seekVideo
        </button>
        <button className={"button blue"} onClick={handleStartLiveStream}>
          Start Live Stream
        </button>
        <button className={"button blue"} onClick={handleStopLiveStream}>
          Stop Live Stream
        </button>
        <button className={"button blue"} onClick={handleStartRecording}>
          start recording
        </button>
        <button className={"button blue"} onClick={handleStopRecording}>
          stop recording
        </button> */}
        {/* <button
          className={"button blue"}
          onClick={() => setParticipantViewVisible((s) => !s)}
        >
          Switch to {participantViewVisible ? "Connections" : "Participants"}{" "}
          view
        </button> */}

        {/* <button
          className={"button blue"}
          onClick={async () => {
            const meetingId = prompt(
              `Please enter meeting id where you want Connect`
            );
            if (meetingId) {
              try {
                await connectTo({
                  meetingId,
                  payload: "This is Testing Payload",
                });
              } catch (e) {
                console.log("Connect to Error", e);
              }
            } else {
              alert("Empty meetingId!");
            }
          }}
        >
          Make Connections
        </button> */}
        {/* <h1 style={{margin:'0'}}>Meeting id is : {meetingId}</h1> */}
      </div>

      <div style={{ height: '100%', width: '100%', position: 'absolute', display: 'flex' }}>
        {/* <div style={{display: "flex",flexDirection: "column",position: "relative",flex: 1,overflowY: "scroll",height: `calc(100vh - ${tollbarHeight}px)`,}}> */}
        <div className="bigVideo">
          {/* <ExternalVideo /> */}
          <ParticipantsView />
          {/* {participantViewVisible ? <ParticipantsView /> : <ConnectionsView />} */}
        </div>
        {
          showChat &&
          <MeetingChat tollbarHeight="100%" />

        }
      </div>
    </div>
  );
}

const VideoCall = () => {
  const [token, setToken] = useState(getToken);
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [isMeetingStarted, setMeetingStarted] = useState(false);

  async function startInstantMeeting() {

    const id = '6b9q-r69o-t4vl'
    const token = await getToken();
    const valid = await validateMeeting({ meetingId: id, token });

    if (valid) {
      setParticipantName("saurav")
      setMeetingId(id)
      setToken(token)
      setMicOn(true)
      setWebcamOn(true)
      setMeetingStarted(true)
    } else {
      alert("Invalid Meeting Id");
    }

  }

  useEffect(() => {
    startInstantMeeting()
  }, [])

  // useEffect(()=>{
  //   console.log(`${token}token,${meetingId}meetingId,${participantName}participantName,${micOn}micOn,${webcamOn}webcamOn,${isMeetingStarted}isMeetingStarted`)
  // },[token,meetingId,participantName,micOn,webcamOn,isMeetingStarted])

  return isMeetingStarted ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: webcamOn,
        name: participantName ? participantName : "TestUser",
      }}
      token={token}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <MeetingView
        onNewMeetingIdToken={({ meetingId, token }) => {
          setMeetingId(meetingId);
          setToken(token);
        }}
        onMeetingLeave={() => {
          setToken("");
          setMeetingId("");
          setWebcamOn(false);
          setMicOn(false);
          setMeetingStarted(false);
        }}
      />
    </MeetingProvider>
  ) : (
    <div></div>
    // <JoiningScreen
    //   participantName={participantName}
    //   setParticipantName={setParticipantName}
    //   meetinId={meetingId}
    //   setMeetingId={setMeetingId}
    //   setToken={setToken}
    //   setMicOn={setMicOn}
    //   micOn={micOn}
    //   webcamOn={webcamOn}
    //   setWebcamOn={setWebcamOn}
    //   onClickStartMeeting={() => {
    //     setMeetingStarted(true);
    //   }}
    //   startMeeting={isMeetingStarted}
    // />
  );
};

export default VideoCall;