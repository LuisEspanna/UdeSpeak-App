import { useState } from 'react';
import { useEffect } from 'react';
import AudioRecord from 'react-native-audio-record';
import { Alert, LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {
  PermissionsAndroid,
} from 'react-native';
import { uploadFiles } from "react-native-fs";
import useServers from './useServers';
import { idGenerator } from '../functions';
import { TOASTS_TYPE } from '../constants';

const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'user.wav' // default 'audio.wav'
};

const requestMicPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Udespeak App Mic Permission',
        message:
          'Para usar la aplicación es necesario el permiso ' +
          ' del microfono para que puedas enviar audios',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the mic');
    } else {
      console.log('Mic permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function useAudioRecord(toastProps) {
  const [file, setFile] = useState('');
  const { isLoading, servers, setIsLoading } = useServers();
  const [localSTT, setLocalSTT] = useState(false);

  useEffect(() => {
    requestMicPermission();
    AudioRecord.init(options);
  }, []);

  const startRecording = async () => {
    if (!isLoading) {
      if (servers.length === 0) {
        toastProps.showAlert('El servidor de reconicimiento de voz no está disponible en este momento :(', TOASTS_TYPE.ERROR, true);
        // TODO proceder localmente
      } else {
        console.log('Inicio');
        AudioRecord.start();
      }

      setLocalSTT(servers.length === 0);
    } else {
      return;
    }
  }

  const stopRecording = async (onFinishRecord) => {
    if (isLoading) {
      return;
    }

    if (!localSTT) {
      console.log('Pausa');
      const audioFile = await AudioRecord.stop();
      setFile(audioFile);

      var files = [
        {
          name: "file",
          filename: (`${idGenerator(9)}.wav`),
          filepath: audioFile,
          filetype: "audio/wav",
        },
      ];

      uploadFiles({
        toUrl: servers[0].url,
        files: files,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        //invoked when the uploading starts.
        begin: () => {
          setIsLoading(true);
        },
        // You can use this callback to show a progress indicator.
        progress: ({ totalBytesSent, totalBytesExpectedToSend }) => { },
      }).promise.then((response) => {
        setIsLoading(false);
        onFinishRecord(JSON.parse(response.body));
      }).catch(err => {
        setIsLoading(false);
        toastProps.showAlert('Error: ' + err?.message, TOASTS_TYPE.ERROR, true);
      });
    } else {
      console.log('stop stt local');
    }
  }

  return {
    startRecording,
    stopRecording,
    file,
    isLoading
  }
}
