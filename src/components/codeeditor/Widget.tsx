import MonacoEditor, { monaco } from 'react-monaco-editor';

export interface ICodeEditorWidgetProps {}

export function CodeEditorWidget(props: ICodeEditorWidgetProps) {
	return (
		<>
			<MonacoEditor
				className="monaco-editor"
				language="lua"
				theme="vs"
				width={500}
				// width={width - offsetWidth}
				// height={height - 366}
				options={{
					selectOnLineNumbers: true,
				}}
				onChange={(value) => {}}
				value={''}
			/>
		</>
	);
}
