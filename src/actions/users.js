import { _getUsers } from '../utils/_DATA'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'


export async function getUsers() {
    const users = await _getUsers();
    return users;
}

//normal action creator to receive users:
export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}
//async action creator to receive users:
// export function handleReceiveUsers() {
//     return (dispatch) => {
//         return getUsers()
//             .then((users) => {
//                 dispatch(receiveUsers(users))
//         })
//     }
// // }
// export function saveUserQuestion (question,user, qid) {
//     return {
//         type: SAVE_USER_QUESTION,
//         question,
//         // user,
//         // qid,
//     }
// }

// export function saveUserAnswer (user, qid, answer) {
// return {
//     type: SAVE_USER_ANSWER,
//     user,
//     qid,
//     answer
// }
// }