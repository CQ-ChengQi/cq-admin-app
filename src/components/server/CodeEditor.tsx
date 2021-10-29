import React, { RefObject } from 'react';
import { Modal, Form, FormInstance } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/stream-parser';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { IServerModel } from '../../infrastructure/interfaces/IServer';

export interface IServerCodeEditorProps {
	show?: boolean;
	onEdit: (model: IServerModel) => void;
	onCancel: () => void;
}

export interface IServerCodeEditorState {}

export class ServerCodeEditor extends React.Component<
	IServerCodeEditorProps,
	IServerCodeEditorState
> {
	private formRef: RefObject<FormInstance>;
	private model?: IServerModel;
	private code?: string;

	constructor(props: IServerCodeEditorProps) {
		super(props);

		this.formRef = React.createRef<FormInstance>();

		this.handlerSave = this.handlerSave.bind(this);
		this.setFormValues = this.setFormValues.bind(this);
		this.handlerChange = this.handlerChange.bind(this);
	}

	private handlerChange(code: string) {
		if (this.model !== undefined) this.model.code = code;
	}

	private handlerSave(): void {
		this.formRef.current?.validateFields().then((values: IServerModel) => {
			if (this.model !== undefined) {
				this.props.onEdit(this.model);
				this.props.onCancel();
			}
		});
	}

	public setFormValues(model: IServerModel): void {
		this.model = model;
		this.formRef.current?.resetFields();
		this.formRef.current?.setFieldsValue(model);
	}

	public render(): JSX.Element {
		const { onCancel, show } = this.props;
		return (
			<>
				<Modal
					title="编辑代码"
					visible={show}
					forceRender={true}
					onOk={this.handlerSave}
					onCancel={onCancel}
					width={1024}
					maskClosable={false}
					keyboard={false}
				>
					<Form ref={this.formRef} name="add" autoComplete="off" layout="vertical">
						<Form.Item label="Lua Code" name="code">
							<CodeMirror
								height="200px"
								extensions={[StreamLanguage.define(lua)]}
								onChange={(value, viewUpdate) => {
									this.handlerChange(value);
								}}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
}
