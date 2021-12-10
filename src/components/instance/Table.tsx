import ProTable from '@ant-design/pro-table';
import { Button, Space, Tag } from 'antd';
import { useState } from 'react';
import { ServerInstanceType } from '../../infrastructure/enums/Server';
import { IServerInstanceModel } from '../../infrastructure/interfaces/IInstance';
import { IServerKillParamModel } from '../../infrastructure/interfaces/IServer';

export interface IInstanceTableProps {
	onKill: (param: IServerKillParamModel) => void;
	onPing: (name: string, address: string) => void;
	onLoad: (id: string) => void;
	onLoadServerSelect: () => void;
	data?: IServerInstanceModel[];
	total?: number;
	init: boolean;
	serverSelectData: any;
}

export function InstanceTable(props: IInstanceTableProps) {
	const { total, data, serverSelectData, init, onKill, onPing, onLoadServerSelect, onLoad } = props;
	const [pageSize, setPageSize] = useState(10);
	const [page, setPage] = useState(1);

	const kill = (id: string, param: IServerKillParamModel) => {
		onKill(param);
		onLoad(id);
	};

	if (!init) {
		onLoadServerSelect();
	}

	return (
		<>
			<ProTable<IServerInstanceModel>
				rowKey={(record: IServerInstanceModel) => record.address}
				dataSource={data}
				headerTitle="实例列表"
				options={{ fullScreen: true }}
				request={async (params, sorter, filter) => {
					setPage(Number(params.current));
					setPageSize(Number(params.pageSize));
					onLoad(params.name);

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
				columns={[
					{
						key: 'name',
						title: '服务名称',
						dataIndex: 'name',
						fixed: 'left',
						valueType: 'select',
						valueEnum: serverSelectData,
					},
					{
						key: 'address',
						title: '地址',
						dataIndex: 'address',
						fixed: 'left',
					},
					{
						key: 'type',
						title: '类型',
						dataIndex: 'type',
						width: 100,
						fixed: 'left',
						valueType: 'select',
						valueEnum: {
							all: '全部',
							transient: '瞬时',
							singleton: '单例',
						},
						render: (dom, record: IServerInstanceModel) =>
							record.type === ServerInstanceType.singleton ? <Tag color="yellow">单例</Tag> : <Tag color="red">瞬时</Tag>,
					},
					{
						key: 'created_date',
						title: '创建日期',
						dataIndex: 'created_date',
						width: 180,
						fixed: 'left',
						valueType: 'dateTimeRange',
						render: (_, record: IServerInstanceModel) => {
							return record.created_date;
						},
					},
					{
						title: '操作',
						width: 200,
						hideInSearch: true,
						render: (dom, record: IServerInstanceModel) => {
							return (
								<>
									<Space size="middle">
										<Button
											type="primary"
											size="small"
											onClick={() =>
												kill(record.id, {
													name: record.name,
													address: record.address,
												})
											}
										>
											Kill
										</Button>
										<Button type="primary" size="small" onClick={() => onPing(record.name, record.address)}>
											Ping
										</Button>
									</Space>
								</>
							);
						},
					},
				]}
			></ProTable>
		</>
	);
}
