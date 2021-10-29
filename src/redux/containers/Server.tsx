import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as actions from '../actions/Server';
import Server from '../../components/server/Index';
import { IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';

const mapStateToProps = (state: any) => {
	return {
		data: state.server.data,
		total: state.server.total,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onAdd: (state: IServerModel) => () => dispatch(actions.add(state)),
	onEdit: (state: IServerModel) => dispatch(actions.edit(state)),
	onRun: (state: string) => dispatch(actions.run(state)),

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Server);
