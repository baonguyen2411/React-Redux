import * as types from './../constants/ActionTypes'

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var generateID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}

var myReducer = (state = initialState, action) => {
    let id = '';
    let index = '';
    if (action.id) {
        id = action.id;
        index = state.findIndex(task => task.id === id);
    }
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === true ? true : false
            }
            if (task.id) {
                index = state.findIndex(task => task.id === action.task.id);
                state[index] = task;
            } else {
                task.id = generateID();
                state.push(task);
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        default:
            return state
    }
}

export default myReducer;