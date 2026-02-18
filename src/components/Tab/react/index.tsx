import React, { useState } from 'react';
import { Tabs as BootstrapTabs, Tab as BootstrapTab, TabProps, TabsProps as BootstrapTabsProps, Nav, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import '../style/index.scss';
import { Group } from '../../Group/react';
import { Button } from '../../Button/react';

/**
 * Interface pour un élément individuel de l'onglet.
 * On omit 'title' car on utilise 'header'.
 */
export interface TabItem extends Omit<TabProps, 'title'> {
	/**
	 * Le titre de l'onglet.
	 */
	header: React.ReactNode;
	/**
	 * Le contenu de l'onglet.
	 */
	body: React.ReactNode;
	/**
	 * La clé unique de l'onglet.
	 */
	eventKey: string;
}

/**
 * Propriétés du composant Tabs.
 */
export interface TabsProps extends BootstrapTabsProps {
	/**
	 * Liste d'objets définissant les onglets.
	 */
	items?: TabItem[];
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Disposition verticale des onglets.
	 */
	vertical?: boolean;
	/**
	 * Contenu pour le mode composé.
	 */
	children?: React.ReactNode;
	/**
	 * Clé par défaut.
	 */
	defaultActiveKey?: string;
	/**
	 * Couleur de l'onglet.
	 */
	color?: "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "accent";
	/**
	 * Variantes de l'onglet.
	 */
	variant?: 'default' | 'pills' | 'underline' | '';
	/**
	 * Bordure de l'onglet.
	 */
	border?: boolean;
	/**
	 * Classe CSS additionnelle pour le contenu des onglets.
	 */
	contentClassName?: string;
}

/**
 * Interface pour le composant Tabs avec ses propriétés statiques.
 */
export interface TabsComponent {
	(props: TabsProps): React.JSX.Element;
	Item: typeof BootstrapTab;
	Container: typeof TabContainer;
	Content: typeof TabContent;
	Pane: typeof TabPane;
	Nav: typeof Nav;
}


/**
 * Composant Tabs basé sur React Bootstrap.
 *
 * @param {TabsProps} props - Les propriétés du composant.
 * @returns {React.JSX.Element} Le rendu du composant.
 */
export const Tabs: TabsComponent = ({
	items = [],
	children,
	className = "",
	vertical = false,
	variant = "",
	border = false,
	color = "primary",
	defaultActiveKey,
	activeKey: controlledActiveKey,
	onSelect,
	contentClassName = "tabs__content",
	...props
}: TabsProps): React.JSX.Element => {
	const [localActiveKey, setLocalActiveKey] = useState<string | undefined>(defaultActiveKey || (items.length > 0 ? items[0].eventKey : undefined));

	const currentActiveKey = controlledActiveKey !== undefined ? (controlledActiveKey as string) : localActiveKey;

	const handleSelect = (key: string | null, e: React.SyntheticEvent<unknown>) => {
		if (key) {
			setLocalActiveKey(key);
		}
		if (onSelect) {
			onSelect(key, e);
		}
	};

	const bemBase = "tabs";
	const verticalClass = vertical ? `${bemBase}--vertical` : "";
	const variantClass = variant ? `${bemBase}--${variant}` : "";
	const borderClass = border ? `${bemBase}--border` : "";
	const colorClass = `${bemBase}--${color}`;

	if (items.length > 0 && vertical) {
		return (
			<TabContainer
				{...props}
				activeKey={currentActiveKey}
				onSelect={handleSelect}
			>
				<Group className={`${bemBase} ${verticalClass} ${variantClass} ${colorClass} ${className}`.trim()}>
						<Group vertical className="tabs__nav">
							{items.map((item, index) => (
								<div key={index}>
									<Button
										variant="transparent"
										onClick={(e: any) => handleSelect(item.eventKey, e)}
										active={currentActiveKey === item.eventKey}
									>
										{item.header}
									</Button>
								</div>
							))}
						</Group>
						<TabContent className={contentClassName}>
							{items.map((item, index) => (
								<TabPane key={index} eventKey={item.eventKey}>
									{item.body}
								</TabPane>
							))}
						</TabContent>
				</Group>
			</TabContainer>
		);
	}

	return (
		<div className={`${bemBase} ${verticalClass} ${variantClass} ${borderClass} ${colorClass} ${className}`.trim()}>
			<BootstrapTabs

				activeKey={currentActiveKey}
				onSelect={handleSelect}
				{...props}
			>
				{items.length > 0 ? (
					items.map((item, index) => {
						const { header, body, ...tabProps } = item;
						return (
							<BootstrapTab
								key={index}
								title={header}
								{...(tabProps as any)}
								tabClassName={`${bemBase}__item btn btn-${color}`}

							>
								<div className={`${bemBase}__content`}>
									{body}
								</div>
							</BootstrapTab>
						);
					})
				) : (
					children
				)}
			</BootstrapTabs>
		</div>
	);
};

/**
 * Sous-composant Tab.
 */
Tabs.Item = BootstrapTab;

/**
 * Sous-composant TabContainer.
 */
Tabs.Container = TabContainer;

/**
 * Sous-composant TabContent.
 */
Tabs.Content = TabContent;

/**
 * Sous-composant TabPane.
 */
Tabs.Pane = TabPane;

/**
 * Sous-composant Nav pour les dispositions personnalisées.
 */
Tabs.Nav = Nav;

