import { ServerInstanceType, ServerStatusEnum } from '../enums/Server';
export interface IServerModel {
	id: string;
	name: string;
	status: ServerStatusEnum;
	description: string;
	updated_date: string;
	created_date: string;
	code: string;
	type: ServerInstanceType;
}

export interface IServerKillParamModel {
	name: string;
	address: string;
}

export interface IServerAction<T> {
	type: string;
	state: T;
}

export interface IServerFolderModel {
	name: string;
	id: string;
}

export interface IServerState {
	total: number;
	data: IServerModel[];
	folderData: IServerFolderModel[];
}
