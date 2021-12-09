import { Button, Modal, Space, Table, Tag } from 'antd';
import { IServerInstanceModel, IServerKillParamModel } from '../../infrastructure/interfaces/IServer';
import { ServerInstanceType } from '../../infrastructure/enums/Server';

export interface IServerInstanceProps {
	onKill: (param: IServerKillParamModel) => void;
	onPing: (address: string) => void;
	onCancel: () => void;
	data?: IServerInstanceModel[];
	total?: number;
	show: boolean;
}

export function ServerInstance(props: IServerInstanceProps) {
	const { total, show, data, onKill, onPing, onCancel } = props;

	return (
		<>
			<Modal title="实例列表" visible={show} forceRender={true} width={1024} maskClosable={true} keyboard={true} footer={[]} onCancel={() => onCancel()}>
				<Table
					rowKey={(record: IServerInstanceModel) => record.address}
					dataSource={data}
					scroll={{ y: 400 }}
					bordered={true}
					pagination={{
						total: total,
						current: 1,
						pageSize: 10,
						position: ['bottomRight'],
						showQuickJumper: true,
						showSizeChanger: true,
					}}
					columns={[
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
							render: (text: string, record: IServerInstanceModel) =>
								record.type === ServerInstanceType.singleton ? <Tag color="yellow">单例</Tag> : <Tag color="red">瞬时</Tag>,
						},
						{
							key: 'created_date',
							title: '创建日期',
							dataIndex: 'created_date',
							width: 180,
							fixed: 'left',
						},
						{
							title: '操作',
							width: 200,
							render: (text: string, record: IServerInstanceModel) => {
								return (
									<>
										<Space size="middle">
											<Button
												type="primary"
												size="small"
												onClick={() =>
													onKill({
														name: record.name,
														address: record.address,
													})
												}
											>
												Kill
											</Button>
											<Button type="primary" size="small" onClick={() => onPing(record.address)}>
												Ping
											</Button>
										</Space>
									</>
								);
							},
						},
					]}
				></Table>
			</Modal>
		</>
	);
}
