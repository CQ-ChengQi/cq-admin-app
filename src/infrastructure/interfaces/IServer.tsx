import { ServerInstanceType, ServerStatusEnum } from '../enums/Server';
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

export interface IServerInstanceModel {
	address: string;
	server_name: string;
	server_id: string;
	type: ServerInstanceType;
	created_date: string;
}

export interface IServerAction<T> {
	type: string;
	state: T;
}

export interface IServerState {
	total: number;
	data: IServerModel[];
	instanceData: IServerInstanceModel[];
	instanceTotal: number;
}

export interface IServerFilter extends IPageFilter {
	name: string;
	description: string;
	status: ServerStatusEnum;
}
