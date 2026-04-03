import React from 'react';
import { Modal as BSTModal, ModalProps as BSTModalProps } from 'react-bootstrap';
import '../style/index.scss';

/**
 * Propriétés du composant Modal.
 */
interface Props extends BSTModalProps {
	/** Visibilité de la modale */
	show: boolean;
	/** Fonction de fermeture */
	onHide: () => void;
	/** Taille de la modale */
	size?: 'sm' | 'lg' | 'xl';
	/** Centrage vertical */
	centered?: boolean;
	/** Permet le défilement du contenu */
	scrollable?: boolean;
	/** Enfants (sous-composants Modal.Header, Body, etc.) */
	children?: React.ReactNode;
}

/**
 * Composant Modal.
 * Basé sur React Bootstrap Modal, avec injection des classes BEM zuii.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Modal = ({
	className = "",
	show,
	onHide,
	size,
	centered,
	scrollable,
	children,
	...props
}: Props) => {
	return (
		<BSTModal
			show={show}
			onHide={onHide}
			size={size}
			centered={centered}
			scrollable={scrollable}
			className={`${className}`.trim()}
			{...props}
		>
			{children}
		</BSTModal>
	);
};

// Exposition des sous-composants avec injection des classes BEM zuii
Modal.Header = ({ className = "", ...props }: any) => (
	<BSTModal.Header className={`${className}`.trim()} {...props} />
);

Modal.Title = ({ className = "", ...props }: any) => (
	<BSTModal.Title className={`${className}`.trim()} {...props} />
);

Modal.Body = ({ className = "", ...props }: any) => (
	<BSTModal.Body className={`${className}`.trim()} {...props} />
);

Modal.Footer = ({ className = "", ...props }: any) => (
	<BSTModal.Footer className={`${className}`.trim()} {...props} />
);

