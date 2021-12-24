/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { suggestions, addSuggestion, removeSuggestion, setSuggestionCode } from './CompletionItem';
import { LabeledValue } from 'antd/lib/select';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { IServerCodeModel, IServerDenpedCodeModel, IServerSelectItemModel } from '../../infrastructure/interfaces/ICodeEditor';
import { Tree } from 'antd';

import './Index.css';
import { CancellationToken, editor } from 'monaco-editor';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import { Button } from 'antd';
import { CodeEditorFileTree } from './FileTree';
import { DataNode } from 'antd/lib/tree';
import { CodeEditorDrawerProperty } from './PropertyDrawer';

export interface ICodeEditorProps {
	id: string;
	collapsed: boolean;
	init: boolean;
	code: string;
	serviceCode?: string;
	repositoryCode?: string;
	serverSelectData: IServerSelectItemModel[];
	depends: string[];
	dependCodes: IServerDenpedCodeModel[];
	editing: boolean;
	tabs?: [];
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
		serviceCode,
		repositoryCode,
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
	const [propertyShow, setPropertyShow] = useState(false);
	const [dataNode, setDataNode] = useState<DataNode>();

	const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor>();

	const treeData = [
		{
			title: 'helloword',
			key: '0-0',
			children: [
				{ title: 'helloword', key: '0-0-0', isLeaf: true },
				{ title: 'service', key: '0-0-2', isLeaf: true },
				{ title: 'repository', key: '0-0-1', isLeaf: true },
			],
		},
		{
			title: 'parent 1',
			key: '0-1',
			children: [
				{ title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
				{ title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
			],
		},
	];

	const resezie = (e: any) => {
		setWidth(e.target.innerWidth);
		setHeight(e.target.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', resezie);

		if (editorInstance) editorInstance.layout({ width: width - offsetWidth, height: height - 366 });

		return () => window.removeEventListener('resize', resezie);
	}, [width, height, editorInstance, offsetWidth]);

	useEffect(() => {
		serverSelectData.forEach((item) => {
			if (depends.findIndex((s) => s === item.value) >= 0) {
				addSuggestion(item.label, item.code);
			} else {
				removeSuggestion(item.label);
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

		monaco.languages.registerDocumentFormattingEditProvider('lua', {
			provideDocumentFormattingEdits: (model: editor.ITextModel, options: languages.FormattingOptions, token: CancellationToken) => {
				console.log(model);
				return [
					{
						range: {
							startLineNumber: 0,
							startColumn: 0,
							endLineNumber: 0,
							endColumn: 0,
						},
						text: '',
					},
				];
			},
		});

		setInitEditor(true);
		onMonacoInit();
	}

	if (!load) {
		onLoadSelect();
		setLoad(true);
	}

	const menuClick = (info: any) => {
		switch (info.key) {
			case 'property':
				setPropertyShow(true);
				break;
		}
	};

	const selectedClick = (node: DataNode) => {
		setDataNode(node);
	};

	const editorDidMount = (ed: monaco.editor.IStandaloneCodeEditor) => {
		setEditorInstance(ed);
	};

	return (
		<>
			<PageContainer>
				<CodeEditorDrawerProperty show={propertyShow} node={dataNode} onCancel={() => setPropertyShow(false)} />
				<ProCard bordered headerBordered split="vertical">
					<ProCard headerBordered colSpan="400px">
						<CodeEditorFileTree treeData={treeData} handlerMenuClick={menuClick} handlerSelected={(node) => selectedClick(node)} />
					</ProCard>
					<ProCard
						colSpan="calc(100% - 400px)"
						headerBordered
						style={{ overflow: 'hidden' }}
						tabs={{
							type: 'line',
							tabPosition: 'top',
						}}
					>
						<ProCard.TabPane key="main" tab="主服务">
							<MonacoEditor
								className="monaco-editor"
								language="lua"
								theme="vs"
								// width={width - offsetWidth}
								// height={height - 366}
								options={{
									selectOnLineNumbers: true,
								}}
								onChange={(value) => {
									onSetCode(value);
									setSuggestionCode(value);
								}}
								value={code}
								editorDidMount={editorDidMount}
							/>
						</ProCard.TabPane>
						<ProCard.TabPane key="service" tab="逻辑">
							<MonacoEditor
								className="monaco-editor"
								language="lua"
								theme="vs"
								// width={width - offsetWidth}
								// height={height - 366}
								options={{
									selectOnLineNumbers: true,
								}}
								onChange={(value) => {
									onSetCode(value);
									setSuggestionCode(value);
								}}
								value={code}
								editorDidMount={editorDidMount}
							/>
						</ProCard.TabPane>
					</ProCard>
				</ProCard>
			</PageContainer>
		</>
	);
}
