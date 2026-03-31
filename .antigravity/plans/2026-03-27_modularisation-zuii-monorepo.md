# Plan : Modularisation de zuii (Monorepo) - 2026-03-27

## Objectif Global
Transformer la bibliothèque monolithique `zuii` en un monorepo pnpm capable de publier des composants individuels (ex: `@zuii/cookie-consent`) tout en conservant un package global `zuii` (agrégateur).

## État Actuel
- **Espaces de travail pnpm** activés (`pnpm-workspace.yaml`).
- **Structure de dossiers** : Création de `packages/`.
- **Packages migrés** : 
    - `@zuii/core` (Styles et tokens partagés).
    - `@zuii/cookie-consent` (Logique et style du composant).
- **Publication** : `@zuii/cookie-consent` (v1.0.1) est publié sur NPM. `@zuii/core` a été préparé (privé retiré) mais attend sa première publication.
- **Build system** : Vite est configuré pour bundler les dépendances internes dans le package global `zuii` pour éviter les erreurs d'installation locale.
- **Imports** : Les imports de `src/index.ts` ont été migrés vers les packages du workspace.

## Décisions d'Architecture
- **Monorepo pnpm** : Choisi pour la gestion fine des dépendances et la facilité de publication multiple.
- **Bundling sélectif** : Les packages `@zuii/*` sont considérés comme des `devDependencies` au niveau de la racine pour être inclus dans le bundle `zuii` global lors du build, évitant ainsi des erreurs de résolution `workspace:*` pour les consommateurs externes.
- **Support Sub-paths** : Possibilité d'importer via `zuii/cookie-consent/react` ou le package autonome `@zuii/cookie-consent`.

## Journal des Tâches
- [x] Initialisation du Workspace pnpm.
- [x] Migration de `core` vers `packages/core`.
- [x] Migration de `Cookie-Consent` vers `packages/cookie-consent`.
- [x] Correction des alias SCSS (`@core`) et des chemins relatifs cassés.
- [x] Publication du premier composant sur NPM.
- [ ] Migration des autres composants de `src/components/` vers `packages/`.
- [ ] Automatisation de la publication avec des outils comme `changesets`.

## Prochaines Étapes (Handoff)
- **Migration en cours** : Continuer à extraire les composants de `src/components/` vers `packages/` un par un.
- **Publication** : S'assurer que `@zuii/core` est publié en premier car il est une dépendance critique des autres composants.
- **CI/CD** : Configurer une action GitHub pour gérer les versions et les publications automatiques.

---
**Résumé pour mon successeur** : Le socle monorepo est prêt et validé par la publication de `cookie-consent`. Le prochain travail consiste à industrialiser la migration des 30+ composants restants. Le build racine est configuré pour tout regrouper dans `dist/` afin de ne pas casser l'usage actuel de `pnpm add zuii`.
