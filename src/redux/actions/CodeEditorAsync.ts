import { Dispatch } from 'redux';
import * as actions from './CodeEditor';
import { post } from '../../infrastructure/common/Server';
import { IActionResult, IPageResult } from '../../infrastructure/interfaces/ITable';
import { IServerCodeModel, IServerDependModel, IServerSelectModel } from '../../infrastructure/interfaces/ICodeEditor';
import { message } from 'antd';

export const loadCodeAsync = (id: string) => (dispatch: Dispatch) => {
	post<string>('/api/server/load_code', { id }).then((res) => {
		dispatch(actions.loadCode(id, res));
	});
};

export const loadServerAsync = () => (dispatch: Dispatch) => {
	post<IPageResult<IServerSelectModel>>('/api/server/load_server', {}).then((res) => {
		dispatch(actions.loadServer(res.data));
	});
};

export const loadDependsAsync = (id: string) => (dispatch: Dispatch) => {
	post<IPageResult<IServerDependModel>>('/api/server/load_depends', { id }).then((res) => {
		dispatch(actions.loadDepends(res.data));
	});
};

export const saveAsnync = (model: IServerCodeModel) => (dispatch: Dispatch) => {
	post<IActionResult<string>>('/api/server/save_code', model).then((res) => {
		if (res.success) {
			message.success(res.message);
			dispatch(actions.editingCode(false));
		} else message.error(res.message);
	});
};
