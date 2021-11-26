import { FC } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import Layout from '../../redux/containers/Layout';

import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-card/dist/card.css';

import './App.css';

const App: FC = () => (
	<ConfigProvider locale={zhCN}>
		<BrowserRouter>
			<Layout></Layout>
		</BrowserRouter>
	</ConfigProvider>
);

export default App;
