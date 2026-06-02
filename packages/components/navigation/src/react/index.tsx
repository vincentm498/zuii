import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/index.scss';

/**
 * Interface représentant un élément de composant dans la navigation.
 */
export interface ComponentItem {
	path: string;
	name: string;
	category: string;
}

/**
 * Propriétés du composant Sidebar.
 */
interface Props {
	components: ComponentItem[];
}

/**
 * Composant de navigation latérale pour le playground.
 * Affiche les composants par catégories.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Sidebar.
 */
export const Sidebar = ({ components }: Props) => {
	const [isOpen, setIsOpen] = React.useState(true);
	const categories = ['Sections', 'Components', 'Utilities'];

	return (
		<div className="sidebar">
			<nav className={`sidebar__nav ${isOpen ? 'sidebar__nav--open' : ''}`}>
				<ul className={`sidebar__list ${isOpen ? 'sidebar__list--visible' : ''}`}>
					{categories.map(category => (
						<li key={category} className="sidebar__category">
							<div className="sidebar__category-title">
								{category}
							</div>
							<ul className="sidebar__items">
								{components.filter(c => c.category === category).map((c) => (
									<li key={c.path} className="sidebar__item">
										<NavLink
											to={c.path}
											className={({ isActive }) =>
												`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
											}
										>
											{c.name}
										</NavLink>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</nav>

			<button
				onClick={() => setIsOpen(!isOpen)}
				title={isOpen ? 'Réduire le menu' : 'Ouvrir le menu'}
				className={`sidebar__toggle ${isOpen ? 'sidebar__toggle--open' : ''}`}
			>
				<svg
					className={`sidebar__toggle-icon ${!isOpen ? 'sidebar__toggle-icon--closed' : ''}`}
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>
		</div>
	);
};
