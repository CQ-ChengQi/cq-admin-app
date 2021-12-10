import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Instance } from '../../components/instance/Index';
import { IServerKillParamModel } from '../../infrastructure/interfaces/IServer';
import * as actions from '../actions/InstanceAsync';

const mapStateToProps = (state: any) => {
	return {
		data: state.instance.data,
		total: state.instance.total,
		serverSelectData: state.instance.serverSelectData,
		init: state.instance.init,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onLoad: async (id: string) => {
		dispatch(actions.loadAsync(id));
	},
	onKill: async (param: IServerKillParamModel) => {
		dispatch(actions.killAsync(param));
	},
	onPing: async (name: string, address: string) => {
		dispatch(actions.pingAsync(name, address));
	},
	onLoadServerSelect: async () => {
		dispatch(actions.loadServerSelectAsync());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Instance);
