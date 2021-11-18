import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CodeEditor } from '../../components/codeeditor/Index';
import * as actions from '../../redux/actions/CodeEditor';

const mapStateToProps = (state: any) => {
	return {
		offsetWidth: state.layout.siderbarWidth,
		init: state.codeeditor.init,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onCollapsed: (collapsed: boolean) => {},
	onMonacoInit: () => {
		dispatch(actions.init_monaco());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
