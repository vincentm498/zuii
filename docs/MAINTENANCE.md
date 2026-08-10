# Maintenance du Dépôt

Ce document explique comment maintenir la qualité et la sécurité du dépôt `zuii`, notamment via la protection de la branche principale.

## 🛡️ Protection de la branche `main`

La branche `main` est critique car elle déclenche automatiquement la publication sur NPM. Il est impératif de la protéger contre les push direct.

## 🚀 Workflow de Release

1.  Travaillez sur la branche `dev`.
2.  Utilisez les [Conventions de Commits](./docs.md) (`fix:`, `feat:`, etc.).
3.  Créez une Pull Request de `dev` vers `main`.
4.  Une fois la PR mergée, GitHub Actions :
    *   Lance le build et les tests.
    *   Génère le tag de version.
    *   Met à jour le `CHANGELOG.md`.
    *   **Publie automatiquement sur NPM**.

## 🧹 Maintenance Locale

### Nettoyage des builds
```bash
# Supprimer le dossier dist.
rm -rf dist
```

### Vérification du build
Avant de pousser sur `dev`, vérifiez toujours que le build passe localement:
```bash
pnpm install
pnpm build
```
