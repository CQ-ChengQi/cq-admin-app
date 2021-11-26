import { LabeledValue } from 'antd/lib/select';

export interface IServerSelectModel {
	name: string;
	id: string;
}

export interface IServerCodeModel {
	id: string;
	code: string;
	depends: string[];
}

export interface ICodeEditorState {
	init: boolean;
	serverSelectData: LabeledValue[];
	code: string;
	depends: string[];
	editing: boolean;
}
