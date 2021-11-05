import React, { RefObject } from 'react';
import { Button, Modal, Space } from 'antd';
import { ServerTable } from './Table';
import { ServerEdit } from './Edit';
import { IServerInstanceModel, IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';
import { ServerCodeEditor } from './CodeEditor';
import { ServerInstance } from './Instance';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './Index.css';

const { confirm } = Modal;

interface IServerProps {
	onAddAsync: (state: IServerModel) => void;
	onRunAsync: (state: IServerModel) => void;
	onEditCodeAsync: (state: IServerModel) => void;
	onDisbaledAsync: (id: string) => void;
	onEnabledAsync: (id: string) => void;
	onDelAsync: (id: string) => void;
	onInitAsync: (page: IPage) => void;
	onInitInstanceAsync: (page: IServerModel) => void;
	onKillAsync: (address: string) => void;
	onPingAsync: (address: string) => void;
	onClearAsync: () => void;
	data: IServerModel[];
	total: number;
	instanceData?: IServerInstanceModel[];
	instanceTotal?: number;
}

interface IServerState {
	showEdit: boolean;
	showCodeEditor: boolean;
	showInstance: boolean;
}

export default class Server extends React.Component<IServerProps, IServerState> {
	private serverEditRef: RefObject<ServerEdit>;
	private serverCodeEditorRef: RefObject<ServerCodeEditor>;

	constructor(props: IServerProps, state: IServerState) {
		super(props);

		this.state = { showEdit: false, showCodeEditor: false, showInstance: false };
		this.serverEditRef = React.createRef<ServerEdit>();
		this.serverCodeEditorRef = React.createRef<ServerCodeEditor>();

		this.handlerHideEdit = this.handlerHideEdit.bind(this);
		this.handlerShowEdit = this.handlerShowEdit.bind(this);
		this.handlerHideCodeEditor = this.handlerHideCodeEditor.bind(this);
		this.handlerShowCodeEditor = this.handlerShowCodeEditor.bind(this);
		this.handlerShowInstance = this.handlerShowInstance.bind(this);
		this.handlerHideInstance = this.handlerHideInstance.bind(this);
		this.handlerClear = this.handlerClear.bind(this);
	}

	private handlerHideEdit(): void {
		this.setState({ showEdit: false });
	}

	private handlerShowEdit(model?: IServerModel): void {
		this.serverEditRef.current?.setFormValues(model);
		this.setState({ showEdit: true });
	}

	private handlerHideCodeEditor(): void {
		this.setState({ showCodeEditor: false });
	}

	private handlerShowCodeEditor(model: IServerModel): void {
		this.serverCodeEditorRef.current?.setFormValues(model);
		this.setState({ showCodeEditor: true });
	}

	private handlerShowInstance(model: IServerModel): void {
		this.props.onInitInstanceAsync(model);
		this.setState({ showInstance: true });
	}
	private handlerHideInstance(): void {
		this.setState({ showInstance: false });
	}

	private handlerClear(): void {
		const { onClearAsync } = this.props;
		confirm({
			title: '系统提示',
			icon: <ExclamationCircleOutlined />,
			content: '是否清除所有服务代码缓存 ?',
			okText: '清除',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				onClearAsync();
			},
		});
	}

	public render(): JSX.Element {
		const {
			onAddAsync,
			onInitAsync,
			onEditCodeAsync,
			onRunAsync,
			onDisbaledAsync,
			onEnabledAsync,
			onDelAsync,
			onPingAsync,
			onKillAsync,
			data,
			total,
			instanceTotal,
			instanceData,
		} = this.props;

		const { showEdit, showCodeEditor, showInstance } = this.state;

		return (
			<>
				<Space id="table-space-toolbar">
					<Button type="primary" onClick={() => this.handlerShowEdit()}>
						新建
					</Button>
					<Button type="dashed" onClick={() => this.handlerClear()}>
						清理缓存
					</Button>
				</Space>

				<ServerTable
					onEdit={(model) => this.handlerShowEdit(model)}
					onDel={onDelAsync}
					onDisbaled={onDisbaledAsync}
					onEnabled={onEnabledAsync}
					onEditCode={(model) => this.handlerShowCodeEditor(model)}
					onRun={onRunAsync}
					onInstance={(model) => this.handlerShowInstance(model)}
					data={data}
					onInit={onInitAsync}
					total={total}
				/>

				<ServerEdit
					ref={this.serverEditRef}
					show={showEdit}
					onAdd={(model) => onAddAsync(model)}
					onEdit={(model) => {}}
					onCancel={() => this.handlerHideEdit()}
				/>

				<ServerCodeEditor
					ref={this.serverCodeEditorRef}
					show={showCodeEditor}
					onCancel={() => this.handlerHideCodeEditor()}
					onEdit={(model) => onEditCodeAsync(model)}
				/>

				<ServerInstance
					onKill={(address) => onKillAsync(address)}
					onPing={(address) => onPingAsync(address)}
					onInit={() => {}}
					data={instanceData}
					total={instanceTotal}
					show={showInstance}
					onCancel={() => this.handlerHideInstance()}
				/>
			</>
		);
	}
}
