import * as types from '../constants/ActionTypes'

var initialState = {
    sortName: '',
    sortValue: -1,
};
var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SORT_TASK:
            return {
                sortName: action.sort.sortName,
                sortValue: action.sort.sortValue
            };
        default: return state
    }
}

export default myReducer;