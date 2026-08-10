# Errorpage

Composant de page d'erreur avec code d'erreur personnalisable et support i18n via un objet de textes.

---

## Import

```tsx
import { Errorpage } from 'zuii';
```

---

## Usage de base

```tsx
<Errorpage />
```

Affiche une page d'erreur 404 avec les textes par défaut en français.

---

## Props

| Prop    | Type              | Défaut | Description                                 |
| :------ | :---------------- | :----- | :------------------------------------------ |
| `code`  | `number \| string` | `404`  | Code d'erreur affiché dans le titre         |
| `texts` | `ErrorpageTexts`  | —      | Objet de textes pour surcharger les défauts |

### `ErrorpageTexts`

Toutes les clés sont optionnelles. Les valeurs non fournies tombent sur les défauts français.

| Clé          | Défaut                                                                    | Description              |
| :----------- | :------------------------------------------------------------------------ | :----------------------- |
| `errorLabel` | `"Erreur"`                                                                | Libellé avant le code    |
| `title`      | `"Oups ! Page non trouvée"`                                               | Titre principal (h2)     |
| `message`    | `"La page que vous recherchez semble avoir disparu dans le néant numérique."` | Message descriptif       |
| `backButton` | `"Retour à l'accueil"`                                                    | Texte du bouton de retour |

---

## Exemples

### Français (défaut)

```tsx
<Errorpage code={404} />
```

### Anglais

```tsx
<Errorpage
  code={404}
  texts={{
    errorLabel: "Error",
    title: "Oops! Page not found",
    message: "The page you are looking for seems to have vanished into the digital void.",
    backButton: "Back to home",
  }}
/>
```

### Code d'erreur personnalisé

```tsx
<Errorpage code={500} texts={{ title: "Erreur serveur" }} />
```

---

## Comportement

- Le bouton **Retour** navigue vers `/` via `react-router-dom`.
- Le composant est autonome et ne nécessite aucun contexte particulier en dehors d'un `Router`.
