import ProForm, { DrawerForm, ProFormInstance, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useEffect, useRef, useState } from 'react';
import { ServerInstanceType } from '../../infrastructure/enums/Server';
import { IServerFolderModel, IServerModel } from '../../infrastructure/interfaces/IServer';

export interface IServerEditProps {
	show?: boolean;
	model?: IServerModel;
	folders: IServerFolderModel[];
	onEdit: (model: IServerModel) => void;
	onAdd: (model: IServerModel) => void;
	onLoadServerFolder: () => void;
	onCancel: () => void;
}

export function ServerEdit(props: IServerEditProps) {
	const formRef = useRef<ProFormInstance>();
	const { show, model, folders, onCancel, onEdit, onAdd } = props;

	const [title, setTitile] = useState<string>();
	const [type, setType] = useState<ServerInstanceType>(ServerInstanceType.transient);

	useEffect(() => {
		if (show) {
			if (model) {
				formRef.current?.setFieldsValue(model);
				setTitile('编辑 <' + model.name + '>');
				setType(model.type);
			} else {
				formRef.current?.resetFields();
				setTitile('添加新服务');
				setType(ServerInstanceType.transient);
			}
		}
	}, [model, show]);

	return (
		<>
			<DrawerForm<IServerModel>
				formRef={formRef}
				title={title || '添加新服务'}
				visible={show}
				drawerProps={{
					forceRender: true,
					destroyOnClose: true,
				}}
				onVisibleChange={(visible) => {
					if (!visible) onCancel();
				}}
				onFinish={async (values) => {
					if (model) {
						onEdit({ ...model, ...values });
					} else {
						onAdd(values);
					}
					onCancel();
				}}
			>
				<ProForm.Group>
					<ProFormText
						width="md"
						name="name"
						label="服务名称"
						placeholder="请输入服务名称"
						tooltip="请输入服务名称（仅限英文字符），最大长度为 200"
						rules={[
							{ required: true, message: '请输入服务名称' },
							{ max: 200, message: '最大长度为 200' },
							{ min: 2, message: '最小长度为 2' },
						]}
					/>
					<ProFormRadio.Group
						width="md"
						name="type"
						label="实例类型"
						radioType="button"
						fieldProps={{
							defaultValue: 0,
							buttonStyle: 'solid',
							onChange: (e) => {
								setType(e.target.value);
							},
						}}
						options={[
							{ label: '多实例', value: 0 },
							{ label: '单实例', value: 1 },
							{ label: '业务逻辑', value: 2 },
							{ label: '数据仓储', value: 3 },
						]}
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect
						width="md"
						label="服务"
						name="folders"
						mode="multiple"
						disabled={type === ServerInstanceType.transient || type === ServerInstanceType.singleton}
						options={folders.map((s) => {
							return { label: s.name, value: s.id };
						})}
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormTextArea width="xl" label="描述" name="description" />
				</ProForm.Group>
			</DrawerForm>
		</>
	);
}
