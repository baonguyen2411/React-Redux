import { combineReducers } from 'redux';

import tasks from './tasks';
import isDisplayForm from './toggle-form';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
    tasks,
    itemEditing,
    isDisplayForm,
    filterTable,
    search,
    sort
});

export default myReducer;