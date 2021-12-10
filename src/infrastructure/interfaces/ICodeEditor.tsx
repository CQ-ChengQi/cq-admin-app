import { LabeledValue } from 'antd/lib/select';

export interface IServerDenpedCodeModel {
	id: string;
	code: string;
}

export interface IServerCodeModel {
	id: string;
	code: string;
	depends: string[];
	name: string;
}

export interface IServerDependModel {
	id: string;
	depend: string;
	sort: number;
	code: string;
}

export interface ICodeEditorState {
	init: boolean;
	serverSelectData: LabeledValue[];
	editing: boolean;
	id: string;
	depends: string[];
	dependCodes: IServerDenpedCodeModel[];
	oriDepends: string[];
	code: string;
	oriCode: string;
}

export interface IServerSelectItemModel {
	label: string;
	value: string;
	code: string;
}

export interface IServerSelectModel {
	name: string;
	id: string;
}
