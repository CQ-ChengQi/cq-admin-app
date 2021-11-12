import React from 'react';
import {
	LikeOutlined,
	UserOutlined,
	SmileOutlined,
	CrownOutlined,
	TabletOutlined,
	AntDesignOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import { Avatar, Button, Col, Descriptions, Result, Row, Space, Statistic } from 'antd';

import './Layout.css';
import Server from '../../redux/containers/Server';

export interface ILayoutProps {}
export interface ILayoutState {
	settings: Partial<ProSettings>;
	pathname: string;
}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
	constructor(props: ILayoutProps) {
		super(props);

		this.state = {
			settings: {
				title: '服务管理',
				fixSiderbar: true,
			},
			pathname: '/home',
		};

		this.setSettings = this.setSettings.bind(this);
		this.setPathname = this.setPathname.bind(this);
	}

	private setSettings(settings: Partial<ProSettings>): void {
		this.setState({ settings: settings });
	}

	private setPathname(path: string): void {
		this.setState({ pathname: path });
	}

	public render(): JSX.Element {
		const { settings, pathname } = this.state;

		return (
			<div
				id="test-pro-layout"
				style={{
					height: '100vh',
				}}
			>
				<ProLayout
					{...settings}
					location={{
						pathname,
					}}
					route={{
						path: '/',
						routes: [
							{
								path: '/home',
								name: '首页',
								icon: <SmileOutlined />,
							},
							{
								path: '/admin',
								name: '管理页',
								icon: <CrownOutlined />,
								access: 'canAdmin',
								component: './Admin',
								routes: [
									{
										path: '/admin/sub-page1',
										name: '服务管理',
										icon: <CrownOutlined />,
										component: './Server',
									},
									{
										path: '/admin/sub-page2',
										name: '二级页面',
										icon: <CrownOutlined />,
										component: './Welcome',
									},
									{
										path: '/admin/sub-page3',
										name: '三级页面',
										icon: <CrownOutlined />,
										component: './Welcome',
									},
								],
							},
						],
					}}
					onMenuHeaderClick={(e) => console.log(e)}
					waterMarkProps={{
						content: '服务管理',
					}}
					rightContentRender={() => {
						return (
							<div>
								<Avatar shape="square" size="small" icon={<UserOutlined />} />
							</div>
						);
					}}
					menuItemRender={(item, dom) => (
						<>
							<span
								onClick={() => {
									this.setPathname(item.path || '/welcome');
								}}
							>
								{dom}
							</span>
						</>
					)}
					{...settings}
				>
					<PageContainer>
						<Server></Server>
					</PageContainer>
				</ProLayout>
				{/* <SettingDrawer
					pathname={'/'}
					getContainer={() => document.getElementById('test-pro-layout')}
					settings={settings}
					onSettingChange={(changeSetting) => {
						this.setSettings(changeSetting);
					}}
					disableUrlParams
				/> */}
			</div>
		);
	}
}
