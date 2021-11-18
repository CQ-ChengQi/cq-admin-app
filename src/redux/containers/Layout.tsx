import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Layout } from '../../components/main/Layout';
import * as actions from '../actions/Layout';

const mapStateToProps = (state: any) => {
	return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onCollapsed: (collapsed: boolean) => {
		dispatch(actions.collapsed(collapsed));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
