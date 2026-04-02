# Intégration Symfony pour @zuii/booking

Ce dossier contient le contrôleur Stimulus pour utiliser l'interface de réservation dans un projet Symfony.

## Installation

Assurez-vous d'avoir installé le package via npm/pnpm :
```bash
pnpm add @zuii/booking @zuii/calendar
```

## Utilisation

### 1. Enregistrement du contrôleur
Dans votre fichier `assets/controllers.json`, importez le contrôleur :

```javascript
import BookingController from '@zuii/booking/symfony';
// ... enregistrement dans Stimulus
```

### 2. Utilisation dans Twig
```twig
<div {{ stimulus_controller('@zuii/booking/symfony', {
    lang: 'fr',
    availability: { '2026-04-02': ['10:00', '11:00', '13:00'] },
    fields: [
        { name: 'full_name', label: 'Nom complet', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
    ],
    inputName: 'reservation'
}) }}></div>

<script>
    document.addEventListener('booking:slot-select', (event) => {
        console.log('Réservation confirmée :', event.detail);
        // event.detail contient : { date, slot, formData }
    });
</script>
```
