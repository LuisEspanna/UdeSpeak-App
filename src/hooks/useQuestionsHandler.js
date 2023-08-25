import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addCoursed } from '../state/reducers/userSlice';
import { QUESTIONS_TYPE } from '../constants';

export default function useQuestionsHandler() {
  const [questions, setQuestions] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const setCoursedQuestion = (question, route) => {
    // TODO: save on state and DB
    dispatch(addCoursed(toDbCoursedFormat(question.id, route)));

    let localQuestions = questions.filter((q) => q.id !== question.id);
    setQuestions(localQuestions.filter(q => !isQuestionCoursed(q)));
  }

  const isQuestionCoursed = (question) => {
    let found = false;
    user?.coursed?.questions?.forEach(item => {
      if (item === question.id)
        found = true;
    });
    return found;
  }

  const toDbCoursedFormat = (questionId, route) => {
    const coursed = {};
    if (user?.coursed?.languages) {
      coursed.languages = [...user.coursed.languages.filter(c => c != route.language), route.language];
    } else {
      coursed.languages = [route.language];
    }

    if (user?.coursed?.levels) {
      coursed.levels = [...user.coursed.levels.filter(c => c != route.level), route.level];
    } else {
      coursed.levels = [route.level];
    }

    if (user?.coursed?.questionnaries) {
      coursed.questionnaries = [...user.coursed.questionnaries.filter(c => c != route.questionnary), route.questionnary];
    } else {
      coursed.questionnaries = [route.questionnary];
    }

    if (user?.coursed?.questions) {
      coursed.questions = [...user.coursed.questions.filter(c => c != questionId), questionId];
    } else {
      coursed.questions = [questionId];
    }

    return coursed;
  }

  const navigate = (navigation, currentQuestion, callback) => {
    let nextQuestion = null;
    let newQuestions = questions.filter(q => q.id !== currentQuestion.id);

    newQuestions.forEach(q => {
      if (!isQuestionCoursed(q)) {
        nextQuestion = q;
      }
    });

    if (nextQuestion === null)
      navigation.navigate('_questions', { ...props.route.params, item: nextQuestion });

    setQuestions(newQuestions);
    
    // TODO: 
    switch (nextQuestion.type) {
      case QUESTIONS_TYPE.READING:
        if(callback) callback(nextQuestion);
        else props.navigation.navigate('_reading', {...props.route.params, item: nextQuestion,  newQuestions});
        break;
      case QUESTIONS_TYPE.LISTENING:
        console.log('LISTENING')
        break;
      case QUESTIONS_TYPE.SPEAKING:
        console.log('SPEAKING')
        break;
      case QUESTIONS_TYPE.WRITING:
        console.log('WRITING')
        break;
      default:
        break;
    }
  }

  return {
    questions,
    isQuestionCoursed,
    setQuestions,
    setCoursedQuestion,
    navigate
  }
}
