# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server avec HMR
npm run build    # Build de production → dist/
npm run preview  # Prévisualiser le build de production
```

## Architecture

Quiz frontend-only (aucun backend). Navigation par hash URL — aucun rechargement de page.

### Format du hash

```
#step=0               → question 0, pas encore de réponses
#step=2&answers=AC    → question 2, Q0=Aurélie Q1=Clément
#step=recap&answers=ACJ  → récapitulatif final
```

Encodage : `A` = Aurélie, `C` = Clément, `J` = Jules

### Flux de données

`main.js` écoute `hashchange` et `DOMContentLoaded` → appelle `parseHash()` → détermine quelle vue rendre → passe des callbacks (`onAnswer`, `onBack`) aux vues → les callbacks reconstruisent le hash via `buildHash()` et l'écrivent dans `window.location.hash`.

### Fichiers clés

| Fichier | Rôle |
|---|---|
| `src/data/pages.js` | **Seul fichier à modifier pour ajouter des pages** |
| `src/utils/urlState.js` | Parse/encode l'état dans le hash |
| `src/views/QuestionView.js` | Vue d'une question (photos + boutons) |
| `src/views/RecapView.js` | Vue récapitulatif final |
| `src/main.js` | Orchestrateur : routing, callbacks |

### Ajouter une page

1. Déposer les images (1 à 3) dans `src/assets/eggs/`
2. Ajouter une entrée dans `src/data/pages.js` :
   ```js
   { id: 'oeuf-04', photos: ['oeuf-04a.jpg', 'oeuf-04b.jpg'] }
   ```

Les images sont chargées automatiquement via `import.meta.glob` — aucun import manuel nécessaire.

## Déploiement

Hébergé sur GitHub Pages sous `/paques/`. La config `base: '/paques/'` dans `vite.config.js` est requise. Déployer le contenu de `dist/` après `npm run build`.
