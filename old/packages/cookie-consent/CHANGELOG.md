# @zuii/cookie-consent

## 0.3.0-beta.0

### Minor Changes

- dc26283: Modernisation de l'architecture i18n (getDocLang), ajout du support de l'allemand et de l'espagnol, et ajout de l'option disabledLangs.

### Patch Changes

- Updated dependencies
- Updated dependencies [dc26283]
  - @zuii/core@0.2.0

## 0.3.0-beta.0-beta.1

### Minor Changes

- Modernisation de l'architecture i18n (getDocLang), ajout du support de l'allemand et de l'espagnol, et ajout de l'option disabledLangs.

### Patch Changes

- Updated dependencies
  - @zuii/core@0.2.0-beta.1

## 0.1.1-beta.0

### Patch Changes

- Release beta updates
- Updated dependencies
  - @zuii/core@0.1.1-beta.0

## 0.1.0

### Patch Changes

- Correction des dépendances : transfert de @zuii/core, choice.js, et bootstrap vers "dependencies" classiques, et désignation de React comme "optional" dans peerDependenciesMeta pour une installation sans heurts en Vanilla JS.
- Updated dependencies
  - @zuii/core@0.1.0

## 2.0.0

### Patch Changes

- Updated dependencies [27c2495]
  - @zuii/core@1.2.0

## 1.2.0

### Minor Changes

- Ajout du paramètre `enabledCategories` à `initCookieConsent` pour permettre le filtrage des catégories de cookies et des sections de traduction.

## 1.1.2

### Patch Changes

- Amélioration de la spécificité des sélecteurs CSS via le préfixe `#cc-main`.

## 1.1.1

### Patch Changes

- Mise à jour des styles du composant Cookie Consent.

## 1.1.0

### Minor Changes

- Modernisation complète du module Cookie Consent :
  - Modularisation des traductions (FR/EN) dans des fichiers séparés.
  - Synchronisation automatique de la langue avec le composant `Lang-selector`.
  - Nouveau thème "Dark Turquoise" aligné sur les design tokens de Zuii.
  - Ajout des catégories de cookies : `functionality` et `marketing`.
  - Exportation de l'API `CookieConsent` sur `window` pour un pilotage global.

## 1.0.2

### Patch Changes

- Standardisation du build avec tsup (ESM/CJS/types) et préparation de la configuration de publication.
