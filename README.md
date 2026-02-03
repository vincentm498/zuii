# zuii

> Une boîte à outils UI légère, intuitive et modulaire pour les interfaces web modernes.

[![npm version](https://img.shields.io/npm/v/zuii.svg)](https://www.npmjs.com/package/zuii)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**zuii** (prononcé /zwi/) a été conçu pour être le lien minimaliste entre votre logique métier et votre interface utilisateur. Cette librairie propose des composants hautement composables avec une priorité absolue sur la performance, l'accessibilité et une empreinte numérique réduite.

---

## ✨ Points forts

* **⚡ Ultra-léger :** Zéro dépendance inutile, uniquement l'essentiel.
* **🧩 Design Atomique :** Pensé pour une composition fluide et logique.
* **🎨 Personnalisable :** Thémage simplifié via les variables CSS (Design Tokens).
* **♿ Accessible :** Conforme aux standards WAI-ARIA pour une inclusion maximale .

## 🚀 Installation

### JavaScript (npm)
```bash
npm install zuii
```

---

## 🎨 Gestion des Styles (CSS Layers)

**zuii** utilise les [CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto/Cascade_layers) pour vous donner un contrôle total sur la priorité des styles et faciliter la personnalisation sans conflits.

> [!IMPORTANT]
> L'import de votre fichier de styles principal (ex: `import './styles/main.scss'`) doit impérativement être fait **avant** l'import de n'importe quel composant **zuii**. Dans le cas contraire, les couches (layers) de styles tiers (comme Bootstrap) risquent de prendre le dessus sur les styles de la bibliothèque.

### Structure recommandée

**zuii** définit trois couches principales pour organiser les priorités :

1.  **`vendor`** (Priorité basse) : Pour les frameworks externes (ex: Bootstrap).
2.  **`components`** : Pour les composants **zuii**.
3.  **`utilities`** : Pour les classes utilitaires de **zuii**.

#### Exemple d'implémentation dans votre `main.scss` :

```scss
@layer vendor, components, utilities;

$prefix: "";
$enable-important-utilities: false;

@layer vendor {
	@import "bootstrap/scss/bootstrap";
}

// Les styles zuii s'insèrent automatiquement dans les couches 'components' ou 'utilities'
@import "votre-chemin/tokens";
```

### 🎯 Personnalisation et Surclassement
L'énorme avantage de cette structure est que **tous les styles écrits en dehors d'une couche (`@layer`) auront la priorité maximale**.

Cela vous permet de surcharger n'importe quelle classe de la bibliothèque sans effort et sans `!important` :

```css
/* Ce style surclassera toujours les composants zuii */
.btn-primary {
  background-color: purple;
}
```

---

## 🗺️ Roadmap

Le développement de **zuii** est structuré en plusieurs phases. Vous pouvez suivre l'avancement détaillé dans notre fichier dédié :

👉 **[Consulter la Roadmap complète](ROADMAP.md)**

## 📝 Changelog

👉 **[Consulter le changelog](CHANGELOG.md)**
