import { Dispatch } from 'redux';
import * as actions from './Instance';
import { post } from '../../infrastructure/common/Server';
import { IActionResult, IPageResult } from '../../infrastructure/interfaces/ITable';
import { IServerInstanceModel } from '../../infrastructure/interfaces/IInstance';
import { IServerKillParamModel } from '../../infrastructure/interfaces/IServer';
import { message } from 'antd';

export const loadAsync = (id: string) => (dispatch: Dispatch) => {
	post<IPageResult<IServerInstanceModel>>('/api/server/instance/get_instance', { id }).then((res) => {
		dispatch(actions.load(res.data));
	});
};

export const killAsync = (param: IServerKillParamModel) => (dispatch: Dispatch) => {
	post<IActionResult<IServerKillParamModel>>('/api/server/instance/kill_instance', param).then((res) => {
		if (res.success) {
			dispatch(actions.kill(res.data));
			message.success(res.message);
		} else message.error(res.message);
	});
};

export const pingAsync = (name: string, address: string) => (dispatch: Dispatch) => {
	post<IActionResult<string>>('/api/server/instance/ping_instance', { name, address }).then((res) => {
		if (res.success) {
			dispatch(actions.ping(name, address, res.data));
			message.success(res.data);
		} else message.error(res.message);
	});
};

export const loadServerSelectAsync = () => (dispatch: Dispatch) => {
	post<IPageResult<any>>('/api/server/instance/get_server_select', {}).then((res) => {
		dispatch(actions.loadServerSelect(res.data));
	});
};
