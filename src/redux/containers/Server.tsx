import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as actions from '../actions/ServerAsync';
import Server from '../../components/server/Index';
import { IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';

const mapStateToProps = (state: any) => {
	return {
		data: state.server.data,
		total: state.server.total,
		instanceData: state.server.instanceData,
		insatnceTotal: state.server.instanceTotal,
		siderbarWidth: state.layout.siderbarWidth,
		folderData: state.server.folderData,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onRunAsync: async (state: IServerModel) => {
		dispatch(actions.runAsync(state));
	},
	onEditCodeAsync: async (state: IServerModel) => {
		dispatch(actions.editCodeAsync(state));
	},
	onAddAsync: async (state: IServerModel) => {
		dispatch(actions.addAsync(state));
	},
	onEditAsync: async (state: IServerModel) => {
		dispatch(actions.editAsync(state));
	},
	onInitAsync: async (page: IPage) => {
		dispatch(actions.initAsync(page));
	},
	onDelAsync: async (state: string) => {
		dispatch(actions.delAsync(state));
	},
	onEnabledAsync: async (state: string) => {
		dispatch(actions.enabledAsync(state));
	},
	onDisbaledAsync: async (state: string) => {
		dispatch(actions.disbaledAsync(state));
	},
	onClearAsync: async () => {
		dispatch(actions.clearAsync());
	},
	onLoadServerFolderAsync: async () => {
		dispatch(actions.loadServerFolderAsync());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Server);
