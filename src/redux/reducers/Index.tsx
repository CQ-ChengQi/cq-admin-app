import { combineReducers } from 'redux';
import layout from './Layout';
import server from './Server';
import codeeditor from './CodeEditor';
import instance from './Instance';

const reducer = combineReducers({
	server,
	layout,
	codeeditor,
	instance,
});

export default reducer;
