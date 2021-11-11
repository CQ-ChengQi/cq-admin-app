import { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Nav from '../layout/Index';

import './App.css';

const App: FC = () => (
	<ConfigProvider locale={zhCN}>
		<Nav></Nav>
	</ConfigProvider>
);

export default App;
