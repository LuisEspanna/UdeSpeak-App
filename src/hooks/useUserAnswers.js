//import { useEffect } from "react";
import { useState } from "react"
import Sound from "react-native-sound";

export default function useUserAnswers() {
    const [correctAnswers, setCorrectAnswers] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isPLayingSound, setIsPLayingSound] = useState(false);

    const reset = () => {
        setCorrectAnswers(null);
        setIsCorrect(false);
    }

    const validateStandard = (questions, userAnswers) => {
        let maxScore = 0;
        let userScore = 0;

        setCorrectAnswers(null);

        let localCorrectAnswers = {};

        questions.forEach(question => {
            question.options.forEach(option => {
                if (option.isValid) {
                    maxScore = maxScore + 1;

                    let uA = userAnswers[question.id];

                    if (uA !== null && uA !== undefined) {
                        if (uA === option.id) {
                            userScore = userScore + 1;
                            localCorrectAnswers = { ...localCorrectAnswers, [question.id]: option.id };
                        }
                    }
                }
            });
        });

        setCorrectAnswers(localCorrectAnswers);

        if (maxScore === userScore) {
            playSuccess(() => setIsCorrect(maxScore === userScore));
        } else playError(() => setIsCorrect(maxScore === userScore));
    }

    const validateWriring = (questions, userAnswers) => {
        let maxScore = 0;
        let userScore = 0;

        setCorrectAnswers(null);

        let localCorrectAnswers = {};

        questions.forEach(question => {

            maxScore = maxScore + 1;

            question.options.forEach(option => {
                if (userAnswers[question.id]?.toLocaleLowerCase()?.trim() === option?.description.toLocaleLowerCase()?.trim()) {
                    userScore = userScore + 1;
                    localCorrectAnswers = { ...localCorrectAnswers, [question.id]: option.id };
                }
            });
        });

        setIsCorrect(maxScore === userScore);
        setCorrectAnswers(localCorrectAnswers);

        if (maxScore === userScore) {
            playSuccess(() => setIsCorrect(maxScore === userScore));
        } else playError(() => setIsCorrect(maxScore === userScore));
    }

    const validateSpeaking = (exercise, userResponse) => {
        let validationText = exercise?.validation_text;
        let validArray = validationText.toLocaleLowerCase().replace(",", "").replace(".", "").replace("?", "").split(" ");

        let userArray = userResponse.toLocaleLowerCase().replace(",", "").replace(".", "").replace("?", "").split(" ");

        let score = 0;
        let maxScore = validArray.length;
        let percentage = 0.0;

        for (let i = 0; i < userArray.length; i++) {
            const userWord = userArray[i];

            for (let j = 0; j < validArray.length; j++) {
                const correctWord = validArray[j];
                if (userWord === correctWord) {
                    score = score + 1;
                    break;
                }
            }
        }

        percentage = ((score * 100.0) / maxScore);

        if (percentage >= 60) {
            setIsCorrect(true);
            setCorrectAnswers(userArray.filter(correctWord => validArray.includes(correctWord)));
            playSuccess();
        } else {
            playError();
        }
    }

    const playSuccess = (onFinish) => {
        if (!isPLayingSound) {
            var audio = new Sound('success.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + audio.getDuration() + 'number of channels: ' + audio.getNumberOfChannels());

                // Play the sound with an onEnd callback
                audio.play((success) => {
                    if (success) {
                        if(onFinish)
                            onFinish();
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            });
        }
    }

    const playError = (onFinish) => {
        if (!isPLayingSound) {
            var audio = new Sound('error.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + audio.getDuration() + 'number of channels: ' + audio.getNumberOfChannels());

                // Play the sound with an onEnd callback
                audio.play((success) => {
                    if (success) {
                        if(onFinish)
                            onFinish();
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            });
        }
    }


    return {
        correctAnswers,
        isCorrect,
        validateStandard,
        validateWriring,
        reset,
        validateSpeaking
    }
}
