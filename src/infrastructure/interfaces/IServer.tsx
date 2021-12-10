import { ServerStatusEnum } from '../enums/Server';
import { IPageFilter } from './ITable';

export interface IServerModel {
	id: string;
	name: string;
	status: ServerStatusEnum;
	description: string;
	updated_date: string;
	created_date: string;
	code: string;
}

export interface IServerKillParamModel {
	name: string;
	address: string;
}

export interface IServerAction<T> {
	type: string;
	state: T;
}

export interface IServerState {
	total: number;
	data: IServerModel[];
}

export interface IServerFilter extends IPageFilter {
	name: string;
	description: string;
	status: ServerStatusEnum;
}
