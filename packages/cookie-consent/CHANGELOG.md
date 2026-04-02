# @zuii/cookie-consent

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
