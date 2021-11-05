import React from 'react';
import { Button, Input, Modal, Space, Table, TablePaginationConfig, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
	ColumnType,
	FilterDropdownProps,
	FilterValue,
	SorterResult,
	TableCurrentDataSource,
} from 'antd/lib/table/interface';
import { IServerInstanceModel } from '../../infrastructure/interfaces/IServer';
import { ServerInstanceType } from '../../infrastructure/enums/Server';
import { IPage } from '../../infrastructure/interfaces/ITable';

export interface IServerInstanceProps {
	onKill: (address: string) => void;
	onPing: (address: string) => void;
	onInit: (page: IPage) => void;
	onCancel: () => void;
	data?: IServerInstanceModel[];
	total?: number;
	show: boolean;
}

export interface IServerInstanceState {
	pageSize: number;
	page: number;
}

export class ServerInstance extends React.Component<IServerInstanceProps, IServerInstanceState> {
	constructor(props: IServerInstanceProps) {
		super(props);

		this.state = {
			pageSize: 10,
			page: 1,
		};

		this.refersh = this.refersh.bind(this);
	}

	private refersh(
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<IServerInstanceModel> | SorterResult<IServerInstanceModel>[],
		extra: TableCurrentDataSource<IServerInstanceModel>,
	): void {
		this.setState({
			page: Number(pagination.current),
			pageSize: Number(pagination.pageSize),
		});

		let sorters: SorterResult<IServerInstanceModel>[] = [];
		if (sorter instanceof Array) {
			sorters = sorter;
		} else if (sorter) {
			sorters.push(sorter);
		}

		let page: IPage = {
			page: Number(pagination.current),
			pagesize: Number(pagination.pageSize),
			filters: filters,
			sorters: [],
		};

		sorters.forEach((item, index) => {
			if (item.columnKey != null)
				page.sorters?.push({
					key: String(item.columnKey),
					value: item.order === 'ascend' ? 'asc' : 'desc',
					order: index,
				});
		});

		this.props.onInit(page);
	}

	private columnFilterProps(
		dataIndex: string,
		placeholder: string,
	): ColumnType<IServerInstanceModel> {
		return {
			filterDropdown: (props: FilterDropdownProps) => {
				return (
					<div style={{ padding: 8 }}>
						<Input
							style={{ marginBottom: 8, display: 'block' }}
							onChange={(e) =>
								props.setSelectedKeys(e.target.value ? [e.target.value] : [])
							}
							value={props.selectedKeys[0]}
							placeholder={placeholder}
						/>
						<Space>
							<Button type="primary" size="small" onClick={() => props.confirm()}>
								搜索
							</Button>
							<Button
								size="small"
								onClick={() => {
									if (props.clearFilters) props.clearFilters();
								}}
							>
								重置
							</Button>
						</Space>
					</div>
				);
			},
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
			),
		};
	}

	public componentDidMount(): void {
		this.props.onInit({ page: 1, pagesize: 10 });
	}

	public render(): JSX.Element {
		const { onKill, onPing, onCancel, total, show } = this.props;
		const { pageSize, page } = this.state;

		return (
			<>
				<Modal
					title="实例列表"
					visible={show}
					forceRender={true}
					width={1024}
					maskClosable={false}
					keyboard={false}
					footer={[]}
					onCancel={() => onCancel()}
				>
					<Table
						rowKey={(record: IServerInstanceModel) => record.address}
						dataSource={this.props.data}
						onChange={this.refersh}
						scroll={{ y: 400 }}
						pagination={{
							total: total,
							current: page,
							pageSize: pageSize,
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
								...this.columnFilterProps('address', '支持模糊搜索'),
							},
							{
								key: 'type',
								title: '类型',
								dataIndex: 'type',
								width: 100,
								fixed: 'left',
								render: (text: string, record: IServerInstanceModel) =>
									record.type === ServerInstanceType.singleton ? (
										<Tag color="yellow">单例</Tag>
									) : (
										<Tag color="red">瞬时</Tag>
									),
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
													onClick={() => onKill(record.address)}
												>
													Kill
												</Button>
												<Button
													type="primary"
													size="small"
													onClick={() => onPing(record.address)}
												>
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
}
