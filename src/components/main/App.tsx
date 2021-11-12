import { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Layout } from './Layout';

import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-table/dist/table.css';

import './App.css';

const App: FC = () => (
	<ConfigProvider locale={zhCN}>
		<Layout></Layout>
	</ConfigProvider>
);

export default App;
