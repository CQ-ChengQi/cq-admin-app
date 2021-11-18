import { Dispatch } from 'redux';
import { message } from 'antd';
import { post } from '../../infrastructure/common/Server';
import { IActionResult, IPage, IPageResult } from '../../infrastructure/interfaces/ITable';
import {
	IServerInstanceModel,
	IServerKillParamModel,
	IServerModel,
} from '../../infrastructure/interfaces/IServer';
import * as actions from './Server';

export const editCodeAsync = (state: IServerModel) => (dispatch: Dispatch) => {
	post<IActionResult<IServerModel>>('/api/server/edit_code', state).then((res) => {
		dispatch(actions.editCode(res.data));
	});
};

export const enabledAsync = (id: string) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<string>>('/api/server/enabled', { id: id }).then((res) => {
			dispatch(actions.enabled(res.data));
		});
	};
};

export const runAsync = (state: IServerModel) => (dispatch: Dispatch) => {
	post<IActionResult<IServerModel>>('/api/server/run', state).then((res) => {
		dispatch(actions.run(res.data));
	});
};
export const initInstanceAsync = (state: IServerModel) => (dispatch: Dispatch) => {
	post<IPageResult<IServerInstanceModel>>('/api/server/get_instance', state).then((res) => {
		dispatch(actions.initInstance(res));
	});
};

export const killAsync = (param: IServerKillParamModel) => (dispatch: Dispatch) => {
	console.log(param);
	post<IActionResult<IServerKillParamModel>>('/api/server/kill_instance', param).then((res) => {
		if (res.success) {
			dispatch(actions.kill(res.data));
			message.success(res.message);
		} else message.error(res.message);
	});
};

export const pingAsync = (state: string) => (dispatch: Dispatch) => {
	post<IActionResult<string>>('/api/server/ping_instance', { address: state }).then((res) => {
		if (res.success) {
			dispatch(actions.ping(res.data));
			message.success(res.message);
		} else message.error(res.message);
	});
};

export const clearAsync = () => (dispatch: Dispatch) => {
	post<IActionResult<string>>('/api/server/clear', {}).then((res) => {
		if (res.success) {
			dispatch(actions.clear());
			message.success(res.message);
		} else message.error(res.message);
	});
};

export const addAsync = (state: IServerModel) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<IServerModel>>('/api/server/add', state).then((res) => {
			dispatch(actions.add(res.data));
		});
	};
};

export const delAsync = (id: string) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<string>>('/api/server/del', { id: id }).then((res) => {
			dispatch(actions.del(res.data));
		});
	};
};

export const disbaledAsync = (id: string) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<string>>('/api/server/disbaled', { id: id }).then((res) => {
			dispatch(actions.disbaled(res.data));
		});
	};
};

export const initAsync = (state: IPage) => (dispatch: Dispatch) => {
	post<IPageResult<IServerModel>>('/api/server/get', state).then((res) => {
		dispatch(actions.init(res));
	});
};
