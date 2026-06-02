import { tokens } from '@zuii/core/styles/tokens';
import { Group } from '../../../index';
import '../style/index.scss';

interface Props {
	name: keyof typeof tokens.brands;
}

export const Color = ({ name }: Props) => {
	const colorData = tokens.brands[name];

	return (
		<Group>
			<div className={`color bg-${name} p-4`}>
				<Group vertical center>
					<span className="color__name">{name}</span>
					<span className="color__value">{colorData.value}</span>
				</Group>
			</div>
			<div className={`color bg-${name}-light p-4`}>
				<Group vertical center>
					<span className="color__name">{name}-light</span>
					<span className="color__value">{colorData.value}</span>
				</Group>
			</div>
			<div className={`color bg-${name}-dark p-4`}>
				<Group vertical center>
					<span className="color__name">{name}-dark</span>
					<span className="color__value">{colorData.value}</span>
				</Group>
			</div>
		</Group>
	);
};
