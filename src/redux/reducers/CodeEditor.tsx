import { ICodeEditorState } from '../../infrastructure/interfaces/ICodeEditor';
import * as types from '../../redux/constants/CodeEditorActionTypes';

const codeeditor = (
	state: ICodeEditorState = {
		init: false,
	},
	action: any,
): ICodeEditorState => {
	switch (action.type) {
		case types.MONACO_INIT_CODEEDITOR:
			return {
				init: true,
			};
	}

	return state;
};

export default codeeditor;
