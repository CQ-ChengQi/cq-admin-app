import React, { RefObject } from 'react';
import { Button, Space } from 'antd';
import { ServerTable } from './Table';
import { ServerEdit } from './Edit';
import { IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';

import './Index.less';



interface IServerProps {
	onAddAsync: (state: IServerModel) => void;
	onEdit: (state: IServerModel) => void;
	onRun: (id: string) => void;
	onEditCode: (id: string) => void;
	onDisbaledAsync: (id: string) => void;
	onEnabledAsync: (id: string) => void;
	onDelAsync: (id: string) => void;
	onInitAsync: (page: IPage) => void;
	data: IServerModel[];
	total: number;
}

interface IServerState {
	showEdit: boolean;
}

export default class Server extends React.Component<IServerProps, IServerState> {
	private serverEditRef: RefObject<ServerEdit>;

	constructor(props: IServerProps, state: IServerState) {
		super(props);

		this.state = { showEdit: false };
		this.serverEditRef = React.createRef<ServerEdit>();

		this.handlerHideEdit = this.handlerHideEdit.bind(this);
		this.handlerShowEdit = this.handlerShowEdit.bind(this);
	}

	private handlerHideEdit(): void {
		this.setState({ showEdit: false });
	}

	private handlerShowEdit(model?: IServerModel): void {
		this.serverEditRef.current?.setFormValues(model);
		this.setState({ showEdit: true });
	}

	public render(): JSX.Element {
		const {
			onAddAsync,
			onInitAsync,
			onEdit,
			onRun,
			onDisbaledAsync,
			onEnabledAsync,
			onDelAsync,
			onEditCode,
			data,
			total,
		} = this.props;
		const { showEdit } = this.state;
		return (
			<>
				<Space id="table-space-toolbar">
					<Button type="primary" onClick={() => this.handlerShowEdit()}>
						新建
					</Button>
				</Space>

				<ServerTable
					onEdit={(model) => this.handlerShowEdit(model)}
					onDel={onDelAsync}
					onDisbaled={onDisbaledAsync}
					onEnabled={onEnabledAsync}
					onEditCode={onEditCode}
					onRun={onRun}
					data={data}
					onInit={onInitAsync}
					total={total}
				></ServerTable>

				<ServerEdit
					ref={this.serverEditRef}
					show={showEdit}
					onAdd={(model) => onAddAsync(model)}
					onEdit={(model) => onEdit(model)}
					onCancel={() => this.handlerHideEdit()}
				></ServerEdit>
			</>
		);
	}
}
