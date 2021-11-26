import { IServerCodeModel, IServerSelectModel } from '../../infrastructure/interfaces/ICodeEditor';
import * as types from '../constants/CodeEditorActionTypes';

export const init_monaco = () => ({
	type: types.INIT_CODEEDITOR,
});

export const save = (model: IServerCodeModel) => ({
	type: types.SAVE_CODEEDITOR,
	model,
});

export const loadServer = (servers: IServerSelectModel[]) => ({
	type: types.LOAD_SERVER_CODEEDITOR,
	servers,
});

export const loadCode = (code: string) => ({
	type: types.LOAD_CODE_CODEEDITOR,
	code,
});

export const loadDepends = (ids: string[]) => ({
	type: types.LOAD_DEPENDS_CODEEDITOR,
	ids,
});

export const clearCode = () => ({
	type: types.CLEAR_CODEEDITOR,
});

export const editingCode = (editing: boolean) => ({
	type: types.EDITING_CODEEDITOR,
	editing,
});
