# Intégration Symfony pour @zuii/calendar

Ce dossier contient le contrôleur Stimulus pour utiliser le calendrier dans un projet Symfony.

## Installation

Assurez-vous d'avoir installé le package via npm/pnpm :
```bash
pnpm add @zuii/calendar
```

## Utilisation

### 1. Enregistrement du contrôleur
Dans votre fichier `assets/controllers.json` (ou via le mécanisme d'import de votre projet Symfony UX), importez le contrôleur :

```javascript
import CalendarController from '@zuii/calendar/symfony';
// ... enregistrement dans Stimulus
```

### 2. Utilisation dans Twig
```twig
<div {{ stimulus_controller('@zuii/calendar/symfony', {
    lang: 'fr',
    mode: 'single',
    availability: { '2026-04-02': ['10:00'] }
}) }}></div>

<script>
    document.addEventListener('calendar:date-select', (event) => {
        console.log('Date sélectionnée :', event.detail.date);
    });
</script>
```
