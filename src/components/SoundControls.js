import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Play75Icon from './icons/Play75Icon';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import StopIcon from './icons/StopIcon';
import Sound from 'react-native-sound';
import { useIsFocused } from '@react-navigation/native';

Sound.setCategory('Playback');

export default function SoundPlayer({ url, show }) {

    const [isPLaying, setIsPLaying] = useState(false);
    const [isPLayingSlow, setIsPLayingSlow] = useState(false);
    const [sound, setSound] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {       
        if(isFocused){ 
            const newSound = new Sound(url, null, (error) => {
                if (error) {
                    console.log('Failed to load the sound: ', error);
                }
            });
            setSound(newSound);
        } else {
            sound?.pause();
            setIsPLaying(false);
            setIsPLayingSlow(false);
        }
    }, [url, isFocused]);


    const onPlay = () => {
        if(!isPLaying){
            setIsPLaying(true);
            sound.play(success => {
                if (success) {
                    setIsPLaying(false);
                    console.log('successfully finished playing');
                }
            });
            sound.setSpeed(1);           
        } else {
            sound.pause();
            setIsPLaying(false);
        }
    }

    const onPlaySlow = () => {
        if(!isPLayingSlow){
            setIsPLayingSlow(true);
            sound.play((success) => {
                if (success) {
                    setIsPLayingSlow(false);
                    console.log('successfully finished playing slow');
                }
            });
            sound.setSpeed(0.7);
        } else {
            sound.pause();
            setIsPLayingSlow(false);
        }
    }

    const onStop = () => {
        setIsPLaying(false);
        setIsPLayingSlow(false);
        sound.setSpeed(1);
        sound.stop();
    }

    return (
        <View style={styles.container}>
            <View style={styles.actionArea}>
                <TouchableOpacity onPress={onPlay}>
                    {
                        isPLaying ? <PauseIcon style={styles.icon}/> : <PlayIcon style={styles.icon}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={onPlaySlow}>
                    {
                        isPLayingSlow ? <PauseIcon style={styles.icon}/> : <Play75Icon style={styles.icon}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={onStop}>
                    <StopIcon style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 55,
        minHeight: 55,
        flexDirection: 'row',
        padding: 0,
        position: 'relative',
        zIndex: 4,
        marginTop: 2
    },
    actionArea: {
        backgroundColor: '#0FB4B9',
        borderRadius: 50,
        height: '100%',
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        shadowColor: '#000000',
        marginBottom: 2,
        padding: 11,
        paddingRight: 12,
        paddingLeft: 12
    },
    icon: {
        height: 30,
        justifyContent: 'center',
        width: 30,
    }
})