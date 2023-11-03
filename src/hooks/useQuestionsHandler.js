import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addCoursed } from '../state/reducers/userSlice';
import { QUESTIONS_TYPE, TOASTS_TYPE } from '../constants';
import useUsers from "./useUsers";

export default function useQuestionsHandler(toastProps) {
  const [questions, setQuestions] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { editUserCoursed } = useUsers();

  const setCoursedQuestion = (question, route) => {
    let coursed = toDbCoursedFormat(question.id, route);

    editUserCoursed(coursed, user.uid).finally(()=>{
      dispatch(addCoursed(coursed));

      let localQuestions = questions.filter((q) => q.id !== question.id);
      setQuestions(localQuestions.filter(q => !isQuestionCoursed(q)));
    });
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

  const nextNavigate = (navigation, params, currentQuestion, callback) => {
    let nextQuestion = null;
    let newQuestions = questions.filter(q => q.id !== currentQuestion.id);

    newQuestions.forEach(q => {
      if (!isQuestionCoursed(q)) {
        nextQuestion = q;
      }
    });

    if (nextQuestion === null || nextQuestion === undefined || nextQuestion?.type === null || nextQuestion?.type === undefined){
      navigation.navigate('_questions', { ...params, item: nextQuestion });
      setQuestions(newQuestions);
      return;
    }

    setQuestions(newQuestions);
    
    // TODO: 
    switch (nextQuestion.type) {
      case QUESTIONS_TYPE.READING:
        if(callback && currentQuestion?.type === QUESTIONS_TYPE.READING) callback(nextQuestion);
        else navigation.navigate('_reading', {...params, item: nextQuestion,  questions: newQuestions});
        console.log('debug reading')
        break;
      case QUESTIONS_TYPE.LISTENING:
        if(callback && currentQuestion?.type === QUESTIONS_TYPE.LISTENING) callback(nextQuestion);
        else navigation.navigate('_listening', {...params, item: nextQuestion,  questions: newQuestions});
        break;
      case QUESTIONS_TYPE.SPEAKING:
        console.log('SPEAKING')
        break;
      case QUESTIONS_TYPE.WRITING:
        if(callback && currentQuestion?.type === QUESTIONS_TYPE.WRITING) callback(nextQuestion);
        else navigation.navigate('_writing', {...params, item: nextQuestion,  questions: newQuestions});
        break;
      default:
        navigation.navigate('_questions', { ...params, item: null });
        break;
    }
  }

  const navigate = (navigation, params, currentQuestion, callback) => {  
    if(!isQuestionCoursed(currentQuestion)){
      switch (currentQuestion.type) {
        case QUESTIONS_TYPE.READING:
          if(callback) callback(currentQuestion);
          else navigation.navigate('_reading', {...params, item: currentQuestion,  questions});
          break;
        case QUESTIONS_TYPE.LISTENING:
          if(callback) callback(currentQuestion);
          else navigation.navigate('_listening', {...params, item: currentQuestion,  questions});
          break;
        case QUESTIONS_TYPE.SPEAKING:
          console.log('SPEAKING')
          break;
        case QUESTIONS_TYPE.WRITING:
          if(callback) callback(currentQuestion);
          else navigation.navigate('_writing', {...params, item: currentQuestion,  questions});
          break;
        default:
          navigation.navigate('_questions', { ...params, item: null });
          break;
      }
    } else {
      toastProps.showAlert('Ejercicio resuelto', TOASTS_TYPE.INFO, true);
    }
  }

  return {
    questions,
    isQuestionCoursed,
    setQuestions,
    setCoursedQuestion,
    navigate,
    nextNavigate
  }
}