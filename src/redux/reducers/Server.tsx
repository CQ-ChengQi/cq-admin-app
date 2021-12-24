import * as types from '../constants/ServerActionTypes';
import { ServerStatusEnum } from '../../infrastructure/enums/Server';
import { IServerAction, IServerFolderModel, IServerModel, IServerState } from '../../infrastructure/interfaces/IServer';
import { IPageResult } from '../../infrastructure/interfaces/ITable';

const server = (
	state: IServerState = {
		total: 0,
		data: [],
		folderData: [],
	},
	action: IServerAction<IServerModel> | IServerAction<string> | IServerAction<IPageResult<IServerModel>> | IServerAction<IPageResult<IServerFolderModel>>,
): IServerState => {
	console.log(action.type);
	switch (action.type) {
		case types.INIT_SERVER:
			const pageResult = action as IServerAction<IPageResult<IServerModel>>;
			return {
				total: pageResult.state.total,
				data: [...pageResult.state.data],
				folderData: [],
			};

		case types.ADD_SERVER:
			let data: IServerModel[] = [(action as IServerAction<IServerModel>).state, ...state.data];
			state.total += 1;
			return {
				...state,
				data,
			};
		case types.EDIT_SERVER:
			const actionState = (action as IServerAction<IServerModel>).state;
			const editData = state.data.map((server) => (server.id === actionState.id ? { ...server, ...actionState } : server));
			return {
				...state,
				data: editData,
			};
		case types.DEL_SERVER:
			const delData = state.data.filter((todo) => todo.id !== action.state);
			return {
				...state,
				data: delData,
			};
		case types.DISBALED_SERVER:
			const disbaledData = state.data.map((server) => (server.id === action.state ? { ...server, status: ServerStatusEnum.disbaled } : server));
			return {
				...state,
				data: disbaledData,
			};
		case types.ENABLED_SERVER:
			const enabledData = state.data.map((server) => (server.id === action.state ? { ...server, status: ServerStatusEnum.enabled } : server));
			return {
				...state,
				data: enabledData,
			};
		case types.EDIT_CODE_SERVER:
			const editCodeAction = action as IServerAction<IServerModel>;
			const editCodeData = state.data.map((server) => (server.id === editCodeAction.state.id ? { ...server, code: editCodeAction.state.code } : server));
			return { ...state, data: editCodeData };
		case types.LOAD_SERVER_FOLDER:
			const folderAction = action as IServerAction<IPageResult<IServerFolderModel>>;
			console.log(folderAction);
			return { ...state, folderData: folderAction.state.data };
		default:
			return state;
	}
};

export default server;
