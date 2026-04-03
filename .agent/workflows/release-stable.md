---
description: Promouvoir un ou plusieurs packages de beta (0.x.x-beta.x) vers une version stable (latest) sur NPM.
---

# Workflow : Release Stable (`/release-stable`)

Ce workflow guide la promotion d'un package `@zuii` depuis une version beta vers une version stable publiée sous le tag `latest` sur NPM.

## Étape 1 : Identifier les packages à promouvoir

Demander à l'utilisateur quel(s) package(s) il souhaite promouvoir en stable.
Afficher les versions beta actuelles de chaque package concerné :

```bash
cat packages/<nom>/package.json | grep '"version"'
```

## Étape 2 : Définir la nouvelle version stable

Demander à l'utilisateur la version stable cible.

Conventions recommandées :
- `0.1.0-beta.x` → `1.0.0` si le package est prêt pour une v1
- `0.1.0-beta.x` → `0.1.0` si l'on veut rester en minor bas

Mettre à jour le `package.json` du package concerné manuellement (édition du fichier).

## Étape 3 : Build du package

Builder le package avant publication :

```bash
pnpm --filter "@zuii/<nom-du-package>" run build
```

> [!CAUTION]
> Ne pas continuer si le build échoue.

## Étape 4 : Validation Git

Rappeler à l'utilisateur de committer et pusher les changements :

```bash
git add packages/<nom>/package.json CHANGELOG.md
git commit -m "release: @zuii/<nom> v<version>"
git push
```

// turbo
## Étape 5 : Vérifier la connexion NPM

```bash
npm whoami
```

## Étape 6 : Publier sous le tag `latest`

```bash
pnpm --filter "@zuii/<nom-du-package>" publish --tag latest --no-git-checks
```

> [!NOTE]
> `--no-git-checks` permet de publier sans que pnpm vérifie que le worktree est propre.

## Étape 7 : Vérifier la publication

```bash
npm view @zuii/<nom-du-package> dist-tags
```

Le résultat attendu doit montrer `latest` pointant vers la nouvelle version stable.

// turbo
## Étape 8 : Confirmation finale

Afficher un résumé :
- Package promu
- Version publiée
- Tag NPM : `latest`
