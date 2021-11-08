import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as actions from '../actions/ServerAsync';
import Server from '../../components/server/Index';
import { IServerKillParamModel, IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';

const mapStateToProps = (state: any) => {
	return {
		data: state.server.data,
		total: state.server.total,
		instanceData: state.server.instanceData,
		insatnceTotal: state.server.instanceTotal,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onRunAsync: async (state: IServerModel) => {
		await dispatch(actions.runAsync(state));
	},
	onEditCodeAsync: async (state: IServerModel) => {
		await dispatch(actions.editCodeAsync(state));
	},
	onAddAsync: async (state: IServerModel) => {
		await dispatch(actions.addAsync(state));
	},
	onInitAsync: async (page: IPage) => {
		await dispatch(actions.initAsync(page));
	},
	onDelAsync: async (state: string) => {
		await dispatch(actions.delAsync(state));
	},
	onEnabledAsync: async (state: string) => {
		await dispatch(actions.enabledAsync(state));
	},
	onDisbaledAsync: async (state: string) => {
		await dispatch(actions.disbaledAsync(state));
	},
	onInitInstanceAsync: async (page: IServerModel) => {
		await dispatch(actions.initInstanceAsync(page));
	},
	onKillAsync: async (param: IServerKillParamModel) => {
		await dispatch(actions.killAsync(param));
	},
	onPingAsync: async (address: string) => {
		await dispatch(actions.pingAsync(address));
	},
	onClearAsync: async () => {
		await dispatch(actions.clearAsync());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Server);
