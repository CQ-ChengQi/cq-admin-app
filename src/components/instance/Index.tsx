import { PageContainer } from '@ant-design/pro-layout';
import { IServerSelectModel } from '../../infrastructure/interfaces/ICodeEditor';
import { IServerInstanceModel } from '../../infrastructure/interfaces/IInstance';
import { IServerKillParamModel } from '../../infrastructure/interfaces/IServer';
import { InstanceTable } from './Table';

export interface IServerInstanceProps {
	onKill: (param: IServerKillParamModel) => void;
	onPing: (name: string, address: string) => void;
	onLoad: (id: string) => void;
	onLoadServerSelect: () => void;
	data?: IServerInstanceModel[];
	total?: number;
	serverSelectData: IServerSelectModel[];
	init: boolean;
}

export function Instance(props: IServerInstanceProps) {
	const { total, data, serverSelectData, init, onKill, onPing, onLoad, onLoadServerSelect } = props;

	return (
		<>
			<PageContainer>
				<InstanceTable
					onLoad={(id) => onLoad(id)}
					onKill={(param) => onKill(param)}
					onPing={(name: string, address: string) => onPing(name, address)}
					data={data}
					total={total}
					onLoadServerSelect={() => onLoadServerSelect()}
					serverSelectData={serverSelectData}
					init={init}
				/>
			</PageContainer>
		</>
	);
}
