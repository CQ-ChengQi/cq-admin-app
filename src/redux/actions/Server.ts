import * as types from '../constants/ServerActionTypes';
import { IServerAction, IServerFolderModel, IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPageResult } from '../../infrastructure/interfaces/ITable';

export const add = (state: IServerModel): IServerAction<IServerModel> => ({
	type: types.ADD_SERVER,
	state,
});

export const edit = (state: IServerModel): IServerAction<IServerModel> => ({
	type: types.EDIT_SERVER,
	state,
});

export const del = (state: string): IServerAction<string> => ({
	type: types.DEL_SERVER,
	state,
});

export const edit_code = (state: string): IServerAction<string> => ({
	type: types.EDIT_CODE_SERVER,
	state,
});

export const disbaled = (state: string): IServerAction<string> => ({
	type: types.DISBALED_SERVER,
	state,
});

export const enabled = (state: string): IServerAction<string> => ({
	type: types.ENABLED_SERVER,
	state,
});

export const init = (state: IPageResult<IServerModel>): IServerAction<IPageResult<IServerModel>> => ({
	type: types.INIT_SERVER,
	state,
});

export const editCode = (state: IServerModel) => ({
	type: types.EDIT_CODE_SERVER,
	state,
});

export const run = (state: IServerModel): IServerAction<IServerModel> => ({
	type: types.RUN_SERVER,
	state,
});

export const clear = (): IServerAction<string> => ({
	type: types.CLEAR_SERVER_CODE_CACHE,
	state: '',
});

export const loadServerFolder = (state: IPageResult<IServerFolderModel>): IServerAction<IPageResult<IServerFolderModel>> => ({
	type: types.LOAD_SERVER_FOLDER,
	state,
});
