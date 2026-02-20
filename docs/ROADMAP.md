# 🗺️ Roadmap - zuii

Ce document détaille la vision à long terme et les étapes de développement de **zuii**.

## 🎯 Vision
Proposer l'écosystème UI le plus léger et modulaire du marché, sans compromis sur l'accessibilité ou l'expérience développeur.

---

## 🏗️ État actuel : Phase 1 (en cours)

### 🟢 Phase 1 : Fondations
L'objectif est de poser des bases solides pour la librairie.
- [x] Configuration initiale du projet (Vite, TypeScript, pnpm).
- [x] Architecture de fichiers modulaire (CSS Layers).
- [x] Licence MIT.
- [x] **Design Tokens** : Couleurs, Typographie, Espacement (via Style Dictionary).
- [x] **Gestion automatique du contraste** (A11y).
- [ ] **Base Components** :
  - [x] `Button`
  - [x] `Icon`
  - [x] `Group`
  - [x] `Avatar`
  - [x] `Color`
  - [x] `Badge`
  - [x] `Logo`
  - [x] `Divider`
  - [x] `Context-menu`
  - [x] `Placeholder`
  - [x] **Unification des styles de menu** (Dropdown, Context-menu, Select)
  - [x] `Lang-selector` (Choices.js)
  - [x] `FloatingLabel` (Option Form)
  - [x] `Multi-select` (avec Choices.js)
  - [x] `TelInput` (avec intl-tel-input)
  - [x] `Dropdown` (React Bootstrap)
  - [x] `Radius`
  - [x] `Accordion` (React Bootstrap)
  - [x] `Tabs` (React Bootstrap)
  - [x] `FileInput` (Uppy)
  - [x] `Input`
  - [x] `Checkbox`
  - [x] `Radio`

### 🟡 Phase 2 : Structure & Layout
- [ ] **Grid System** : Utilitaires Flexbox et Grid (CSS Layers).
- [ ] **Layout Components** : `Container`, `Stack`, `Box`, `Dashboard`.
- [x] **Navigation** : `Nav`, `Tabs`, `Breadcrumbs`.

### 🔵 Phase 3 : Composants Avancés
- [x] **Overlays** : `Modal`, `Popover`, `Tooltip`.
- [x] **Feedback** : `Alert` (Support JS/TS & injection composants React), `Toast`, `Spinner`.
- [x] **Data Display** : `Table` (Ag-Grid : Tri, Filtrage, Sélection, Pagination personnalisée avec `Select`), `Badge`, `Card`.

### 🟣 Phase 4 : Écosystème & Qualité
- [ ] **Documentation** : Storybook complet avec exemples interactifs.
- [x] **Framework Integration** : Support initial de **React**.
- [ ] **Testing** : 100% de couverture sur les composants critiques.
- [ ] **Accessibilité** : Audit WCAG 2.1 complet.
- [ ] **Thématisation** : Support natif du Mode Sombre via Design Tokens.

---

## 📈 Évolutions futures
- [ ] Support d'autres frameworks (Vue, Svelte).
- [ ] Générateur de thèmes en ligne.
- [ ] Librairie d'icônes dédiée.
- [ ] CLI zuii pour l'initialisation.
