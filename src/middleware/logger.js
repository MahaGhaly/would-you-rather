const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action is: ', action)
        const resultValue = next(action)
        console.log('The new state is: ', store.getState())
    console.groupEnd()
    return resultValue
}
export default logger