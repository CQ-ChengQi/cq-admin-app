import { useEffect, useRef, useState } from 'react';
import { Card, Select } from 'antd';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { suggestions } from './CompletionItem';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProForm, {
	ProFormCheckbox,
	ProFormGroup,
	ProFormInstance,
} from '@ant-design/pro-form';

export interface ICodeEditorProps {
	offsetWidth: number;
	init: boolean;
	onMonacoInit: () => void;
}

export function CodeEditor(props: ICodeEditorProps) {
	const formRef = useRef<ProFormInstance>();
	const { offsetWidth, init, onMonacoInit } = props;

	const [width, setWidth] = useState(document.body.clientWidth);
	const [height, setHeight] = useState(780);

	const resezie = (e: any) => {
		setWidth(e.target.innerWidth);
		setHeight(e.target.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', resezie);
		return () => window.removeEventListener('resize', resezie);
	}, [width, height]);

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
	}

	return (
		<>
			<PageContainer
				extra={[
					<Select
						key="selectServer"
						showSearch
						style={{ width: 200 }}
						placeholder="请选择服务"
					></Select>,
				]}
			>
				<Card>
					<ProForm
						title="编辑代码"
						formRef={formRef}
						layout="inline"
						onFinish={async (values) => {
							console.log(values);
						}}
						submitter={{
							render: (_, dom) => {
								return <FooterToolbar>{dom}</FooterToolbar>;
							},
						}}
					>
						<ProFormGroup>
							<ProFormCheckbox.Group
								name="checkbox-group"
								label="依赖"
								options={[
									'skynet',
									'skynet.manager',
									'skynet.socket',
									'http.httpd',
									'http.sockethelper',
									'http.url',
								]}
							/>
						</ProFormGroup>
					</ProForm>
				</Card>
				<Card style={{ marginTop: 8 }}>
					<MonacoEditor
						width={width - offsetWidth - 90}
						height={height - 330}
						language="lua"
						theme="vs"
						options={{
							selectOnLineNumbers: true,
						}}
						onChange={(values) => {
							console.log(values);
						}}
					/>
				</Card>
			</PageContainer>
		</>
	);
}
