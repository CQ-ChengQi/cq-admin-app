import { IServerSelectModel } from '../../infrastructure/interfaces/ICodeEditor';
import { IServerInstanceModel } from '../../infrastructure/interfaces/IInstance';
import { IServerKillParamModel } from '../../infrastructure/interfaces/IServer';
import * as types from '../constants/InstanceActionTypes';

export const load = (data: IServerInstanceModel[]) => ({
	type: types.LOAD_INSTANCE,
	payload: {
		data,
	},
});

export const kill = (address: IServerKillParamModel) => ({
	type: types.KILL_INSTANCE,
	payload: {
		address,
	},
});

export const ping = (name: string, address: string, data: any) => ({
	type: types.PING_INSTANCE,
	payload: {
		address,
		name,
	},
});

export const loadServerSelect = (data: IServerSelectModel[]) => ({
	type: types.LOAD_SERVER_SELECT_INSTANCE,
	payload: {
		data,
	},
});
