import { IServerCodeModel, IServerDependModel, IServerSelectModel } from '../../infrastructure/interfaces/ICodeEditor';
import * as types from '../constants/CodeEditorActionTypes';

export const init_monaco = () => ({
	type: types.INIT_CODEEDITOR,
});

export const save = (model: IServerCodeModel) => ({
	type: types.SAVE_CODEEDITOR,
	payload: {
		model,
	},
});

export const loadServer = (servers: IServerSelectModel[]) => ({
	type: types.LOAD_SERVER_CODEEDITOR,
	payload: {
		servers,
	},
});

export const loadCode = (id: string, code: string) => ({
	type: types.LOAD_CODE_CODEEDITOR,
	payload: {
		code,
		id,
	},
});

export const loadDepends = (lst: IServerDependModel[]) => ({
	type: types.LOAD_DEPENDS_CODEEDITOR,
	payload: {
		lst,
	},
});

export const clearCode = () => ({
	type: types.CLEAR_CODEEDITOR,
});

export const editingCode = (editing: boolean) => ({
	type: types.EDITING_CODEEDITOR,
	payload: {
		editing,
	},
});

export const setCode = (code: string) => ({
	type: types.SET_CODE_CODEEDITOR,
	payload: {
		code,
	},
});

export const setDepends = (ids: string[]) => ({
	type: types.SET_DEPENDS_CODEEDITOR,
	payload: {
		ids,
	},
});
