## [1.3.3](https://github.com/vincentm498/zuii/compare/v1.3.2...v1.3.3) (2026-02-03)


### Bug Fixes

* déplace apca-w3 vers devDependencies et ajoute publishConfig pour résoudre l'échec de publication npm ([7851a47](https://github.com/vincentm498/zuii/commit/7851a4761dd43f65fa0d6965859140e16a3fc19a))

## [1.3.2](https://github.com/vincentm498/zuii/compare/v1.3.1...v1.3.2) (2026-02-03)


### Bug Fixes

* mise à jour des dépendances pnpm. ([f1588ec](https://github.com/vincentm498/zuii/commit/f1588ecdb09ff10550aa0bda5a6bd48ed9af186d))

## [1.3.1](https://github.com/vincentm498/zuii/compare/v1.3.0...v1.3.1) (2026-02-03)


### Bug Fixes

* ajoute une étape pour mettre à jour pnpm-lock.yaml dans le workflow de release. ([b7c0a26](https://github.com/vincentm498/zuii/commit/b7c0a2691b06a0cd794447a717e5cf8e2a89432e))

# [1.3.0](https://github.com/vincentm498/zuii/compare/v1.2.8...v1.3.0) (2026-02-03)


### Features

* corrige la ponctuation dans le README. ([395d222](https://github.com/vincentm498/zuii/commit/395d222777f0057d33a0454807fc5e9abb616328))

## [1.2.8](https://github.com/vincentm498/zuii/compare/v1.2.7...v1.2.8) (2026-02-03)


### Bug Fixes

* ajoute les composants Divider et ContextMenu avec leurs styles et templates. ([82a7e17](https://github.com/vincentm498/zuii/commit/82a7e1799e3eb331d6efd43cca029d9edee798a0))
* Renomme la variable d'environnement `GITHUB_TOKEN` en `GH_TOKEN` dans le workflow de release. ([9382108](https://github.com/vincentm498/zuii/commit/9382108f9e74f5b0dc7b58952e9a1aa20d0065dd))

## [1.2.7](https://github.com/vincentm498/zuii/compare/v1.2.6...v1.2.7) (2026-01-30)


### Bug Fixes

* Ajouter les définitions d'exports pour les modules du package. ([429a665](https://github.com/vincentm498/zuii/commit/429a665d9dbd69a54db290b6b622e56d979f8a73))

## [1.2.6](https://github.com/vincentm498/zuii/compare/v1.2.5...v1.2.6) (2026-01-30)


### Bug Fixes

* Mettre à jour la génération et l'importation des tokens, ajouter des alias de chemin TypeScript, améliorer la configuration de build Vite et inclure une couche CSS `utilities`. ([c0cacab](https://github.com/vincentm498/zuii/commit/c0cacabc7c97d9dbc490b23099cb1a95c1dadb86))

## [1.2.5](https://github.com/vincentm498/zuii/compare/v1.2.4...v1.2.5) (2026-01-30)


### Bug Fixes

* restructure les styles des composants Button et Icon en utilisant `index.scss` et `[@layer](https://github.com/layer) components`. ([bc545ad](https://github.com/vincentm498/zuii/commit/bc545ad8d16c91a1ba8b655688c264d843c83464))

## [1.2.4](https://github.com/vincentm498/zuii/compare/v1.2.3...v1.2.4) (2026-01-30)


### Bug Fixes

* ajouter la dépendance `sass-embedded` ([53eb742](https://github.com/vincentm498/zuii/commit/53eb742c76b0b72351aae8dd97cf954038d0496e))

## [1.2.3](https://github.com/vincentm498/zuii/compare/v1.2.2...v1.2.3) (2026-01-30)


### Bug Fixes

* générer le fichier `main.scss` avec Bootstrap et externaliser dynamiquement les dépendances dans la configuration Vite. ([5f967e7](https://github.com/vincentm498/zuii/commit/5f967e774032b07f5694665a4227f6d4f2ce4c51))

## [1.2.2](https://github.com/vincentm498/zuii/compare/v1.2.1...v1.2.2) (2026-01-30)


### Bug Fixes

* Ajout de `pnpm-lock.yaml` aux assets de release et réinitialisation de la version du `package.json`. ([66c6b41](https://github.com/vincentm498/zuii/commit/66c6b4143bac702a22aef2354f45d7c2e36e79ae))
* Reclasse et met à jour les dépendances du projet et le fichier pnpm-lock. ([b2407ec](https://github.com/vincentm498/zuii/commit/b2407ecde28728b7c47242a367b20d31a39accae))

## [1.2.1](https://github.com/vincentm498/zuii/compare/v1.2.0...v1.2.1) (2026-01-30)


### Bug Fixes

* Met à jour les scripts de build pour créer le répertoire de destination, utilise pnpm pour la prépublication et ajoute la génération des tokens au workflow de CI. ([5bd0467](https://github.com/vincentm498/zuii/commit/5bd04673724f9c138cdacc206886b9a3088d65d4))

# [1.2.0](https://github.com/vincentm498/zuii/compare/v1.1.0...v1.2.0) (2026-01-29)


### Features

* Ajout du composant Icon et refonte complète du composant Button avec un nouveau système de tokens Sass pour la gestion des styles. ([f7d4ff4](https://github.com/vincentm498/zuii/commit/f7d4ff4f89aee98a8eb51d9463c3193edf845b93))

# [1.1.0](https://github.com/vincentm498/zuii/compare/v1.0.0...v1.1.0) (2026-01-29)


### Features

* Ajout du composant Button React, configuration de Vite et des styles de base pour la bibliothèque UI. ([d39d9c6](https://github.com/vincentm498/zuii/commit/d39d9c6a4d2e861d843c90747563d19e3db9376c))

# 1.0.0 (2026-01-29)


### Features

* Initialisation du projet avec les fichiers de licence, README, feuille de route et package.json. ([1026055](https://github.com/vincentm498/zuii/commit/102605573f49dbaaea141ea343e5af68a523b532))
* Met en place la publication automatique avec semantic-release via GitHub Actions et les fichiers de configuration associés. ([66eb251](https://github.com/vincentm498/zuii/commit/66eb251cbce7237a5a06cd03e8139dd12220e745))
