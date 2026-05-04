# Style Dictionary - Zuii

Ce dossier contient la configuration Style Dictionary pour générer les tokens de design de Zuii.

## Utilisation dans votre projet

Après avoir installé `zuii` dans votre projet, vous pouvez générer les tokens de design en utilisant la commande `zuii-tokens`.

### Commande de base

```bash
npx zuii-tokens
```

Par défaut, cette commande :
- Cherche les tokens dans le dossier `tokens/` de votre projet
- Génère les fichiers dans le répertoire courant de votre projet

### Options

#### Spécifier le chemin de sortie

Vous pouvez spécifier où générer les fichiers avec l'option `--output` ou `-o` :

```bash
npx zuii-tokens --output src/styles
```

Cela générera les fichiers dans `src/styles/` :
- `src/styles/_tokens.scss` - Variables SCSS avec maps
- `src/styles/tokens.css` - Variables CSS custom properties
- `src/styles/tokens.ts` - Constantes TypeScript
- `src/styles/main.scss` - Squelette de styles (wrapper Bootstrap par défaut, ou autre framework CSS)

#### Spécifier le chemin des tokens source

Vous pouvez spécifier un ou plusieurs chemins vers vos fichiers de tokens :

```bash
npx zuii-tokens design-tokens
```

### Exemple d'utilisation

Dans votre `package.json`, vous pouvez ajouter un script :

```json
{
  "scripts": {
    "tokens": "zuii-tokens --output src/styles"
  }
}
```

## Développement local (dans le package zuii)

Si vous travaillez sur le package zuii lui-même, la génération est automatisée lors du build :

```bash
pnpm run build
```

Ce processus effectue les étapes suivantes :
1.  **Génération (src)** : Les tokens sont générés dans `src/core/styles/` pour être utilisés par la compilation Sass (ces fichiers sont ignorés par Git).
2.  **Copie (dist)** : Après le build Vite, les tokens sont copiés dans `dist/core/styles/` pour être distribués aux utilisateurs.

Pour générer les tokens manuellement pendant le développement (sans faire un build complet) :

```bash
pnpm run tokens:build
```

Cela générera les fichiers dans `src/core/styles/`.

## Structure des tokens

Les tokens doivent être organisés en fichiers JSON dans le format Style Dictionary :

```json
{
  "color": {
    "primary": { "value": "#296782" }
  }
}
```

## Fichiers générés

### `_tokens.scss`
Variables SCSS organisées en maps pour une utilisation facile dans vos styles SCSS.

### `tokens.css`
Variables CSS custom properties (CSS variables) pour une utilisation directe dans vos styles CSS.

### `tokens.ts`
Constantes TypeScript pour une utilisation dans votre code JavaScript/TypeScript.

### `main.scss`
Squelette de styles incluant le wrapper Bootstrap par défaut, ou autre framework CSS. Ce fichier est généré uniquement s'il n'existe pas déjà, pour vous permettre de le personnaliser sans qu'il soit écrasé.
