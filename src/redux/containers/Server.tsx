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
		siderbarWidth: state.layout.siderbarWidth,
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
	onInitInstanceAsync: async (name: string) => {
		dispatch(actions.initInstanceAsync(name));
	},
	onKillAsync: async (param: IServerKillParamModel) => {
		dispatch(actions.killAsync(param));
	},
	onPingAsync: async (address: string) => {
		dispatch(actions.pingAsync(address));
	},
	onClearAsync: async () => {
		dispatch(actions.clearAsync());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Server);
