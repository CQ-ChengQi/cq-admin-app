import React, { RefObject } from 'react';
import {
	Modal,
	Form,
	FormInstance,
	Row,
	Col,
	Checkbox,
	Select,
	Tooltip,
	Typography,
	Space,
	Button,
} from 'antd';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { IServerModel } from '../../infrastructure/interfaces/IServer';
import { suggestions } from './CompletionItem';

import './CodeEditor.css';

export interface IServerCodeEditorProps {
	show?: boolean;
	onEdit: (model: IServerModel) => void;
	onCancel: () => void;
}

export interface IServerCodeEditorState {
	servers: { label: string; value: string }[];
}

export class ServerCodeEditor extends React.Component<
	IServerCodeEditorProps,
	IServerCodeEditorState
> {
	private formRef: RefObject<FormInstance>;
	private model?: IServerModel;
	private code?: string;

	constructor(props: IServerCodeEditorProps) {
		super(props);

		this.state = {
			servers: [],
		};
		this.initMonacoEditor();
		this.formRef = React.createRef<FormInstance>();

		this.handlerSave = this.handlerSave.bind(this);
		this.setFormValues = this.setFormValues.bind(this);
		this.handlerChange = this.handlerChange.bind(this);
		this.setFormCallServerList = this.setFormCallServerList.bind(this);
	}

	private initMonacoEditor(): void {
		monaco.languages.registerCompletionItemProvider('lua', {
			provideCompletionItems: (model, position) => {
				let word = model.getWordUntilPosition(position);
				var range = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: word.startColumn,
					endColumn: word.endColumn,
				};
				return {
					suggestions: suggestions(range),
				};
			},
		});

		monaco.languages.registerDocumentFormattingEditProvider('lua', {
			provideDocumentFormattingEdits: (model, options) => {
				let result: monaco.languages.TextEdit[] = [];
				let lineCount = model.getLineCount();
				let lineIndex = 1;
				while (lineIndex <= lineCount) {
					let index = lineIndex;
					let lineCode = model.getValueInRange({
						startColumn: 0,
						startLineNumber: lineIndex,
						endLineNumber: lineIndex,
						endColumn: 999,
					});

					let pipei: any;
					let equal = /([^\s]=[^\s])/g;

					while ((pipei = equal.exec(lineCode)) != null) {
						result.push({
							range: {
								startLineNumber: index,
								startColumn: pipei.index + 2,
								endLineNumber: index,
								endColumn: pipei.index + 2,
							},
							text: ' ',
						});

						result.push({
							range: {
								startLineNumber: index,
								startColumn: pipei.index + 2 + 1,
								endLineNumber: index,
								endColumn: pipei.index + 2 + 1,
							},
							text: ' ',
						});
					}

					equal = /([\s]=[^\s])/g;

					while ((pipei = equal.exec(lineCode)) != null) {
						result.push({
							range: {
								startLineNumber: index,
								startColumn: pipei.index + 2 + 1,
								endLineNumber: index,
								endColumn: pipei.index + 2 + 1,
							},
							text: ' ',
						});
					}

					equal = /([^\s]=[\s])/g;

					while ((pipei = equal.exec(lineCode)) != null) {
						result.push({
							range: {
								startLineNumber: index,
								startColumn: pipei.index + 2,
								endLineNumber: index,
								endColumn: pipei.index + 2,
							},
							text: ' ',
						});
					}

					let dot = /(,[^\s])/g;
					while ((pipei = dot.exec(lineCode)) != null) {
						result.push({
							range: {
								startLineNumber: index,
								startColumn: pipei.index + 2,
								endLineNumber: index,
								endColumn: pipei.index + 2,
							},
							text: ' ',
						});
					}

					dot = /([\s],)/g;
					while ((pipei = dot.exec(lineCode)) != null) {
						result.push({
							range: {
								startLineNumber: index,
								startColumn: pipei.index + 3,
								endLineNumber: index,
								endColumn: pipei.index + 1,
							},
							text: ',',
						});
					}

					lineIndex++;
				}

				console.log(result);

				return result;
			},
		});
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

	private editorDidMount(editor: monaco.editor.IStandaloneCodeEditor, m: typeof monaco): void {
		editor.focus();
	}

	public setFormValues(model: IServerModel): void {
		this.model = model;
		this.formRef.current?.resetFields();
		this.formRef.current?.setFieldsValue(model);
	}

	public setFormCallServerList(servers: IServerModel[]): void {
		let lst: { label: string; value: string }[] = [];
		servers.forEach((val) => {
			lst.push({
				label: val.name,
				value: val.id,
			});
		});
		this.setState({
			servers: lst,
		});
	}

	public componentDidMount(): void {}

	public render(): JSX.Element {
		const { onCancel, show } = this.props;
		const CheckboxGroup = Checkbox.Group;
		return (
			<>
				<Modal
					title="编辑代码"
					visible={show}
					forceRender={false}
					onOk={this.handlerSave}
					onCancel={onCancel}
					width={1024}
					maskClosable={false}
					keyboard={false}
				>
					<Form ref={this.formRef} name="add" autoComplete="off" layout="vertical">
						<Row gutter={[16, 16]}>
							<Col span={16}>
								<MonacoEditor
									height="600"
									language="lua"
									theme="vs-dark"
									// editorDidMount={this.editorDidMount}
									value={''}
									options={{
										selectOnLineNumbers: true,
									}}
									className="editor"
								/>
							</Col>
							<Col span={8}>
								<Row>
									<Col span={24}>
										<Form.Item label="导入模块" name="import_module_list">
											<CheckboxGroup
												options={[
													'skynet',
													'skynet.manager',
													'uuid',
													'json',
												]}
											></CheckboxGroup>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Form.Item label="Call 服务名称" name="call_server_name">
											<Space>
												<Select
													mode="tags"
													style={{ width: '200px' }}
													onChange={() => {}}
													tokenSeparators={[',']}
													options={this.state.servers}
												>
													{[]}
												</Select>
												<Tooltip title="可以获取服务实例，并发送消息 。 {服务名称}_send,{服务名称}_call 。">
													<Typography.Link>帮助 ?</Typography.Link>
												</Tooltip>
											</Space>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Form.Item label="模板" name="call_server_name">
											<Space>
												<Button>初始化</Button>
												<Button>添加函数</Button>
											</Space>
										</Form.Item>
									</Col>
								</Row>
							</Col>
						</Row>
					</Form>
				</Modal>
			</>
		);
	}
}
