import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
// Utilisation de l'export officiel pour éviter les erreurs Vite
// @ts-ignore - Dashboard est exporté via l'export map d'Uppy
import Dashboard from "@uppy/react/dashboard";
import French from "@uppy/locales/lib/fr_FR";

/**
 * Props du composant FileInput.
 */
export interface FileInputProps {
	/**
	 * ID unique pour l'instance Uppy.
	 */
	id?: string;
	/**
	 * Nom du champ pour le formulaire.
	 */
	name?: string;
	/**
	 * Nombre maximum de fichiers autorisés.
	 */
	maxNumberOfFiles?: number;
	/**
	 * Taille maximale d'un fichier en octets.
	 */
	maxFileSize?: number;
	/**
	 * Types de fichiers autorisés (MIME types).
	 */
	allowedFileTypes?: string[] | null;
	/**
	 * Callback appelé lors de la complétion du téléchargement.
	 * @param {any} result - Le résultat du téléchargement.
	 */
	onComplete?: (result: any) => void;
	/**
	 * Callback appelé lors d'une erreur.
	 * @param {Error} error - L'erreur survenue.
	 */
	onError?: (error: Error) => void;
	/**
	 * Hauteur du dashboard Uppy en pixels.
	 */
	height?: number;
	/**
	 * Classe CSS personnalisée.
	 */
	className?: string;
	/**
	 * Afficher les détails de progression.
	 */
	hideProgressDetails?: boolean;
	/**
	 * Afficher le logo Uppy.
	 */
	proudlyDisplayPoweredByUppy?: boolean;
}

/**
 * Composant FileInput utilisant une instance stable et le Dashboard officiel d'Uppy.
 * Gère la synchronisation avec un input caché pour les soumissions de formulaire.
 *
 * @param {FileInputProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant FileInput.
 */
export const FileInput = ({
	id = "uppy-dashboard",
	name,
	maxNumberOfFiles = 10,
	maxFileSize = 10 * 1024 * 1024,
	allowedFileTypes = null,
	onComplete,
	onError,
	height = 150,
	className = "",
	hideProgressDetails = false,
	proudlyDisplayPoweredByUppy = false,
}: FileInputProps) => {
	// État pour stocker les noms des fichiers afin de synchroniser l'input caché
	const [fileList, setFileList] = useState<string[]>([]);

	// Création d'une instance unique stable.
	// On utilise useState pour garantir qu'elle n'est créée qu'une fois par cycle de vie.
	const [uppy] = useState(() => {
		return new Uppy({
			id,
			locale: French,
			restrictions: {
				maxNumberOfFiles,
				maxFileSize,
				allowedFileTypes,
			},
			autoProceed: false,
		});
	});

	// Mise à jour des restrictions de manière réactive
	useEffect(() => {
		uppy.setOptions({
			restrictions: {
				maxNumberOfFiles,
				maxFileSize,
				allowedFileTypes,
			}
		});
	}, [uppy, maxNumberOfFiles, maxFileSize, allowedFileTypes]);

	// Gestion des événements (complétion, erreurs et synchronisation de la liste des fichiers)
	useEffect(() => {
		const updateFileList = () => {
			const files = uppy.getFiles();
			setFileList(files.map(f => f.name));
		};

		const handleComplete = (result: any) => {
			if (onComplete) onComplete(result);
		};

		const handleError = (error: Error) => {
			if (onError) onError(error);
		};

		uppy.on("complete", handleComplete);
		uppy.on("error", handleError);
		uppy.on("file-added", updateFileList);
		uppy.on("file-removed", updateFileList);

		return () => {
			uppy.off("complete", handleComplete);
			uppy.off("error", handleError);
			uppy.off("file-added", updateFileList);
			uppy.off("file-removed", updateFileList);
		};
	}, [uppy, onComplete, onError]);

	// Nettoyage final lors du démontage du composant
	useEffect(() => {
		return () => {
			if (uppy) {
				uppy.cancelAll();
				// @ts-ignore - close peut manquer dans certaines définitions de types mais est bien présent
				if (typeof uppy.close === 'function') uppy.close();
			}
		};
	}, [uppy]);

	return (
		<div className={`file-input ${className}`}>
			{/* Input caché pour la synchronisation avec FormData */}
			{name && (
				<input
					type="hidden"
					name={name}
					value={fileList.join(", ")}
				/>
			)}
			<Dashboard
				uppy={uppy}
				id={id}
				height={height}
				hideProgressDetails={hideProgressDetails}
				proudlyDisplayPoweredByUppy={proudlyDisplayPoweredByUppy}
				width="100%"
			/>
		</div>
	);
};
