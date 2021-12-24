import { useState } from 'react';
import { Modal } from 'antd';
import { ServerTable } from './Table';
import { ServerEdit } from './Edit';
import { IServerFolderModel, IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import './Index.css';

const { confirm } = Modal;

export interface IServerProps {
	onAddAsync: (state: IServerModel) => void;
	onEditAsync: (state: IServerModel) => void;
	onRunAsync: (state: IServerModel) => void;
	onEditCodeAsync: (state: IServerModel) => void;
	onDisbaledAsync: (id: string) => void;
	onEnabledAsync: (id: string) => void;
	onDelAsync: (id: string) => void;
	onInitAsync: (page: IPage) => void;
	onClearAsync: () => void;
	onLoadServerFolderAsync: () => void;
	data: IServerModel[];
	total: number;
	siderbarWidth: number;
	folderData: IServerFolderModel[];
}

export default function Server(props: IServerProps) {
	const {
		onAddAsync,
		onInitAsync,
		onRunAsync,
		onDisbaledAsync,
		onEnabledAsync,
		onDelAsync,
		onClearAsync,
		onEditAsync,
		onLoadServerFolderAsync,
		data,
		total,
		folderData,
	} = props;
	const [showEdit, setShowEdit] = useState(false);
	const [model, setModel] = useState<IServerModel>();

	const handlerHideEdit = () => {
		setShowEdit(false);
	};

	const handlerShowEdit = (model?: IServerModel) => {
		setModel(model);
		setShowEdit(true);
		onLoadServerFolderAsync();
	};

	const handlerClear = () => {
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
	};

	return (
		<>
			<PageContainer>
				<ServerTable
					onEdit={(model) => handlerShowEdit(model)}
					onDel={onDelAsync}
					onDisbaled={onDisbaledAsync}
					onEnabled={onEnabledAsync}
					onRun={onRunAsync}
					data={data}
					onInit={onInitAsync}
					onClear={() => handlerClear()}
					onAdd={() => handlerShowEdit()}
					total={total}
				/>
				<ServerEdit
					show={showEdit}
					onAdd={(model) => onAddAsync(model)}
					onEdit={(model) => onEditAsync(model)}
					onCancel={() => handlerHideEdit()}
					onLoadServerFolder={() => onLoadServerFolderAsync()}
					model={model}
					folders={folderData}
				/>
			</PageContainer>
		</>
	);
}
