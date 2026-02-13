import React, { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import type { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../style/index.scss';
import { getAlertOptions, type AlertVariant, type FireAlertOptions } from '../js/alert';

export type { AlertVariant };

/**
 * Propriétés du composant Alert.
 */
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Le contenu de l'alerte.
	 */
	children?: React.ReactNode;
	/**
	 * La variante de couleur de l'alerte.
	 */
	variant?: AlertVariant;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Si l'alerte peut être fermée.
	 */
	dismissible?: boolean;
	/**
	 * Callback appelé lors de la fermeture de l'alerte.
	 */
	onClose?: () => void;
	/**
	 * Contrôle la visibilité de l'alerte.
	 */
	show?: boolean;
}

/**
 * Propriétés du composant AlertHeading.
 */
interface AlertHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	/**
	 * Le contenu du heading.
	 */
	children?: React.ReactNode;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Propriétés du composant AlertLink.
 */
interface AlertLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	/**
	 * Le contenu du lien.
	 */
	children?: React.ReactNode;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * L'URL du lien.
	 */
	href?: string;
}

/**
 * Composant AlertHeading.
 * Utilisé pour afficher un titre dans une alerte.
 *
 * @param {AlertHeadingProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const AlertHeading = ({
	children,
	className = '',
	...props
}: AlertHeadingProps) => {
	const bemClass = 'alert__heading';

	return (
		<h4 className={`${bemClass} ${className}`.trim()} {...props}>
			{children}
		</h4>
	);
};

/**
 * Composant AlertLink.
 * Utilisé pour afficher un lien stylisé dans une alerte.
 *
 * @param {AlertLinkProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const AlertLink = ({
	children,
	className = '',
	href = '#',
	...props
}: AlertLinkProps) => {
	const bemClass = 'alert__link';

	return (
		<a className={`${bemClass} ${className}`.trim()} href={href} {...props}>
			{children}
		</a>
	);
};

/**
 * Composant Alert.
 * Fournit des messages de feedback contextuels pour les actions utilisateur typiques.
 *
 * @param {AlertProps} props - Les propriétés du composant.
 * @returns {JSX.Element | null} Le rendu du composant.
 */
export const AlertBase = ({
	children,
	variant = 'primary',
	className = '',
	dismissible = false,
	onClose,
	show,
	...props
}: AlertProps) => {
	const [visible, setVisible] = useState(true);

	// Utiliser la prop show si fournie, sinon utiliser l'état interne
	const isVisible = show !== undefined ? show : visible;

	/**
	 * Gère la fermeture de l'alerte.
	 */
	const handleClose = () => {
		setVisible(false);
		if (onClose) {
			onClose();
		}
	};

	if (!isVisible) {
		return null;
	}

	const bemClass = 'alert';
	const variantClass = variant ? `${bemClass}--${variant}` : '';
	const dismissibleClass = dismissible ? `${bemClass}--dismissible` : '';

	return (
		<div
			className={`${bemClass} ${variantClass} ${dismissibleClass} ${className}`.trim()}
			role="alert"
			{...props}
		>
			{children}
			{dismissible && (
				<button
					type="button"
					className={`btn btn-transparent btn--close ${bemClass}__close`}
					onClick={handleClose}
					aria-label="Fermer"
				>
					<span aria-hidden="true">
						<i className="icon icon-x"></i>
					</span>
				</button>
			)}
		</div>
	);
};

const MySwal = withReactContent(Swal);

/**
 * Interface étendue pour le composant Alert avec ses sous-composants et méthodes.
 */
interface AlertComponent extends React.FC<AlertProps> {
	fire: (options: FireAlertOptions) => Promise<SweetAlertResult>;
	Heading: typeof AlertHeading;
	Link: typeof AlertLink;
	close: () => void;
}

const Alert = AlertBase as AlertComponent;

/**
 * Affiche une alerte modale interactive avec SweetAlert2.
 * Wrapper autour de SweetAlert2 pour une API cohérente avec le composant Alert.
 *
 * @param {SweetAlertOptions & { icon?: string }} options - Options de configuration de l'alerte.
 * @returns {Promise<SweetAlertResult>} Promesse résolue avec le résultat de l'alerte.
 *
 * @example
 * ```tsx
 * // Alerte simple
 * Alert.fire({
 *   icon: 'success',
 *   title: 'Succès !',
 *   text: 'Opération réussie'
 * });
 *
 * // Alerte de confirmation
 * const result = await Alert.fire({
 *   title: 'Êtes-vous sûr ?',
 *   icon: 'warning',
 *   showCancelButton: true
 * });
 * if (result.isConfirmed) {
 *   // Action confirmée
 * }
 *
 * // Alerte avec icône personnalisée
 * Alert.fire({
 *   title: 'Supprimé !',
 *   icon: 'trash',
 *   confirmButtonText: 'OK'
 * });
 * ```
 */
Alert.fire = (options: FireAlertOptions): Promise<SweetAlertResult> => {
	return MySwal.fire(getAlertOptions(options));
};

// Attacher les sous-composants au composant principal
Alert.Heading = AlertHeading;
Alert.Link = AlertLink;
Alert.close = () => MySwal.close();

export { Alert };
