import { useState } from 'react';
import { Modal } from 'antd';
import { ServerTable } from './Table';
import { ServerEdit } from './Edit';
import { IServerInstanceModel, IServerKillParamModel, IServerModel } from '../../infrastructure/interfaces/IServer';
import { IPage } from '../../infrastructure/interfaces/ITable';
import { ServerInstance } from './Instance';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import './Index.css';

const { confirm } = Modal;

export interface IServerProps {
	onAddAsync: (state: IServerModel) => void;
	onRunAsync: (state: IServerModel) => void;
	onEditCodeAsync: (state: IServerModel) => void;
	onDisbaledAsync: (id: string) => void;
	onEnabledAsync: (id: string) => void;
	onDelAsync: (id: string) => void;
	onInitAsync: (page: IPage) => void;
	onInitInstanceAsync: (id: string) => void;
	onKillAsync: (param: IServerKillParamModel) => void;
	onPingAsync: (address: string) => void;
	onClearAsync: () => void;
	data: IServerModel[];
	total: number;
	instanceData?: IServerInstanceModel[];
	instanceTotal?: number;
	siderbarWidth: number;
}

export default function Server(props: IServerProps) {
	const {
		onAddAsync,
		onInitAsync,
		onRunAsync,
		onDisbaledAsync,
		onEnabledAsync,
		onDelAsync,
		onPingAsync,
		onKillAsync,
		onClearAsync,
		onInitInstanceAsync,
		data,
		total,
		instanceTotal,
		instanceData,
	} = props;

	const [showEdit, setShowEdit] = useState(false);
	const [showInstance, setShowInstance] = useState(false);

	const handlerHideEdit = () => {
		setShowEdit(false);
	};

	const handlerShowEdit = (model?: IServerModel) => {
		setShowEdit(true);
	};

	const handlerShowInstance = (model: IServerModel) => {
		onInitInstanceAsync(model.name);
		setShowInstance(true);
	};
	const handlerHideInstance = () => {
		setShowInstance(false);
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
					onInstance={(model) => handlerShowInstance(model)}
					data={data}
					onInit={onInitAsync}
					onClear={() => handlerClear()}
					onAdd={() => handlerShowEdit()}
					total={total}
				/>
				<ServerEdit show={showEdit} onAdd={(model) => onAddAsync(model)} onEdit={(model) => {}} onCancel={() => handlerHideEdit()} />
				<ServerInstance
					onKill={(address) => onKillAsync(address)}
					onPing={(address) => onPingAsync(address)}
					data={instanceData}
					total={instanceTotal}
					show={showInstance}
					onCancel={() => handlerHideInstance()}
				/>
			</PageContainer>
		</>
	);
}
