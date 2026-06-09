# Design — Form Input Adornments (icône/texte gauche et droite)

## Contexte

Le composant `Form.Control` (`src/components/Form/react/index.tsx`) supporte déjà un prop `icon` qui affiche une icône à gauche via `<Icon name={icon} size="sm" />`. L'objectif est d'ajouter la possibilité de placer également une icône ou du texte à droite, et du texte à gauche, sans casser l'API existante.

## API

Ajout de 3 props optionnels dans `FormControlProps` :

| Prop | Type | Position | Nature |
|------|------|----------|--------|
| `icon` | `string` | gauche | icône (existant) |
| `iconRight` | `string` | droite | icône (nouveau) |
| `textLeft` | `string` | gauche | texte (nouveau) |
| `textRight` | `string` | droite | texte (nouveau) |

Exemples d'usage :

```tsx
<Form.Control icon="icon-user" />                          // existant, inchangé
<Form.Control icon="icon-user" iconRight="icon-eye" />     // icône des deux côtés
<Form.Control textLeft="@" />                              // texte à gauche
<Form.Control textRight="€" />                             // texte à droite
<Form.Control icon="icon-user" textRight="kg" />           // icône gauche + texte droite
```

## Structure HTML rendue

```html
<div class="form__input">
  <!-- textLeft si présent -->
  <span class="form__input-adornment">@</span>
  <!-- icon si présent -->
  <Icon name="icon-user" size="sm" />
  <!-- input Bootstrap -->
  <input class="form-control" ... />
  <!-- iconRight si présent -->
  <Icon name="icon-eye" size="sm" />
  <!-- textRight si présent -->
  <span class="form__input-adornment">€</span>
</div>
```

Ordre gauche → droite : `textLeft` → `icon` → `<input>` → `iconRight` → `textRight`.

Le `gap: var(--spacing-xs)` existant sur `.form__input` sépare automatiquement tous les éléments. L'input reçoit `flex: 1` implicitement via la règle Bootstrap existante pour remplir l'espace disponible.

Le même rendu s'applique au cas `floating` (FloatingLabel).

## SCSS

Nouveau sélecteur dans `src/components/Form/style/form.scss` :

```scss
.form__input-adornment {
  color: var(--form-placeholder-color);
  font-size: var(--text-sm);
  white-space: nowrap;
  user-select: none;
}
```

Cohérence visuelle avec les icônes existantes (même couleur, pas de sélection, pas de retour à la ligne).

Le sélecteur disabled existant couvre déjà `.icon` ; il faudra y ajouter `.form__input-adornment` :

```scss
.form__input:has(.form-control:disabled) {
  .form-control,
  .form-control::placeholder,
  .icon,
  .form__input-adornment {   // ajout
    color: var(--form-placeholder-color);
  }
}
```

## Fichiers modifiés

- `src/components/Form/react/index.tsx` — interface `FormControlProps` + JSX du composant `FormControl`
- `src/components/Form/style/form.scss` — nouveau sélecteur + mise à jour du sélecteur disabled

## Aucun fichier de test ni doc supplémentaire

La démo existante dans `src/templates/Forms/Forms-elements.tsx` sera mise à jour avec des exemples des nouveaux props.
