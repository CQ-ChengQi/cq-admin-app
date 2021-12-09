import { ICodeEditorState, IServerDenpedCodeModel, IServerDependModel, IServerSelectItemModel } from '../../infrastructure/interfaces/ICodeEditor';
import * as types from '../../redux/constants/CodeEditorActionTypes';
import { hashCode } from '../../infrastructure/common/Hash';

const codeeditor = (
	state: ICodeEditorState = {
		init: false,
		serverSelectData: [],
		editing: false,
		id: '',
		depends: [],
		oriDepends: [],
		dependCodes: [],
		code: '',
		oriCode: '',
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
				code: action.payload.code,
				oriCode: action.payload.code,
				id: action.payload.id,
				editing: false,
			};

		case types.LOAD_DEPENDS_CODEEDITOR:
			let ids: string[] = [];
			let dependCodes: IServerDenpedCodeModel[] = [];
			(action.payload.lst as IServerDependModel[]).forEach((item) => {
				ids.push(item.depend);
				dependCodes.push({ code: item.code, id: item.depend });
			});
			return {
				...state,
				depends: ids,
				oriDepends: ids,
				dependCodes,
			};
		case types.LOAD_SERVER_CODEEDITOR:
			let result: IServerSelectItemModel[] = [];
			action.payload.servers.forEach((item: any) => {
				result.push({ label: item.name, value: item.id, code: item.code });
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
				oriCode: state.code,
				editing: action.payload.editing,
			};
		case types.SET_CODE_CODEEDITOR:
			let hashCode1 = hashCode(action.payload.code);
			let hashCode2 = hashCode(state.oriCode);
			return {
				...state,
				editing: hashCode1 !== hashCode2,
				code: action.payload.code,
			};
		case types.SET_DEPENDS_CODEEDITOR:
			let edit: boolean = false;
			if (state.oriDepends.length !== action.payload.ids.length) {
				edit = true;
			} else {
				(action.payload.ids as string[]).forEach((item) => {
					if (state.oriDepends.indexOf(item) < 0) {
						edit = true;
					}
				});
			}
			return {
				...state,
				depends: action.payload.ids,
				editing: edit,
			};
	}

	return state;
};

export default codeeditor;
