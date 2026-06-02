# 🚀 Création d'un Composant

Ce document détaille la structure et le processus de création d'un nouveau composant au sein de la bibliothèque **Zuii**.

> [!IMPORTANT]
> L'automatisation de ce processus doit être gérée par un script situé dans le dossier `scripts/`.

## 🛠️ Utilisation

Pour créer un nouveau composant, utilisez la commande suivante à la racine du projet :

```bash
pnpm component:create [nom-du-composant]
```

> [!NOTE]
> Bien que les exemples utilisent `pnpm`, le script est un fichier Node.js standard et fonctionne également avec `npm run`, `yarn` ou `bun run`.

> [!TIP]
> Si vous ne spécifiez pas de nom, le script passera en **mode interactif** et vous demandera de le saisir.

*Exemple : `pnpm component:create user-profile`*


## ⚙️ Fonctionnement du Script

Le script de création génère automatiquement l'arborescence suivante dans le dossier `src/components/` et ajoute l'export dans `src/index.ts` :

### 📂 Structure des Dossiers
-   `react/` : Composant React et sa logique.
-   `style/` : Styles SCSS (méthode BEM).
-   `js/` : Logique TypeScript native.
-   `symfony/` : Intégration pour le framework Symfony.
-   `src/templates/[Nom-Au-Pluriel]/` : Template de démonstration React pour le playground.

> [!NOTE]
> Le script vous demandera un nom au pluriel pour organiser les templates de démo.


---

## 📝 Spécifications des Fichiers

### ⚛️ React (`react/index.tsx`)

Le fichier `index.tsx` suit une structure stricte utilisant des constantes typées et documentées via JSDoc.

```tsx
import '../style/index.scss';

/**
 * Propriétés du composant NomDuComposant.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant NomDuComposant.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const NomDuComposant = ({
	className = "",
}: Props) => {
	const baseClass = "nom-du-composant";
	const wrapperClass = `${baseClass} ${className}`.trim();

	return (
		<div className={wrapperClass}>
			NomDuComposant
		</div>
	);
};
```

### 🎨 Style (`style/`)

Les styles sont séparés en deux fichiers pour permettre une meilleure modularité et l'utilisation des `@layer`.

#### `index.scss`
Point d'entrée pour les styles du composant.

```scss
@layer components {
	@import "nom-du-composant";
}
```

#### `nom-du-composant.scss`
Définition des styles suivant la méthode **BEM**.

```scss
.nom-du-composant {
	display: block;
	width: 100px;
	height: 100px;
	border: 1px solid red;
}
```

### ⚡ Logique (`js/nom-du-composant.ts`)
Contient la logique TypeScript native pour les environnements sans React.

### 🐘 Symfony (`symfony/`)
Contient les fichiers nécessaires pour l'utilisation du composant dans un projet Symfony.
