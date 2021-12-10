import { ServerInstanceType } from '../enums/Server';

export interface IServerInstanceModel {
	address: string;
	name: string;
	type: ServerInstanceType;
	created_date: string;
	id: string;
}

export interface IInstanceState {
	data: IServerInstanceModel[];
	serverSelectData: any;
	total: Number;
	init: boolean;
}
