# Archivage du Plan : Modernisation du Package @zuii/cookie-consent (2026-03-30)

## Objectif Global
Moderniser l'architecture de build et de publication du monorepo `zuii` en commençant par le package `@zuii/cookie-consent`. L'objectif est d'avoir un processus modulaire, performant (minification) et automatisé (Changesets + GitHub Actions).

## État Actuel
- **Build Modulaire Opérationnel** :
  - Séparation complète JS Vanilla (`dist/`), React (`dist/react/`) et CSS (`dist/style/`).
  - Support de la minification native pour tous les formats.
  - Résolution des warnings Sass (import déprécié).
  - Loader `empty` pour SCSS dans `tsup` permettant le support du mode de développement Vite sans polluer les bundles.
- **Fonctionnalités Cookie Consent** :
  - Support complet de GTM (catégorie `analytics` + callbacks `onConsent`/`onChange`).
  - Cookies obligatoires configurés et dépliés par défaut dans le centre de préférences.
  - Footer avec liens légaux fonctionnels.
- **Publication** : `Changesets` initialisé et documenté dans `docs/PUBLISHING.md`.

## Décisions d'Architecture
- **tsup** : Utilisé pour les builds multi-passes (standard + minifié + react).
- **Sass CLI** : Utilisé pour le build CSS indépendant, garantissant que `clean: true` de tsup ne supprime pas les styles.
- **Workspaces pnpm** : Gestion des dépendances locales via `workspace:*`.
- **Interopérabilité** : Maintenance d'un export dans `src/index.ts` pour la compatibilité avec l'ancien système de templates.

## Journal des Tâches
- [x] Migration de `cookie-consent` vers `packages/`
- [x] Configuration `tsup` multi-passes
- [x] Séparation des dossiers `dist/` par type de ressource
- [x] Initialisation de `Changesets`
- [x] Création des GitHub Actions de release
- [x] Ajout des callbacks de tracking (onConsent/onChange)
- [x] Ajout du support GTM et cookies obligatoires
- [x] Documentation du processus de publication

## Prochaines Étapes (Handoff)
- [ ] **Migration Globale** : Appliquer ce pattern de build (`tsup` + `sass` + dossiers `dist` séparés) aux autres composants du dossier `src/components/`.
- [ ] **Storybook** : Initialiser Storybook à la racine pour documenter visuellement chaque nouveau package.
- [ ] **Versions Canary** : Configurer la publication automatique des versions `@canary` lors des PRs sur les branches `feat/**`.

---
### Résumé pour mon successeur
Le package `@zuii/cookie-consent` sert de référence technique (PoC). Tout nouveau package doit suivre sa structure de `package.json` et `tsup.config.ts`. L'import SCSS dans le code source JS est conservé pour le confort du développement avec Vite, mais il est ignoré par `tsup` (loader `empty`) pour les builds de production.
