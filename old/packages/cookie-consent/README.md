# @zuii/cookie-consent

Composant de gestion du consentement des cookies pour la bibliothèque Zuii, propulsé par [vanilla-cookieconsent](https://github.com/orestbida/cookieconsent). Il est conçu pour être facile à intégrer dans des applications Vanilla JS ou React.

## 📦 Installation

```bash
# Avec pnpm
pnpm add @zuii/cookie-consent

# Avec npm
npm install @zuii/cookie-consent
```

## 🚀 Utilisation avec React

Vous pouvez importer directement le composant React et le style CSS dédié. Le composant React gère automatiquement son cycle de vie.

```tsx
import React from 'react';
import { CookieConsent } from '@zuii/cookie-consent/react';
// Important : importez le style pour que le modal s'affiche correctement
import '@zuii/cookie-consent/style';

function App() {
  return (
    <div>
      <h1>Mon Application</h1>
      
      {/* Montez le composant (généralement à la racine de l'application) */}
      <CookieConsent className="mon-theme-personnalise" />
    </div>
  );
}

export default App;
```

## 🛠 Utilisation Vanilla JS (Sans Framework)

Si vous n'utilisez pas React, importez directement la logique core qui initialise le consentement.

```javascript
// Import du script d'initialisation
import { initCookieConsent } from '@zuii/cookie-consent';

// Import de la feuille de style
import '@zuii/cookie-consent/style';

// Initialise le widget sur la page
initCookieConsent();
```

## 🎨 Styles & SASS Customization

Le fichier CSS compilé est récupérable via l'export `"@zuii/cookie-consent/style"`.

Cependant, comme Zuii est pensé de manière modulaire, le package contient également le code source SCSS originel si vous souhaitez personnaliser les variables :

```scss
// Dans votre fichier SCSS principal (ex: style.scss)
@use "~@zuii/cookie-consent/src/style/index" as cookie-consent;

// Redéfinissez les variables globales du thème zuii ou du cookie-consent avant
```

> **Note** : Les styles dépendent des tokens de `@zuii/core` (définis en tant que `peerDependencies`).

## ⚙️ Configuration Avancée

Sous le capot, `@zuii/cookie-consent` est un wrapper de `vanilla-cookieconsent`.
En Vanilla JS, la fonction `initCookieConsent(...)` accepte potentiellement des paramètres ou modificateurs de classes (comme `extraClasses`) selon la signature du composant interne.
Pour React, des `props` supplémentaires (ex: `className`) peuvent être passées au wrapper `<CookieConsent />`.
