import { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Server from '../../redux/containers/Server';

import './App.css';

const App: FC = () => (
	<ConfigProvider locale={zhCN}>
		<Server />
	</ConfigProvider>
);

export default App;
