import { LabeledValue } from 'antd/lib/select';

export interface IServerSelectModel {
	name: string;
	id: string;
}

export interface IServerCodeModel {
	id: string;
	code: string;
	depends: LabeledValue[];
	name: string;
}

export interface IServerDependModel {
	id: string;
	depend: string;
	sort: number;
}

export interface ICodeEditorState {
	init: boolean;
	serverSelectData: LabeledValue[];
	editing: boolean;
	id: string;
	depends: string[];
	oriDepends: string[];
	code: string;
	oriCode: string;
}
