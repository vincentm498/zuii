# @zuii/heros

Sections Heros premium pour zuii, incluant des variantes simples, vidéo et background vidéo immersif.

## Installation

```bash
pnpm add @zuii/heros
```

## Usage

### HTML

Importez le CSS :
```css
@import "@zuii/heros/style";
```

Structure HTML pour une vidéo en background :
```html
<section class="hero hero--video-bg">
    <div class="hero__video-container">
        <!-- Votre vidéo ou iframe -->
    </div>
    <div class="hero__container container">
        <h1>Votre Titre</h1>
    </div>
</section>
```

### JavaScript

La section s'initialise automatiquement à l'import, mais vous pouvez aussi le faire manuellement :

```javascript
import { initHeros } from '@zuii/heros';
initHeros();
```

## Variantes

- `hero` : Simple
- `hero--video` : Avec vidéo latérale ou intégrée
- `hero--video-bg` : Vidéo plein écran en arrière-plan
