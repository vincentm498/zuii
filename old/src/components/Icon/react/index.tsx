import React, { createContext, useContext } from "react";
import "../style/index.scss";

/**
 * Type pour les tailles supportées.
 */
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | undefined;

/**
 * Contexte pour partager la taille entre les composants.
 */
const SizeContext = createContext<ComponentSize>(undefined);

/**
 * Fournisseur de contexte pour la taille.
 */
export const SizeProvider = ({ size, children }: { size: ComponentSize; children: React.ReactNode }) => {
	return (
		<SizeContext.Provider value={size}>
			{children}
		</SizeContext.Provider>
	);
};

/**
 * Hook pour consommer la taille du contexte.
 */
export const useSize = (): ComponentSize => {
	return useContext(SizeContext);
};

/**
 * Propriétés du composant Icon.
 */
interface Props {
	/**
	 * Le nom de l'icône (ex: "house", "check", "trash").
	 * Correspond à la classe CSS icon-[name].
	 */
	name: string;
	/**
	 * La taille de l'icône.
	 */
	size?: ComponentSize;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant Icon pour afficher des icônes de police.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Icon = ({
	name,
	size,
	className = "",
}: Props) => {
	const contextSize = useSize();
	const finalSize = size || contextSize || "lg";

	const bemClass = "icon";
	const sizeClass = `${bemClass}--size-${finalSize}`;

	return (
		<span className={`${bemClass} ${sizeClass} ${className}`.trim()}>
			<i className={`${name}`}></i>
		</span>
	);
};
