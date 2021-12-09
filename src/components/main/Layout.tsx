import { useState } from 'react';
import { UserOutlined, SmileOutlined, CrownOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import Server from '../../redux/containers/Server';

import './Layout.css';
import ServerCodeEditor from '../../redux/containers/CodeEditor';

export interface ILayoutProps {
	onCollapsed: (collapsed: boolean) => void;
	onSelectMenu: (menu: string) => void;
	menu: string;
}

export function Layout(props: ILayoutProps) {
	const [settings] = useState<Partial<ProSettings> | undefined>({
		fixSiderbar: true,
		title: '服务管理',
		navTheme: 'light',
		fixedHeader: true,
	});

	const { onCollapsed, onSelectMenu } = props;
	const [pathname, setPathname] = useState(window.location.pathname);

	return (
		<ProLayout
			layout="side"
			waterMarkProps={{
				content: 'CQ Admin APP',
			}}
			location={{
				pathname: pathname,
			}}
			route={{
				path: '/',
				routes: [
					{
						path: '/welcome',
						name: '首页',
						icon: <SmileOutlined />,
					},

					{
						path: '/manager',
						name: '管理',
						icon: <CrownOutlined />,
						routes: [
							{
								path: '/manager/server',
								name: '服务管理',
							},
							{
								path: '/manager/codeeditor',
								name: '代码编辑',
							},
						],
					},
				],
			}}
			onCollapse={(collapsed: boolean) => {
				onCollapsed(collapsed);
			}}
			menuItemRender={(item, dom) => {
				return (
					<Link
						to={item.path || '/'}
						onClick={() => {
							const to = item.path || '/';
							setPathname(to);
							onSelectMenu(to);
						}}
					>
						{dom}
					</Link>
				);
			}}
			rightContentRender={() => {
				return (
					<div>
						<Avatar shape="square" size="small" icon={<UserOutlined />} />
					</div>
				);
			}}
			{...settings}
		>
			<Routes>
				<Route path="/manager/server" element={<Server />} />
				<Route path="/manager/codeeditor" element={<ServerCodeEditor />} />
			</Routes>
		</ProLayout>
	);
}
