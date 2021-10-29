import React, { RefObject } from 'react';
import { Modal, Form, Input, FormInstance } from 'antd';
import { IServerModel } from '../../infrastructure/interfaces/IServer';


export interface IServerEditProps {
	show?: boolean;
	onEdit: (model: IServerModel) => void;
	onAdd: (model: IServerModel) => void;
	onCancel: () => void;
}

export class ServerEdit extends React.Component<IServerEditProps> {
	private formRef: RefObject<FormInstance>;
	private addOrEdit: 'add' | 'edit';
	private model?: IServerModel;

	constructor(props: IServerEditProps) {
		super(props);

		this.addOrEdit = 'add';
		this.formRef = React.createRef<FormInstance>();
		this.handlerSave = this.handlerSave.bind(this);
		this.setFormValues = this.setFormValues.bind(this);
	}

	private handlerSave(): void {
		this.formRef.current?.validateFields().then((values: IServerModel) => {
			// values.updated_date = moment().format('YYYY-MM-DD HH:mm:ss');

			// if (this.addOrEdit === 'add') {
			// 	values.id = Guid.generate();
			// 	values.status = ServerStatusEnum.enabled;
			// 	values.created_date = moment().format('YYYY-MM-DD HH:mm:ss');

			// 	this.props.onAdd(values);
			// } else {
			// 	this.props.onEdit({ ...this.model, ...values });
			// }

			if (this.addOrEdit === 'add') this.props.onAdd(values);
			else this.props.onEdit(values);

			this.props.onCancel();
		});
	}

	public setFormValues(model?: IServerModel): void {
		if (model === undefined) this.addOrEdit = 'add';
		else this.addOrEdit = 'edit';

		this.model = model;
		this.formRef.current?.resetFields();
		return this.formRef.current?.setFieldsValue(model);
	}

	public render(): JSX.Element {
		const { TextArea } = Input;
		const { onCancel, show } = this.props;
		return (
			<>
				<Modal
					title="新建服务"
					visible={show}
					forceRender={true}
					onOk={this.handlerSave}
					onCancel={onCancel}
				>
					<Form ref={this.formRef} name="add" autoComplete="off" layout="vertical">
						<Form.Item
							label="服务名称"
							name="name"
							rules={[
								{
									required: true,
									message: '请输入服务名称（仅限英文字符）',
								},
								{
									max: 200,
									message: '最大长度为 200 ',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="服务描述"
							name="description"
							rules={[
								{
									max: 4000,
									message: '最大长度为 4000',
								},
							]}
						>
							<TextArea rows={4} />
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
}
