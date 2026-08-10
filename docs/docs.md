# Versioning et publication

## 📦 Package racine `zuii`

Le package racine (`zuii` sur npm) est versionné automatiquement à chaque commit poussé sur `main` :

- Le **patch** est incrémenté de +1. Exemple : `1.7.0` → `1.7.1`.
- Ça se fait quel que soit le contenu du commit (pas de convention de préfixe à respecter).
- Le workflow GitHub Actions correspondant (`.github/workflows/root-version-bump.yml`) commit le bump et publie automatiquement sur npm.

Aucune action manuelle n'est nécessaire pour ce package.

## 🧩 Packages `@zuii/*` (booking, calendar, core, cookie-consent, ...)

Ces packages sont gérés séparément via **Changesets**, car ils ne changent pas à chaque commit et n'ont pas besoin d'être republiés systématiquement.

Pour qu'un de ces packages soit versionné et publié, il faut ajouter un changeset dans la PR qui le modifie :

```bash
pnpm changeset
```

Cette commande demande interactivement :
- quels packages sont impactés,
- quel type de bump (`patch` / `minor` / `major`),
- un résumé du changement.

Elle génère un fichier dans `.changeset/` à committer avec le reste de la PR. Sans ce fichier, la CI ne publie rien pour ces packages.

## 🚀 Résumé

| Package | Déclenchement | Action requise |
| :--- | :--- | :--- |
| `zuii` (racine) | Chaque commit sur `main` | Aucune |
| `@zuii/*` | Changeset présent dans la PR | `pnpm changeset` avant de merger |
