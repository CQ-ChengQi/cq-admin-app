import { LabeledValue } from 'antd/lib/select';
import { ICodeEditorState } from '../../infrastructure/interfaces/ICodeEditor';
import * as types from '../../redux/constants/CodeEditorActionTypes';

const codeeditor = (
	state: ICodeEditorState = {
		init: false,
		serverSelectData: [],
		depends: [],
		code: '',
		editing: false,
	},
	action: any,
): ICodeEditorState => {
	switch (action.type) {
		case types.INIT_CODEEDITOR:
			return {
				...state,
				init: true,
			};
		case types.LOAD_CODE_CODEEDITOR:
			return {
				...state,
				code: action.code,
			};
		case types.LOAD_DEPENDS_CODEEDITOR:
			return {
				...state,
				depends: action.ids,
			};
		case types.LOAD_SERVER_CODEEDITOR:
			let result: LabeledValue[] = [];
			action.servers.forEach((item: any) => {
				result.push({ label: item.name, value: item.id });
			});

			return {
				...state,
				serverSelectData: result,
			};
		case types.CLEAR_CODEEDITOR:
			return {
				...state,
				code: '',
			};
		case types.EDITING_CODEEDITOR:
			return {
				...state,
				editing: action.editing,
			};
	}

	return state;
};

export default codeeditor;
