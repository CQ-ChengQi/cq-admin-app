import { combineReducers } from 'redux';
import layout from './Layout';
import server from './Server';
import codeeditor from './CodeEditor';

const reducer = combineReducers({
	server,
	layout,
	codeeditor,
});

export default reducer;
