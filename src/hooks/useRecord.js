import { useState } from 'react';
import { useEffect } from 'react';
import AudioRecord from 'react-native-audio-record';
import {
  PermissionsAndroid,
} from 'react-native';
import { uploadFiles, DocumentDirectoryPath } from "react-native-fs";
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
  const { serverOnline, isLoading, getServers, setIsLoading } = useServers();

  useEffect(() => {
    requestMicPermission();
    AudioRecord.init(options);
    fetchData();
  }, []);

  const fetchData = async () => {
    const local = await getServers();
    console.log(local);
  }

  const startRecording = async () => {
    if(!isLoading && serverOnline.length === 0 ){
      toastProps.showAlert('Error en el servidor :(', TOASTS_TYPE.ERROR, true);
      return;
    }
    
    console.log('Inicio')
    AudioRecord.start();
  }

  const stopRecording = async () => {
    if(!isLoading && serverOnline.length === 0 ){
      return;
    }
    console.log('Pausa')

    const audioFile = await AudioRecord.stop();
    setFile(audioFile);

    if (serverOnline.length > 0) {
      var files = [
        {
          name: "file",
          filename: (`${idGenerator(9)}.wav`),
          filepath: audioFile,
          filetype: "audio/wav",
        },
      ];

      uploadFiles({
        toUrl: serverOnline.replace('/test', ''),
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
      });
    }
  }

  return {
    startRecording,
    stopRecording,
    file,
    serverOnline,
    isLoading
  }
}
