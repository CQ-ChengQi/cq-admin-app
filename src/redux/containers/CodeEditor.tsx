import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { CodeEditor } from '../../components/codeeditor/Index';
import { IServerCodeModel } from '../../infrastructure/interfaces/ICodeEditor';
import * as actions from '../../redux/actions/CodeEditor';
import * as asyncActions from '../actions/CodeEditorAsync';

const mapStateToProps = (state: any) => {
	return {
		init: state.codeeditor.init,
		collapsed: state.layout.collapsed,
		code: state.codeeditor.code,
		serverSelectData: state.codeeditor.serverSelectData,
		depends: state.codeeditor.depends,
		editing: state.codeeditor.editing,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onCollapsed: (collapsed: boolean) => {},
	onMonacoInit: async () => {
		dispatch(actions.init_monaco());
	},
	onLoadSelect: async () => {
		dispatch(asyncActions.loadServerAsync());
	},
	onLoadDependSelect: async (id: string) => {
		dispatch(asyncActions.loadDependsAsync(id));
	},
	onLoadCode: async (id: string) => {
		dispatch(asyncActions.loadCodeAsync(id));
	},
	onSave: async (model: IServerCodeModel) => {
		dispatch(asyncActions.saveAsnync(model));
	},
	onClear: async () => {
		dispatch(actions.clearCode());
	},
	onEditing: async (editing: boolean) => {
		dispatch(actions.editingCode(editing));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
