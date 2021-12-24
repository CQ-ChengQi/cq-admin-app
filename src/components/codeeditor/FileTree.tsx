import { CaretRightOutlined, ProfileFilled, ThunderboltFilled } from '@ant-design/icons';
import { Dropdown, Menu, Tree } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { DataNode } from 'antd/lib/tree';
import { Key, useState } from 'react';

export interface ICodeEditorFileTreeProps {
	treeData: DataNode[];
	handlerMenuClick: (info: MenuInfo) => void;
	handlerSelected: (Node: DataNode) => void;
}

export function CodeEditorFileTree(props: ICodeEditorFileTreeProps) {
	const { DirectoryTree } = Tree;
	const { treeData, handlerSelected, handlerMenuClick } = props;
	const [keys, setKeys] = useState<Key[]>();

	const menu = (
		<Menu onClick={handlerMenuClick}>
			<Menu.Item key="run" icon={<CaretRightOutlined />}>
				运行
			</Menu.Item>
			<Menu.Item key="test" icon={<ThunderboltFilled />}>
				测试
			</Menu.Item>
			<Menu.Item key="property" icon={<ProfileFilled />}>
				属性
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<Dropdown overlay={menu} trigger={['contextMenu']}>
				<DirectoryTree
					defaultExpandAll
					treeData={treeData}
					onSelect={(keys: React.Key[], info) => {
						handlerSelected(info.node);
						setKeys([info.node.key]);
					}}
					onRightClick={(info) => {
						setKeys([info.node.key]);
					}}
					selectedKeys={keys}
				/>
			</Dropdown>
		</>
	);
}
