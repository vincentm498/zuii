import { useEffect, useState, useRef } from 'react';
import { UppyContextProvider } from '@uppy/react';
import Dashboard from '@uppy/react/dashboard';

import {
	getUppyLocale,
	createUppyInstance,
	syncUppyToInput,
	fetchRemoteFiles,
	setupFileOpenButtons,
	type FileInputRoute
} from '../js/uppy';

/**
 * Propriétés du composant FileInput.
 */
interface FileInputProps {
	/** Nom du champ. */
	name?: string;
	/** Langue du composant ('fr' ou 'en'). */
	lang?: 'fr' | 'en';
	/** Restrictions de téléchargement. */
	restrictions?: {
		/** Nombre maximum de fichiers. */
		maxNumberOfFiles?: number;
		/** Taille maximum d'un fichier en octets. */
		maxFileSize?: number;
		/** Types de fichiers autorisés. */
		allowedFileTypes?: string[];
	};
	/** Callback appelé lors de la fin du téléchargement. */
	onComplete?: (result: any) => void;
	/** Callback appelé en cas d'erreur. */
	onError?: (error: any) => void;
	/** Fichiers à charger initialement. */
	files?: FileInputRoute[];
	/** Configuration de la webcam. */
	webcam?: {
		/** Si l'enregistrement vidéo est autorisé (défaut: true). */
		allowVideo?: boolean;
	};
}

/**
 * Composant FileInput utilisant Uppy.js pour le téléchargement de fichiers.
 * Affiche le Dashboard Uppy complet par défaut.
 *
 * @param {FileInputProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant FileInput rendu.
 */
export const FileInput = ({
	name,
	lang,
	restrictions,
	onComplete,
	onError,
	files,
	webcam
}: FileInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dashboardRef = useRef<HTMLDivElement>(null);
	const fetchedUrls = useRef<Set<string>>(new Set());

	// Détection de la langue et de la locale
	const locale = getUppyLocale(lang);

	// Initialisation d'Uppy
	const [uppy] = useState(() => createUppyInstance(restrictions || {}, locale, webcam));

	useEffect(() => {
		if (onComplete) {
			uppy.on('complete', onComplete);
		}

		if (onError) {
			uppy.on('error', onError);
		}

		const handleSync = () => {
			if (inputRef.current) {
				syncUppyToInput(uppy, inputRef.current);
			}
		};

		const events = [
			'file-added',
			'file-removed',
			'files-added',
			'file-editor:complete',
			'preprocess-complete',
			'postprocess-complete'
		];

		events.forEach(event => uppy.on(event as any, handleSync));

		return () => {
			if (onComplete) uppy.off('complete', onComplete);
			if (onError) uppy.off('error', onError);
			events.forEach(event => uppy.off(event as any, handleSync));
		};
	}, [uppy, onComplete, onError]);

	// Chargement initial des fichiers si présents
	useEffect(() => {
		if (files && files.length > 0) {
			fetchRemoteFiles(uppy, files, fetchedUrls.current, onError);
		}
	}, [uppy, files, onError]);

	// Injection de boutons Vanilla JS/HTML dans les items du Dashboard
	useEffect(() => {
		if (!dashboardRef.current) return;
		return setupFileOpenButtons(dashboardRef.current, uppy);
	}, [uppy]);

	const isMultiple = !restrictions?.maxNumberOfFiles || restrictions.maxNumberOfFiles > 1;

	return (
		<UppyContextProvider uppy={uppy}>
			<div className="file-input__wrapper" id={name}>
				<div className="file-input__content" ref={dashboardRef}>
					<Dashboard
						uppy={uppy}
						plugins={['Webcam']}
						width="100%"
						height={300}
						hideProgressDetails={false}
						hideUploadButton={true}
						proudlyDisplayPoweredByUppy={false}
						locale={{
							strings: locale.strings
						}}
					/>
				</div>
				{name && (
					<input
						ref={inputRef}
						type="file"
						name={isMultiple ? `${name}[]` : name}
						multiple={isMultiple}
						style={{ display: 'none' }}
					/>
				)}
			</div>
		</UppyContextProvider>
	);
};



