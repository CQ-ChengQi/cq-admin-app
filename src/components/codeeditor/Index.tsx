/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { suggestions, addSuggestion, removeSuggestion } from './CompletionItem';
import { LabeledValue } from 'antd/lib/select';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { IServerCodeModel } from '../../infrastructure/interfaces/ICodeEditor';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Tooltip } from 'antd';

import './Index.css';

export interface ICodeEditorProps {
	id: string;
	collapsed: boolean;
	init: boolean;
	code: string;
	serverSelectData: LabeledValue[];
	depends: string[];
	editing: boolean;
	onMonacoInit: () => void;
	onLoadSelect: () => void;
	onLoadDependSelect: (id: string) => void;
	onLoadCode: (id: string) => void;
	onSave: (model: IServerCodeModel) => void;
	onClear: () => void;
	onEditing: (editing: boolean) => void;
	onSetCode: (code: string) => void;
	onSetDepends: (ids: string[]) => void;
}

export function CodeEditor(props: ICodeEditorProps) {
	const {
		id,
		collapsed,
		init,
		serverSelectData,
		code,
		editing,
		depends,
		onLoadCode,
		onMonacoInit,
		onLoadSelect,
		onLoadDependSelect,
		onClear,
		onSave,
		onSetCode,
		onSetDepends,
	} = props;

	const offsetWidth = collapsed ? 550 : 710;
	const defaultDepend: LabeledValue[] = serverSelectData.filter((item) => item.value !== id);

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [dependSelectData, setDependSelectData] = useState(defaultDepend);
	const [serverName, setServerName] = useState('');
	const [load, setLoad] = useState(false);
	const [initEditor, setInitEditor] = useState(false);
	const [checkout, setCheckout] = useState(false);

	const resezie = (e: any) => {
		setWidth(e.target.innerWidth);
		setHeight(e.target.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', resezie);
		return () => window.removeEventListener('resize', resezie);
	}, [width, height]);

	useEffect(() => {
		serverSelectData.forEach((item) => {
			if (depends.findIndex((s) => s === String(item.value)) >= 0) {
				addSuggestion(String(item.label));
			} else {
				removeSuggestion(String(item.label));
			}
		});
	}, [depends, serverSelectData]);

	if (!init && !initEditor) {
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

		setInitEditor(true);
		onMonacoInit();
	}

	if (!load) {
		onLoadSelect();
		setLoad(true);
	}

	return (
		<>
			<PageContainer>
				<ProCard bordered headerBordered split="vertical">
					<ProCard title="配置" headerBordered colSpan="400px">
						<ProForm
							title="编辑代码"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							layout="horizontal"
							onFinish={async (values) => {
								let list = serverSelectData.filter((item) => depends.findIndex((s: string) => s === item.value) >= 0);
								onSave({
									id: values.server,
									code: code,
									depends: list,
									name: serverName,
								});
							}}
							submitter={{
								render: (_, dom) => {
									return <FooterToolbar>{dom}</FooterToolbar>;
								},
								submitButtonProps: {
									disabled: !editing,
								},
								resetButtonProps: {
									disabled: !editing,
								},
							}}
						>
							<ProFormSelect
								label="服务"
								placeholder="请选择需要编辑的服务"
								options={serverSelectData}
								width="md"
								disabled={editing}
								name="server"
								fieldProps={{
									onChange: (val) => {
										if (!editing) onClear();
										if (val) {
											const selected = serverSelectData.filter((item) => item.value === val);
											setServerName(selected[0].label as string);
											setDependSelectData(serverSelectData.filter((item) => item.value !== val));
											onLoadDependSelect(val);
											onLoadCode(val);
										} else {
											setDependSelectData(defaultDepend);
										}
									},
									value: id,
								}}
							/>
							<ProFormSelect
								label="依赖服务"
								width={'md'}
								options={dependSelectData}
								mode="multiple"
								placeholder="请选择需要依赖的服务"
								name="depend"
								fieldProps={{
									onChange: (val) => {
										onSetDepends(val);
									},
									value: depends,
								}}
							/>
						</ProForm>
					</ProCard>
					<ProCard
						colSpan="calc(100% - 400px)"
						title="Lua 代码"
						headerBordered
						style={{ overflow: 'hidden' }}
						extra={[
							<Tooltip key="checkout-tip" title="签出代码进行编辑">
								<Checkbox
									key="checkout"
									checked={checkout}
									onChange={(e) => {
										setCheckout(e.target.checked);
									}}
								/>
							</Tooltip>,
						]}
					>
						<MonacoEditor
							className="monaco-editor"
							language="lua"
							theme="vs"
							width={width - offsetWidth}
							height={height - 366}
							options={{
								selectOnLineNumbers: true,
							}}
							onChange={(value) => {
								onSetCode(value);
							}}
							value={code}
						/>
					</ProCard>
				</ProCard>
			</PageContainer>
		</>
	);
}
