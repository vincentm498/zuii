# Système de Design Tokens (Zuii)

Ce document décrit comment utiliser et modifier le système de tokens de design de Zuii.

## 1. Architecture

Les tokens sont définis au format JSON et transformés en CSS, SCSS et TypeScript via [Style Dictionary](https://styledictionary.com/).

### Structure des Fichiers Source

-   **`tokens/*.json`** : Définition des tokens (source de vérité).
    -   `brands.json` : Couleurs de marque et sémantiques (primary, success, danger...).
    -   `colors.json` : Palette de couleurs globale (white, black, gray scale).
    -   `fonts.json` : Définitions des polices de caractères.
    -   `radius.json` : Rayons de bordure (border-radius).
    -   `shadows.json` : Ombres portées (box-shadow).
    -   `size.json` : Échelle de tailles unifiée (utilisée pour le radius, spacing, etc.).
    -   `spacing.json` : Échelle d'espacement.
-   **`scripts/tokens/`** : Configuration du générateur et scripts de build.

### Fichiers Générés (Package Distribué)

Les fichiers sont générés dans **`dist/core/styles/`** lors du build du package npm :
-   `tokens.css` : Variables CSS (`:root { ... }`).
-   `_tokens.scss` : Variables SCSS organisées en maps.
-   `tokens.ts` : Objet de tokens structuré pour TypeScript.

## 2. Workflow de Développement

### Ajouter ou Modifier un Token

1.  Ouvrez le fichier JSON correspondant dans `tokens/`.
2.  Ajoutez ou modifiez votre token.

**Exemple (`radius.json`) :**
```json
{
  "border-radius": {
    "custom": { "value": "1.5rem" }
  }
}
```

### Génération Automatique

Les tokens sont générés automatiquement lors du processus de build du package :

```bash
pnpm run build
```

Ce script exécute successivement :
1.  **`prebuild`** : Génère les tokens dans `src/core/styles/` (ignorés par Git).
2.  **`build`** : Compile la bibliothèque avec Vite.
3.  **`postbuild`** : Copie les tokens générés dans `dist/core/styles/` pour la distribution.

### Générer Manuellement (pour test)

Si vous voulez voir le résultat sans faire un build complet :

```bash
pnpm run tokens:build
```

Les fichiers apparaîtront dans `src/core/styles/`.

## 3. Conventions de Nommage

-   **CSS** : Kebab-case (`--primary`, `--size-1`, `--border-radius-sm`).
-   **TypeScript** : Objet `tokens` exporté avec une structure identique au JSON (`tokens.brands.primary.value`).
-   **SCSS** : Maps nommées selon la catégorie (`$brands`, `$color`, `$size`, `$spacing`, `$border-radius`, `$box-shadow`).

## 4. Utilisation

### Dans un projet utilisant Zuii

Une fois Zuii installé, vous pouvez importer les tokens directement depuis le dossier `core/styles` :

```scss
// SCSS
@use "zuii/core/styles/tokens" as *;

.my-component {
  background-color: map-get($brands, "primary");
  border-radius: map-get($border-radius, "sm");
}
```

```javascript
// TypeScript
import { tokens } from 'zuii/core/styles/tokens';

const primaryColor = tokens.brands.primary.value;
```

### Personnalisation via CLI

Si vous souhaitez générer vos propres tokens dans votre projet à partir de vos fichiers sources, utilisez l'outil CLI inclus :

```bash
npx zuii-tokens --output src/styles
```
