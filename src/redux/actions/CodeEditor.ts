import * as types from '../constants/CodeEditorActionTypes';

export const init_monaco = () => ({
	type: types.MONACO_INIT_CODEEDITOR,
});

export const init = (id: string) => ({
	type: types.INIT_CODEEDITOR,
	id,
});

export const save = (id: string, code: string) => ({
	type: types.SAVE_CODEEDITOR,
	id,
	code,
});
