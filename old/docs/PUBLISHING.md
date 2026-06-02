# Guide de Publication Zuii

Ce document décrit le nouveau workflow de build et de publication pour les packages du monorepo Zuii.
Le système repose sur **tsup** (pour le build) et **Changesets** + **GitHub Actions** (pour la publication continue).

## Sommaire
1. [Concepts de Base](#concepts-de-base)
2. [Workflow : Ajouter une Fonctionnalité et Publier](#workflow--ajouter-une-fonctionnalité-et-publier)
3. [Versions Canary (Pré-versions)](#versions-canary)
4. [Créer un Nouveau Package](#créer-un-nouveau-package)

---

## 1. Concepts de Base

- **tsup** : Chaque sous-module (ex: `packages/cookie-consent`) possède sa propre configuration `tsup.config.ts`. Cela permet de compiler le TS/SCSS en formats natifs `ESM`, `CJS` et `D.TS` sans scripts bash manuels.
- **Changesets** : Outil dédié aux monorepos. Au lieu de lire directement vos commits (comme semantic-release), il vous demande de rédiger de petits fichiers Markdown descriptifs ("changesets") qui seront lus par le CI.
- **Dossier `dist/`** : Code source (src) et code publié (dist) sont maintenant strictement séparés. NPM ne publiera **que** les fichiers de `dist/` grâce au champ `"files": ["dist"]` dans `package.json`.

---

## 2. Workflow : Ajouter une Fonctionnalité et Publier

Voici la routine normale quand vous modifiez le code d'un ou plusieurs packages :

### A. Code et Build Local
Vous modifiez le code du composant (exemple `@zuii/cookie-consent`).
Pour vérifier que votre code compile correctement, lancez à la racine :
```bash
pnpm build:packages
```

### B. Déclarer le changement (Changeset)
**Avant** de commit ou après, indiquez l'impact de vos modifications :
```bash
pnpm changeset
```
L'interface dans le terminal va vous demander :
1. Les packages qui ont été modifiés (sélectionnez avec `Espace`, validez avec `Entrée`).
2. Le niveau d'impact (patch, minor, major) selon les recommandations SemVer.
3. Un texte descriptif qui ira dans le Changelog.

Cela va créer un fichier Markdown dans le dossier `.changeset/`.

### C. Commit et Merge
Commitez vos fichiers habituels et le nouveau fichier du dossier `.changeset/`. Poussez sur votre branche et mergez sur `main`.

### D. Publication Automatique par GitHub
Dès que les changements arrivent sur `main` :
1. Une GitHub Action lit les fichiers Changesets.
2. Elle auto-génère une **Pull Request (PR)** nommée "Version Packages".
3. Cette PR contient la mise à jour des numéros de version dans les `package.json` et la mise à jour des changelogs.
4. **Action requise :** Mergez cette PR !
5. Dès que la PR "Version Packages" est mergée, GitHub publie *immédiatement* les packages concernés sur NPM ! 🎉

---

## 3. Versions Canary (Pré-versions)

Quand vous travaillez sur une branche dont le nom commence par `feat/` (ex: `feat/nouveau-bouton`) ou `next`, la GitHub Action "Canary Release" va publier automatiquement chaque commit sous forme de version de test sur NPM.

La version ressemblera à : `@zuii/core@1.1.0-canary.a1b2c3d`.
Cela permet de tester un composant Zuii en cours de dev directement dans un autre projet externe avec :
```bash
pnpm add @zuii/core@canary
```

---

## 4. Créer / Migrer un Nouveau Package

Quand vous ajoutez un nouveau composant dans `packages/`, vous devez respecter ce squelette :

**1. `package.json`**
Assurez-vous d'avoir :
```json
  "main": "./dist/[nom].cjs",
  "module": "./dist/[nom].js",
  "types": "./dist/[nom].d.ts",
  "files": [ "dist" ],
  "exports": { /* points d'entrée */ },
  "scripts": { "build": "tsup", "dev": "tsup --watch" },
```

**2. `tsup.config.ts`**
```typescript
import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig({
	entry: {
		'votre-composant': 'src/js/index.ts',
		'votre-composant-react': 'src/react/index.tsx',
	},
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	external: ['react', '@zuii/core'], // Dépendances à ne pas bundler
	esbuildPlugins: [sassPlugin({ type: 'css' })]
});
```

Si ces deux conditions sont remplies, la commande racine `pnpm build:packages` compilera automatiquement ce nouveau composant et l'inclura dans le workflow normal.
