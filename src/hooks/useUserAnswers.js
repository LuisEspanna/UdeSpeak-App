//import { useEffect } from "react";
import { useState } from "react"

export default function useUserAnswers() {
    const [correctAnswers, setCorrectAnswers] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const reset = () => {
        setCorrectAnswers(null);
        setIsCorrect(false);
    }
    
    const validateReading = (questions, userAnswers) => {
        let maxScore = 0;
        let userScore = 0;
        
        setCorrectAnswers(null);

        let localCorrectAnswers = {};

        questions.forEach(question => {
            question.options.forEach(option => {
                if(option.isValid){
                    maxScore = maxScore + 1;
                    
                    let uA = userAnswers[question.id];

                    if(uA !== null && uA !== undefined){
                        if(uA === option.id){
                            userScore = userScore + 1;
                            localCorrectAnswers = {...localCorrectAnswers, [question.id]: option.id };
                        }
                    }
                }
            });
        });

        setIsCorrect(maxScore === userScore);
        setCorrectAnswers(localCorrectAnswers);
    }

    return {
        correctAnswers,
        isCorrect,
        validateReading,
        reset
    }
}
