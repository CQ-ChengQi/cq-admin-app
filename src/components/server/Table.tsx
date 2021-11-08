import React from 'react';
import {
	Button,
	Dropdown,
	Input,
	Menu,
	Modal,
	Space,
	Table,
	TablePaginationConfig,
	Tag,
} from 'antd';
import { DownOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

import {
	ColumnType,
	FilterDropdownProps,
	FilterValue,
	SorterResult,
	TableCurrentDataSource,
} from 'antd/lib/table/interface';
import { IServerModel } from '../../infrastructure/interfaces/IServer';
import { ServerStatusEnum } from '../../infrastructure/enums/Server';
import { IPage } from '../../infrastructure/interfaces/ITable';

export interface IServerTableProps {
	onEdit: (model: IServerModel) => void;
	onRun: (id: IServerModel) => void;
	onEditCode: (model: IServerModel) => void;
	onDisbaled: (id: string) => void;
	onEnabled: (id: string) => void;
	onDel: (id: string) => void;
	onInit: (page: IPage) => void;
	onInstance: (model: IServerModel) => void;
	data: IServerModel[];
	total: number;
}

export interface IServerTableState {
	pageSize: number;
	page: number;
}

export class ServerTable extends React.Component<IServerTableProps, IServerTableState> {
	constructor(props: IServerTableProps) {
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
		sorter: SorterResult<IServerModel> | SorterResult<IServerModel>[],
		extra: TableCurrentDataSource<IServerModel>,
	): void {
		console.log(filters);

		this.setState({
			page: Number(pagination.current),
			pageSize: Number(pagination.pageSize),
		});

		let sorters: SorterResult<IServerModel>[] = [];
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

	private columnFilterProps(dataIndex: string, placeholder: string): ColumnType<IServerModel> {
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
		const { onEdit, onRun, onDisbaled, onEnabled, onDel, onEditCode, onInstance, total } =
			this.props;
		const { pageSize, page } = this.state;
		const { confirm } = Modal;

		return (
			<>
				<Table
					rowKey={(record: IServerModel) => record.id}
					dataSource={this.props.data}
					onChange={this.refersh}
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
							key: 'name',
							title: '服务名称',
							dataIndex: 'name',
							width: 300,
							fixed: 'left',
							sorter: {
								multiple: 2,
							},
							render: (text: string, record: IServerModel) => {
								return (
									<Button type="link" size="small" onClick={() => onEdit(record)}>
										{text}
									</Button>
								);
							},
							...this.columnFilterProps('name', '支持模糊搜索'),
						},
						{
							key: 'description',
							title: '描述',
							dataIndex: 'description',
							fixed: 'left',
							...this.columnFilterProps('description', '支持模糊搜索'),
						},
						{
							key: 'status',
							title: '状态',
							dataIndex: 'status',
							width: 100,
							fixed: 'left',
							render: (text: string, record: IServerModel) =>
								record.status === ServerStatusEnum.disbaled ? (
									<Tag color="red">禁用</Tag>
								) : (
									<Tag color="green">启用</Tag>
								),
						},
						{
							key: 'updated_date',
							title: '最后更新日期',
							dataIndex: 'updated_date',
							width: 180,
							fixed: 'left',
							sorter: {
								multiple: 1,
							},
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
							render: (text: string, record: IServerModel) => {
								return (
									<>
										<Space size="middle">
											<Button
												type="primary"
												size="small"
												onClick={() => onEdit(record)}
											>
												编辑
											</Button>
											<Button
												type="primary"
												size="small"
												onClick={() => onInstance(record)}
											>
												实例
											</Button>
											<Dropdown
												trigger={["click"]}
												overlay={
													<Menu>
														<MenuItem
															key="run"
															onClick={() => onRun(record)}
														>
															运行
														</MenuItem>
														<MenuItem
															key="disbaled"
															onClick={() =>
																record.status ===
																ServerStatusEnum.enabled
																	? onDisbaled(record.id)
																	: onEnabled(record.id)
															}
														>
															{record.status ===
															ServerStatusEnum.enabled
																? '禁用'
																: '启用'}
														</MenuItem>
														<MenuItem
															key="edit_code"
															onClick={() => onEditCode(record)}
														>
															代码
														</MenuItem>
														<Menu.Divider></Menu.Divider>
														<MenuItem
															key="del"
															onClick={() => {
																confirm({
																	title: '系统提示',
																	icon: (
																		<ExclamationCircleOutlined />
																	),
																	content:
																		'是否删除 "' +
																		record.name +
																		'" 服务 ?',
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
														</MenuItem>
													</Menu>
												}
											>
												<Button type="primary" size="small">
													更多 <DownOutlined />
												</Button>
											</Dropdown>
										</Space>
									</>
								);
							},
						},
					]}
				></Table>
			</>
		);
	}
}
