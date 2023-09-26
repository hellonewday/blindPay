import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScreenWrapper from "../components/screenWrapper";
import * as Speech from "expo-speech";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button";
import CartButton from "../components/CartButton";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Audio } from "expo-av";
import { AndroidAudioEncoder, AndroidOutputFormat } from "expo-av/build/Audio";

function BlindScreen({ params }) {
  const [recording, setRecording] = React.useState();

  const [hasCameraPermission, setPermission] = useState(null);
  const [hasMicroPermission, setMicroPermission] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const microStatus = await Camera.requestMicrophonePermissionsAsync();

      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      setPermission(cameraStatus.status === "granted");
      setMicroPermission(microStatus.status === "granted");
    })();
  }, []);

  function speechToText(base64) {
    axios
      .post("http://192.168.159.74:8088/service/stt", {
        base64,
      })
      .then((response) => {
        console.log(response.data.transcription);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function chatbot(speechToTextValue) {
    let authData = {
      username: "",
      password: "",
      tenant: "",
      region: "",
    };
    axios
      .post("http://192.168.159.74:8088/service/auth", authData)
      .then((authResponse) => {
        console.log();
        let authToken = authResponse.data["authToken"];
        axios
          .post(
            "http://192.168.159.74:8088/service/chatbot",
            {
              question: speechToTextValue,
            },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((response) => {
            return response.data.answer;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      });
  }

  function textToSpeech(answer) {
    axios
      .post("http://192.168.159.74:8088/service/tts", {
        text: answer,
      })
      .then(async (response) => {
        console.log(response.data.success);
        const tmpFilename =
          FileSystem.documentDirectory + "recordings/" + `tmp.mp3`;
        await FileSystem.writeAsStringAsync(
          tmpFilename,
          response.data.response,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        const { sound } = await Audio.Sound.createAsync({ uri: tmpFilename });
        await sound.playAsync();
      });
  }

  async function startRecording() {
    try {
      const recordingOptions = {
        isMeteringEnabled: true,
        web: {
          mimeType: "audio/webm",
          bitsPerSecond: 128000,
        },
        // android not currently in use, but parameters are required
        android: {
          extension: ".wav",
          outputFormat: AndroidOutputFormat.AMR_WB,
          audioEncoder: AndroidOutputFormat.AMR_WB,
          sampleRate: 16000,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".wav",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          extension: ".wav",
          outputFormat: AndroidOutputFormat.AMR_WB,
          audioEncoder: AndroidOutputFormat.AMR_WB,
          sampleRate: 16000,
          numberOfChannels: 2,
          bitRate: 128000,
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
        },
      });
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let info = await FileSystem.getInfoAsync(recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    let uri = info.uri;
    console.log("Processing file from directory to Upload API", uri);
    const formData = new FormData();
    formData.append("audioFile", {
      uri,
      type: "audio/wav",
      name: `${Date.now()}.wav`,
    });
    console.log("Speech to text");
    axios
      .post("http://192.168.159.74:8088/service/stt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        console.log(response.data.transcription);
        let transcription = response.data.transcription;
        console.log(transcription.length);
        if (transcription.length === 0) {
          textToSpeech("Sorry, can you speak louder?");
        } else {
          console.log("Loading chatbot with transcription: ", transcription);

          let authData = {
            username: "hai.vuquang",
            password: "Vietnam@123",
            tenant: "hid_7hlc7p6scedd-c9",
            region: "ap-southeast-1",
          };
          axios
            .post("http://192.168.159.74:8088/service/auth", authData)
            .then((authResponse) => {
              console.log();
              let authToken = authResponse.data["authToken"];
              axios
                .post(
                  "http://192.168.159.74:8088/service/chatbot",
                  {
                    question: transcription,
                  },
                  {
                    headers: {
                      Authorization: authToken,
                    },
                  }
                )
                .then((response) => {
                  console.log("Front-end answer", response.data.answer);
                  textToSpeech(response.data.answer);
                })
                .catch((error) => {
                  console.log(error);
                  return null;
                });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync(
          (options = { base64: true, quality: 0 })
        );
        // speechToText(data.base64);
        // console.log(data.base64);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScreenWrapper>
      {hasCameraPermission ? (
        <View>
          <CartButton />
          <Camera
            style={{ ...styles.camera, height: 600 }}
            type={type}
            ref={cameraRef}
          ></Camera>

          <View style={styles.footerContainer}>
            <Button
              label={recording ? "Recording..." : "Hold to Speak"}
              theme="primary"
              isRecording={recording}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            />
          </View>
        </View>
      ) : (
        <Text>No camera found.</Text>
      )}

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  camera: {
    borderRadius: 20,
    marginBottom: 10,
  },
  button: {
    height: 40,
    flexDirection: "row",
    alighItems: "center",
    borderColor: "black",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});

export default BlindScreen;
