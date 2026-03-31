# Plan : Amélioration de la Publication zuii - 2026-03-30

## Objectif Global
Moderniser le processus de build et de publication du monorepo `zuii` pour supporter des sous-modules indépendants, des versions Canary et une documentation automatisée.

## État Actuel
- **Monorepo** : Structure `packages/` en place avec pnpm workspaces.
- **Packages installés** : `@zuii/core`, `@zuii/cookie-consent`.
- **Publication actuelle** : Basée sur des scripts `postbuild` manuels et `semantic-release`.
- **Build** : Utilise Vite à la racine du projet.

## Décisions d'Architecture
- **Standardisation avec tsup** : Utiliser `tsup` pour chaque sous-module afin de générer proprement les formats ESM/CJS et les types `.d.ts`.
- **Migration vers Changesets** : Remplacer `semantic-release` par `Changesets` pour une meilleure gestion du versioning granulaire.
- **Canary Releases** : Automatiser les publications de test sur chaque commit via GitHub Actions.
- **Exports Subpaths** : Offrir des points d'entrée clairs (`/react`, `/styles`, etc.) dans les `package.json`.

## Journal des Tâches
- [x] **Étape 1 : Build avec tsup (PoC)**
    - [x] Installer `tsup` dans le workspace.
    - [x] Configurer `tsup.config.ts` pour `cookie-consent` (avec plugin SCSS).
    - [x] Mettre à jour `package.json` (scripts, exports vers `dist/`, champ `files`).
- [x] **Étape 2 : Configuration Changesets**
    - [x] Installer `@changesets/cli`.
    - [x] Initialiser et configurer `.changeset/config.json` (`access: public`).
- [x] **Étape 3 : Automatisation CI/CD**
    - [x] Créer `.github/workflows/release.yml` (PR versioning + publish sur NPM).
    - [x] Créer `.github/workflows/canary.yml` (publish sur branches `feat/**`).
    - [x] Ajouter script `build:packages` à la racine.
- [ ] **Étape 4 : Previews & Canary**
    - [ ] Configurer les versions Canary.
    - [ ] Initialiser Storybook pour la documentation.

## Prochaines Étapes (Handoff)
- Commencer l'implémentation technique de l'Étape 1.
- Valider le build de `@zuii/cookie-consent` avant de généraliser aux autres composants.

---
**Résumé pour mon successeur** : Le plan a été validé par l'utilisateur pour une exécution par étapes. Nous passons d'un build monolithique à un build modulaire par package utilisant `tsup`.
