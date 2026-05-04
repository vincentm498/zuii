# @zuii/calendar

## 0.4.0-beta.1

### Minor Changes

- Les jours du calendrier ne sont désormais sélectionnables que s'ils possèdent des créneaux actifs. Mise à jour de l'interface d'availability pour supporter des objets avec un état actif.

## 0.3.0-beta.0

### Minor Changes

- 6adfc92: Ajout des options de configuration `yearRange` et `disablePast` au Calendar. Prise en charge de ces paramètres directement via l'état du Booking. Correction de l'affichage global des jours désactivés.
- dc26283: Modernisation de l'architecture i18n (getDocLang), ajout du support de l'allemand et de l'espagnol, et ajout de l'option disabledLangs.

### Patch Changes

- Correction de la navigation des flèches dans le Calendar pour respecter les limites définies (ex: `yearRange`). Les flèches sont désormais correctement désactivées lorsqu'on atteint la limite.
- Updated dependencies
- Updated dependencies [dc26283]
  - @zuii/core@0.2.0

## 0.2.0-beta.2

### Minor Changes

- Modernisation de l'architecture i18n (getDocLang), ajout du support de l'allemand et de l'espagnol, et ajout de l'option disabledLangs.

### Patch Changes

- Updated dependencies
  - @zuii/core@0.2.0-beta.1

## 0.2.0-beta.1

### Minor Changes

- Ajout des options de configuration `yearRange` et `disablePast` au Calendar. Prise en charge de ces paramètres directement via l'état du Booking. Correction de l'affichage global des jours désactivés.

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

## 1.0.0

### Patch Changes

- 27c2495: feat(form): centralisation des styles form dans core et intégration complète dans booking (BEM, classes dynamiques)
- Updated dependencies [27c2495]
  - @zuii/core@1.2.0

## 0.1.1

### Patch Changes

- Ajout du support Symfony (Stimulus), intégration d'une modale de confirmation personnalisable dans le composant Booking et consolidation des exports pour une utilisation Vanilla JS via NPM.
