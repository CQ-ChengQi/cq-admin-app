import React from 'react';
import { Layout, Menu } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons';

import Server from '../../redux/containers/Server';

import './Index.css';

const { Header, Footer, Sider, Content } = Layout;

interface ILayoutProps {}

interface ILayoutState {
	collapsed: boolean;
	height: number;
}

export default class Nav extends React.Component<ILayoutProps, ILayoutState> {
	constructor(props: ILayoutProps) {
		super(props);
		this.state = {
			collapsed: false,
			height: document.documentElement.clientHeight,
		};

		this.handleResize = this.handleResize.bind(this);
	}

	private handleResize(e: any): void {
		this.setState({
			height: e.target.innerHeight,
		});
	}

	public componentDidMount(): void {
		window.addEventListener('resize', this.handleResize);
	}

	public componentWillUnmount(): void {
		window.removeEventListener('resize', this.handleResize);
	}

	private toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	public render() {
		return (
			<Layout
				id="components-layout-demo-custom-trigger"
				style={{
					height: this.state.height,
				}}
			>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<div className="logo"></div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<Menu.Item key="1" icon={<UserOutlined />}>
							nav 1
						</Menu.Item>
						<Menu.Item key="2" icon={<VideoCameraOutlined />}>
							nav 2
						</Menu.Item>
						<Menu.Item key="3" icon={<UploadOutlined />}>
							nav 3
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}>
						{React.createElement(
							this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: 'trigger',
								onClick: this.toggle,
							},
						)}
					</Header>
					<Content
						className="site-layout-content-background"
						style={{
							margin: 0,
							padding: 12,
							overflow: 'auto',
						}}
					>
						<Server></Server>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Ant Design ©2018 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		);
	}
}
