import { Form as BootstrapForm } from "react-bootstrap";
import "../style/index.scss";

/**
 * Propriétés du composant RangeInput.
 */
interface Props {
	/**
	 * Valeur actuelle.
	 */
	value: number;
	/**
	 * Callback lors du changement.
	 */
	onChange: (val: number) => void;
	/**
	 * Valeur minimale (défaut: 0).
	 */
	min?: number;
	/**
	 * Valeur maximale (défaut: 100).
	 */
	max?: number;
	/**
	 * Pas d'incrémentation (défaut: 1).
	 */
	step?: number;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant RangeInput avec badge flottant qui suit le curseur.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant RangeInput rendu.
 */
export const RangeInput = ({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	className = "",
}: Props) => {
	const bemClass = "range-input";

	// Calcul de la position du badge en pourcentage
	const percent = ((value - min) / (max - min)) * 100;

	// Ajustement pour centrer le badge par rapport au thumb du range
	// Le thumb a généralement une largeur, on peut affiner le décalage si besoin
	const badgeStyle = {
		left: `${percent}%`
	};

	return (
		<div className={`${bemClass} ${className} mt-4`.trim()}>
			<div className={`${bemClass}__badge-wrapper`}>
				<span
					className={`${bemClass}__badge badge bg-primary rounded-pill`}
					style={badgeStyle}
				>
					{value}
				</span>
			</div>
			<BootstrapForm.Range
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				min={min}
				max={max}
				step={step}
				className={`${bemClass}__control`}
			/>
			<div className="d-flex justify-content-between mt-1 small text-muted">
				<span>{min}</span>
				<span>{max}</span>
			</div>
		</div>
	);
};
