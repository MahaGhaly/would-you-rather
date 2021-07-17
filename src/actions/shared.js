import { _getUsers,_getQuestions,_saveQuestionAnswer,_saveQuestion } from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions, addQuestion, answerQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'


//api functions:
export async function getUsers() {
    const users = await _getUsers();
    return users;
}

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getUsers(), _getQuestions()])
            .then(([users, questions]) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}


export function saveQuestionApi(question) {
    return _saveQuestion(question);
}
export function handleSaveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
    
}

export function handleSaveQuestion (newQues) {
    return(dispatch, getState)=>{
        const {authedUser} = getState() 
        const {first,second} = newQues
        dispatch(showLoading())
        return _saveQuestion({
            author: authedUser,
            optionOneText: first,
            optionTwoText: second
        })
        .then(question=>dispatch(addQuestion(question)))
        .then(()=>
        {
        dispatch(handleInitialData())
        dispatch(hideLoading())
    })
    }
}

export function handleAnswer (authedUser, qid, answer) {
    return (dispatch) => {
        
        dispatch(answerQuestion(
            {authedUser,
            qid, 
            answer}))
        return _saveQuestionAnswer(
            {authedUser, 
            qid, 
            answer}
        )
        .then(()=>dispatch(handleInitialData()))
        }
}