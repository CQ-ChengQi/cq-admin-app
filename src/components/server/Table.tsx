import { useState } from 'react';
import { Button, Input, Modal, Popconfirm, Space, Tag } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, ClearOutlined } from '@ant-design/icons';
import { IServerModel } from '../../infrastructure/interfaces/IServer';
import { ServerStatusEnum } from '../../infrastructure/enums/Server';
import { IPage } from '../../infrastructure/interfaces/ITable';
import ProTable from '@ant-design/pro-table';

export interface IServerTableProps {
	onAdd: () => void;
	onEdit: (model: IServerModel) => void;
	onRun: (id: IServerModel) => void;
	onDisbaled: (id: string) => void;
	onEnabled: (id: string) => void;
	onDel: (id: string) => void;
	onInit: (page: IPage) => void;
	onClear: () => void;
	data: IServerModel[];
	total: number;
}

/**
 * 操作列 。
 */
const action = (props: IServerTableProps, record: IServerModel, instanceCount: number, setInstanceCount: React.Dispatch<React.SetStateAction<number>>) => {
	const { confirm } = Modal;
	const { onEdit, onRun, onDisbaled, onEnabled, onDel } = props;

	return (
		<>
			<Space size="middle">
				<Button type="primary" size="small" onClick={() => onEdit(record)}>
					编辑
				</Button>
				<Popconfirm
					key="run"
					title={[
						'运行实例数量',
						<Input
							key="runNumber"
							type="number"
							value={instanceCount}
							onChange={(e) => {
								console.log(e);
								setInstanceCount(Number(e.target.value));
							}}
						></Input>,
					]}
					onConfirm={(e) => {
						for (let index = 0; index < Number(instanceCount); index++) {
							onRun(record);
						}
					}}
				>
					<Button type="primary" size="small">
						运行
					</Button>
				</Popconfirm>
				<Button type="primary" size="small" onClick={() => (record.status === ServerStatusEnum.enabled ? onDisbaled(record.id) : onEnabled(record.id))}>
					{record.status === ServerStatusEnum.enabled ? '禁用' : '启用'}
				</Button>
				<Button
					type="primary"
					size="small"
					onClick={() => {
						confirm({
							title: '系统提示',
							icon: <ExclamationCircleOutlined />,
							content: '是否删除 "' + record.name + '" 服务 ?',
							okText: '删除',
							okType: 'danger',
							cancelText: '取消',
							onOk() {
								onDel(record.id);
							},
						});
					}}
				>
					删除
				</Button>
			</Space>
		</>
	);
};

export function ServerTable(props: IServerTableProps) {
	const { onInit, onAdd, onEdit, onClear, data, total } = props;

	const [pageSize, setPageSize] = useState(10);
	const [page, setPage] = useState(1);
	const [instanceCount, setInstanceCount] = useState(1);

	return (
		<>
			<ProTable<IServerModel>
				rowKey={(record: IServerModel) => record.id}
				dataSource={props.data}
				bordered={false}
				headerTitle="服务列表"
				options={{ fullScreen: true }}
				request={async (params, sorter, filter) => {
					setPage(Number(params.current));
					setPageSize(Number(params.pageSize));

					let filters: any = {};
					for (var item in params) {
						let key = item.toLowerCase();
						filters[key] = params[item];
					}

					onInit({
						filters: filters,
						sorters: sorter,
					});

					return {
						data: data,
						success: true,
					};
				}}
				postData={(data) => {
					return data;
				}}
				pagination={{
					total: total,
					current: page,
					pageSize: pageSize,
					position: ['bottomRight'],
					showQuickJumper: true,
					showSizeChanger: true,
				}}
				search={{}}
				toolBarRender={() => [
					<Button key="button" icon={<PlusOutlined />} type="primary" onClick={onAdd}>
						新建
					</Button>,
					<Button key="button" icon={<ClearOutlined />} type="dashed" onClick={onClear}>
						清理缓存
					</Button>,
				]}
				dateFormatter="string"
				columns={[
					{
						key: 'name',
						title: '服务名称',
						dataIndex: 'name',
						width: 300,
						fixed: 'left',
						sorter: {
							multiple: 2,
						},
						render: (_, record) => {
							return (
								<Button type="link" size="small" onClick={() => onEdit(record)}>
									{record.name}
								</Button>
							);
						},
					},
					{
						key: 'description',
						title: '描述',
						dataIndex: 'description',
						fixed: 'left',
					},
					{
						key: 'status',
						title: '状态',
						dataIndex: 'status',
						width: 100,
						fixed: 'left',
						valueType: 'select',
						valueEnum: {
							'1': '禁用',
							'0': '启用',
						},
						render: (_, record) => (record.status === ServerStatusEnum.disbaled ? <Tag color="red">禁用</Tag> : <Tag color="green">启用</Tag>),
					},
					{
						key: 'updated_date',
						title: '更新日期',
						dataIndex: 'updated_date',
						width: 180,
						fixed: 'left',
						valueType: 'dateRange',
						sorter: {
							multiple: 1,
						},
						render: (_, record: IServerModel) => {
							return record.updated_date;
						},
					},
					{
						key: 'created_date',
						title: '创建日期',
						dataIndex: 'created_date',
						width: 180,
						fixed: 'left',
						valueType: 'dateRange',
						render: (_, record: IServerModel) => {
							return record.created_date;
						},
					},
					{
						title: '操作',
						width: 200,
						hideInSearch: true,
						hideInForm: true,
						hideInSetting: true,
						render: (_, record: IServerModel) => action(props, record, instanceCount, setInstanceCount),
					},
				]}
			/>
		</>
	);
}
