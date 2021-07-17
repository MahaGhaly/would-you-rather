export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'



//normal action creator to receive questions:
export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

//normal action creator to add question:
export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}


//normal action creator to save answers:
export function answerQuestion({authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer,
    };
}