import { ReactNode, useEffect, useRef } from 'react';
import { Group } from '../../Group/react';
import { Button } from '../../Button/react';

export interface TableHeaderActionProps {
	displayName: string;
	action?: ReactNode;
	actif?: boolean;
	onAction?: (event: MouseEvent) => void;
}

export const TableHeaderAction = ({ displayName, action, actif = false, onAction }: TableHeaderActionProps) => {
	const actionRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const element = actionRef.current;
		const handleClick = (event: MouseEvent) => {
			event.stopPropagation();
			onAction?.(event);
		};

		element?.addEventListener('click', handleClick);

		return () => {
			element?.removeEventListener('click', handleClick);
		};
	}, [onAction]);

	const contenuAction = action ?? (onAction ? <Button size="sm" variant="secondary" transparent btnIcon icon={actif ? 'icon-eye' : 'icon-eye-closed'} /> : null);

	return (
		<Group gap="sm" align="center-left" className="datagrid-header-action">
			<span className="datagrid-header-action__label">{displayName}</span>
			{contenuAction && <span ref={actionRef} className="datagrid-header-action__action">{contenuAction}</span>}
		</Group>
	);
};
