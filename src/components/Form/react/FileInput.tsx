import { useState } from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import "../style/index.scss";
import { Icon } from "../../Icon/react";

/**
 * Propriétés du composant FileInput.
 */
interface Props {
	/**
	 * Callback lors de la sélection du fichier.
	 */
	onChange?: (file: File | null) => void;
	/**
	 * Types de fichiers acceptés (ex: ".jpg,.pdf").
	 */
	accept?: string;
	/**
	 * Libellé principal de la zone.
	 */
	label?: string;
	/**
	 * Description ou limitation (ex: "Max 5Mo").
	 */
	info?: string;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Si l'input est désactivé.
	 */
	disabled?: boolean;
}

/**
 * Composant FileInput premium avec zone de drop.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant FileInput rendu.
 */
export const FileInput = ({
	onChange,
	accept,
	label = "Cliquez ou glissez un fichier ici",
	info = "Tous types de fichiers acceptés",
	className = "",
	disabled = false,
}: Props) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const bemClass = "file-input";

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setSelectedFile(file);
		onChange?.(file);
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedFile(null);
		onChange?.(null);
	};

	return (
		<div className={`${bemClass} ${className}`.trim()}>
			{!selectedFile ? (
				<div
					className={`${bemClass}__wrapper ${isDragOver ? `${bemClass}__wrapper--dragover` : ""}`}
					onDragOver={() => !disabled && setIsDragOver(true)}
					onDragLeave={() => setIsDragOver(false)}
					onDrop={() => setIsDragOver(false)}
				>
					<div className={`${bemClass}__icon`}>
						<Icon name="icon-cloud-upload" size="xl" />
					</div>
					<div className={`${bemClass}__label`}>{label}</div>
					<div className={`${bemClass}__info`}>{info}</div>

					<BootstrapForm.Control
						type="file"
						accept={accept}
						disabled={disabled}
						onChange={handleFileChange}
						className={`${bemClass}__control`}
					/>
				</div>
			) : (
				<div className={`${bemClass}__preview`}>
					<Icon name="bi bi-file-earmark-check" className="me-2 text-success" />
					<span className={`${bemClass}__preview-name text-truncate`}>
						{selectedFile.name}
					</span>
					<div className={`${bemClass}__preview-remove`} onClick={handleRemove}>
						<Icon name="bi bi-x-circle-fill" />
					</div>
				</div>
			)}
		</div>
	);
};
