# Convention des Commits (Semantic Release)

Ce projet utilise la convention **Angular** pour automatiser les versions avec `semantic-release`.

## 🚀 Préfixes déclenchant une version

Ces préfixes analysent tes commits pour décider s'il faut publier une nouvelle version :

| Préfixe | Type de version | Exemple |
| :--- | :--- | :--- |
| `feat` | **Minor** (ex: 1.1.0) | `feat: ajout du composant Modal` |
| `fix` | **Patch** (ex: 1.0.1) | `fix: correction du bug sur le bouton` |
| `perf` | **Patch** (ex: 1.0.1) | `perf: optimisation du rendu CSS` |

## 🛠️ Préfixes sans déclenchement de version

Par défaut, ces types ne déclenchent **pas** de nouvelle version :

- **`docs`** : Changements uniquement dans la documentation.
- **`style`** : Changements de style de code (formatage, etc.) sans modifier la logique.
- **`refactor`** : Modification du code sans ajout de fonctionnalité ni correction.
- **`test`** : Ajout ou correction de tests.
- **`build`** : Changements du système de build ou dépendances.
- **`ci`** : Changements dans les fichiers de configuration CI.
- **`chore`** : Tâches diverses (maintenance, etc.).
- **`revert`** : Annulation d'un commit précédent.

## ⚠️ Breaking Changes (Versions Majeures)

Pour déclencher une version **Major** (ex: 2.0.0), tu as deux options :

1. **Le point d'exclamation** : Ajouter un `!` après le type .
   - Exemple : `feat!: changement majeur de l'API`
2. **Le footer** : Ajouter `BREAKING CHANGE:` au début du pied de page du commit.

