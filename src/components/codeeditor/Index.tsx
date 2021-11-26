import { useEffect, useRef, useState } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { suggestions } from './CompletionItem';
import { LabeledValue } from 'antd/lib/select';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormInstance, ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { IServerCodeModel } from '../../infrastructure/interfaces/ICodeEditor';

import './Index.css';

export interface ICodeEditorProps {
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
}

export function CodeEditor(props: ICodeEditorProps) {
	const formRef = useRef<ProFormInstance>();
	const formCardRef = useRef<HTMLDivElement>();
	const {
		collapsed,
		init,
		serverSelectData,
		code,
		editing,
		onLoadCode,
		onMonacoInit,
		onLoadSelect,
		onClear,
		onEditing,
	} = props;

	const offsetWidth = collapsed ? 550 : 710;
	const defaultDepend: LabeledValue[] = [];

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [dependSelectData, setDependSelectData] = useState(defaultDepend);
	const [luaCode, setLuaCode] = useState(code);

	const resezie = (e: any) => {
		setWidth(e.target.innerWidth);
		setHeight(e.target.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', resezie);
		return () => window.removeEventListener('resize', resezie);
	}, [width, height]);

	useEffect(() => {}, [luaCode]);

	if (!init) {
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

		onMonacoInit();
		onLoadSelect();
	}

	return (
		<>
			<PageContainer>
				<ProCard bordered headerBordered split="vertical">
					<ProCard ref={formCardRef} title="配置" headerBordered colSpan="400px">
						<ProForm
							title="编辑代码"
							formRef={formRef}
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							layout="horizontal"
							onFinish={async (values) => {
								console.log(values);
							}}
							submitter={{
								render: (_, dom) => {
									return <FooterToolbar>{dom}</FooterToolbar>;
								},
							}}
						>
							<ProFormSelect
								label="服务"
								placeholder="请选择需要编辑的服务"
								options={serverSelectData}
								width="md"
								disabled={editing}
								fieldProps={{
									onChange: (val) => {
										if (!editing) onClear();
										if (val) {
											setDependSelectData(
												serverSelectData.filter(
													(item) => item.value !== val,
												),
											);
											onLoadCode(val);
										} else {
											setDependSelectData(defaultDepend);
										}
									},
								}}
							/>
							<ProFormSelect
								label="依赖服务"
								width={'md'}
								options={dependSelectData}
								mode="multiple"
								placeholder="请选择需要依赖的服务"
							/>
						</ProForm>
					</ProCard>
					<ProCard
						colSpan="calc(100% - 400px)"
						title="Lua 代码"
						headerBordered
						style={{ overflow: 'hidden' }}
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
								setLuaCode(value);
							}}
							value={code}
						/>
					</ProCard>
				</ProCard>
			</PageContainer>
		</>
	);
}
