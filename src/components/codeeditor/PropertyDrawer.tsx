import ProForm, { DrawerForm, ProFormSelect } from '@ant-design/pro-form';
import { DataNode } from 'antd/lib/tree';
import { useEffect, useState } from 'react';

export interface ICodeEditorPropertyDrawerProps {
	show: boolean;
	node: DataNode | undefined;
	onCancel: () => void;
}

export function CodeEditorDrawerProperty(props: ICodeEditorPropertyDrawerProps) {
	const { show, node, onCancel } = props;
	const [title, setTitle] = useState<string>();

	useEffect(() => {
		if (node) {
			setTitle('编辑属性 <' + node.title + '>');
		}
	}, [node]);

	return (
		<>
			<DrawerForm
				title={title}
				autoFocusFirstInput
				visible={show}
				onVisibleChange={(visible) => {
					if (!visible) onCancel();
				}}
			>
				<ProForm.Group>
					<ProFormSelect
						label="依赖服务"
						width={'xl'}
						mode="multiple"
						placeholder="请选择需要依赖的服务"
						name="depend"
						fieldProps={{
							onChange: (val) => {},
						}}
						tooltip="依赖的服务"
						hidden={false}
					/>
				</ProForm.Group>
			</DrawerForm>
		</>
	);
}
