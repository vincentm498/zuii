import React from 'react';
import '../style/index.scss';

/**
 * Propriétés du composant Dashboard.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Contenu du composant.
	 */
	children?: React.ReactNode;
}

/**
 * Composant Dashboard.Navigation.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const DashboardNavigation = ({ children, className = "" }: Props) => {

	const childrenWithProps = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			const element = child as React.ReactElement<any>;
			const itemClasses = [
				`nav-${index + 1}`
			].filter(Boolean).join(' ');

			return React.cloneElement(element, {
				className: `${(element.props.className || '')} ${itemClasses}`.trim()
			});
		}
		return child;
	});

	return (
		<div className={`dashboard__navigation ${className}`.trim()}>
			{childrenWithProps}
		</div>
	);
};

/**
 * Composant Dashboard.Content.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const DashboardContent = ({ children, className = "" }: Props) => (
	<div className={`dashboard__content ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Dashboard.Header.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const DashboardHeader = ({ children, className = "" }: Props) => (
	<div className={`dashboard__header ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Dashboard.SubNavigation.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const DashboardSubNavigation = ({ children, className = "" }: Props) => (
	<div className={`dashboard__sub-navigation ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Dashboard.Wrapper.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const DashboardWrapper = ({ children, className = "" }: Props) => (
	<div className={`dashboard__wrapper ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Dashboard.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Dashboard = ({
	children,
	className = "",
}: Props) => {
	const baseClass = "dashboard";
	const wrapperClass = `${baseClass} ${className}`.trim();

	return (
		<main className={wrapperClass}>
			{children}
		</main>
	);
};

Dashboard.Navigation = DashboardNavigation;
Dashboard.Content = DashboardContent;
Dashboard.Header = DashboardHeader;
Dashboard.SubNavigation = DashboardSubNavigation;
Dashboard.Wrapper = DashboardWrapper;

