# Plan de Projet : Refonte Calendar et Booking

## 1. Objectif Global
Séparer les logiques de calendrier et de réservation en deux packages modulaires et indépendants au sein du monorepo Zuii (`@zuii/calendar` et `@zuii/booking`).
Fournir une expérience riche (modes range, désactivation des jours passés, sélecteur d'année rapide) et une intégration très fluide et native avec des formulaires backends comme Symfony.

## 2. État Actuel
- Les packages `@zuii/calendar` et `@zuii/booking` ont été créés avec succès.
- Le calendrier prend en charge la navigation, le mode `single` et `range`, avec des options comme `disablePast` pour bloquer la sélection passée.
- Le booking a été entièrement refondu pour gérer la sélection de créneaux (horaires ou textuels) avec un état visuel "vide" esthétique.
- La compatibilité formulaire a été assurée : le Booking génère silencieusement des balises `<input type="hidden">` avec une notation tableau HTML (`name="mon_champ[date]"`) pour envoyer des objets de données natifs idéaux pour Symfony FormBuilder.
- Tout est testé, buildé (`pnpm build` valide pour le CJS, ESM et les minifiés) et documenté dans la `ROADMAP.md`.

## 3. Décisions d'Architecture
- **Modularité stricte** : Découpage clair et séparation totale en deux packages npm indépendants.
- **Dom/HTML Forms** : Le composant Booking produit des inputs cachés sérialisés (`[date]` et `[slot]`), permettant d'envoyer un dictionnaire ou objet côté back-end de manière transparente.
- **Styles BEM** : Isolement complet des styles pour `.calendar__*` et `.booking__*`. Les thèmes utilisent intensivement les variables CSS (`color-mix`).
- **Framework Agnostique + React** : Cœur en Vanilla JS/TS avec wrappers React (`.tsx`) fournis pour simplifier l'utilisation dans des projets React. Options multilingues nativement (`fr`/`en`).

## 4. Journal des Tâches
- [x] Brainstorming et Conception
	- [x] Définir les props et les fonctionnalités
	- [x] Proposer une structure de composants et une lib
	- [x] Obtenir la validation de l'utilisateur
- [x] Création des packages 
	- [x] Créer et configurer `@zuii/calendar` 
	- [x] Créer et configurer `@zuii/booking` 
	- [x] Intégrer `initSelect` pour l'année dans Calendar 
- [x] Migration et Nettoyage 
- [x] Vérification et Playground 
- [x] Documentation et Archivage

## 5. Prochaines Étapes / Résumé pour mon successeur

**Handoff / Résumé pour mon successeur :** 
Salut ! Le travail de séparation et d'évolution de `@zuii/calendar` et `@zuii/booking` est terminé et stable. Ces deux nouveaux packages valident leurs étapes respectives dans la roadmap (Phase 3 achevée) et sont prêts pour la production. L'architecture a été conçue pour pouvoir utiliser un Calendrier de manière complètement isolée, ou bien reliée de manière synchronisée à une balise Booking.

**Actions Futures potentielles pour la prochaine session :**
- Poursuivre la `ROADMAP.md` (Composants de Layout, Storybook, Tests, etc.).
- Surveiller/Gérer les retours éventuels sur des comportements spécifiques liés à des dates (ex : chevauchements de jours inactifs) lors de l'intégration dans les projets clients externes (ex: `mow-dev/react`).
