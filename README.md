# ⏳ TimeTravel Agency

> Voyagez au-delà du temps. Webapp interactive premium pour une agence fictive de voyage temporel.
>
> **Projet pédagogique fictif — M2 MDDA. Aucun vrai voyage temporel n'est proposé.**

---

## Description

**TimeTravel Agency** est une Single Page Application immersive présentant 3 destinations temporelles mythiques. Elle intègre une animation 3D dans le hero, un quiz de recommandation, un formulaire de pré-réservation et un chatbot connecté à **Mistral AI** via une route serverless sécurisée.

---

## Stack technique

| Technologie | Version | Usage |
|---|---|---|
| React | 18 | Framework UI |
| Vite | 5 | Bundler + dev server |
| Tailwind CSS | 3 | Styling utility-first |
| Framer Motion | 11 | Animations fluides |
| React Three Fiber | 8 | Canvas 3D (orbe temporel) |
| @react-three/drei | 9 | Helpers Three.js |
| Three.js | 0.160 | Moteur 3D |
| Mistral AI | API REST | Chatbot IA |
| Vercel | — | Déploiement + fonctions serverless |

---

## Fonctionnalités

- **Hero 3D** — orbe temporel animé avec anneaux, distorsion et champ d'étoiles (React Three Fiber)
- **Section Agence** — 3 arguments clés + statistiques
- **3 Destinations interactives** avec effet 3D au hover (perspective + rotation) :
  - 🏺 Égypte Ancienne — 8 900 € · 7 jours · Risque Modéré
  - ⚔️ Empire Romain — 7 500 € · 5 jours · Risque Élevé
  - ⛩️ Japon Féodal — 9 200 € · 8 jours · Risque Faible
- **Détail destination** — prix, durée, immersion, tenue, conseils
- **Quiz de recommandation** — 4 questions → résultat personnalisé + CTA
- **Formulaire de pré-réservation** — validation client, confirmation fictive (sans BDD)
- **Chatbot IA** — widget flottant connecté à Mistral AI via `/api/chat` (clé **jamais exposée côté client**)
- **Support images** — affiche `egypt.jpg` / `rome.jpg` / `japan.jpg` si présents dans `src/assets/`, fallback gradient sinon
- **Design premium** — thème sombre, accents or, Cinzel + Cormorant Garamond
- **Responsive** — mobile-first, tablette, desktop

---

## Outils IA utilisés

- **Mistral AI** (`mistral-small-latest`) : chatbot conversationnel côté serveur
- La clé API est lue uniquement dans `api/chat.js` via `process.env.MISTRAL_API_KEY`
- Le front-end n'accède jamais à la clé directement

---

## Installation locale

### Prérequis

- Node.js 18+
- npm

### Étapes

```bash
# 1. Se placer dans le dossier
cd "M2 MDDA/Projet IA - Time Travel/Webapp"

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Ouvrir .env et remplacer "your_mistral_api_key_here" par votre vraie clé

# 4. Lancer le dev server (sans chatbot IA)
npm run dev
# → http://localhost:5173
```

> ⚠️ Avec `npm run dev` seul, le chatbot fonctionne en **mode démo** (réponse statique, sans IA).

---

## Lancer avec le chatbot Mistral actif (Vercel Dev)

```bash
# Installer Vercel CLI (une seule fois)
npm install -g vercel

# Lancer l'environnement complet (Vite + serverless sur le même port)
vercel dev
# → http://localhost:3000
```

Vercel Dev lit automatiquement le fichier `.env` et injecte `MISTRAL_API_KEY` dans la fonction `api/chat.js`.

---

## Configuration Mistral AI

1. Créer un compte sur [console.mistral.ai](https://console.mistral.ai)
2. Générer une clé API dans **API Keys**
3. Copier la clé dans votre fichier `.env` local :
   ```
   MISTRAL_API_KEY=votre_cle_ici
   ```
4. Ne jamais committer ce fichier (il est dans `.gitignore`)

> **Sécurité** : La clé ne doit apparaître **que** dans `.env` (jamais dans `src/`). Vérification : aucun fichier sous `src/` ne contient `MISTRAL_API_KEY`.

---

## Déploiement sur Vercel

```bash
# Option A — CLI
npm install -g vercel
vercel          # première fois : configure le projet
vercel --prod   # déploiement en production

# Option B — Dashboard Vercel
# 1. Importer le repo depuis GitHub
# 2. Aller dans Settings > Environment Variables
# 3. Ajouter MISTRAL_API_KEY avec votre clé
# 4. Redéployer
```

Le fichier `vercel.json` à la racine gère déjà le routage SPA (toutes les routes → `index.html`).

---

## Structure du projet

```
/
├── api/
│   └── chat.js              ← Serverless function (Mistral AI — clé serveur uniquement)
├── src/
│   ├── assets/
│   │   ├── egypt.jpg        ← Optionnel : remplacer par une vraie photo
│   │   ├── rome.jpg         ← Optionnel : remplacer par une vraie photo
│   │   └── japan.jpg        ← Optionnel : remplacer par une vraie photo
│   ├── components/
│   │   ├── Header.jsx       ← Navigation fixe avec blur au scroll
│   │   ├── Hero.jsx         ← Hero 3D (React Three Fiber)
│   │   ├── About.jsx        ← Présentation agence + stats
│   │   ├── Destinations.jsx ← 3 cards avec hover 3D
│   │   ├── DestinationDetail.jsx ← Vue détaillée d'une destination
│   │   ├── Quiz.jsx         ← Quiz 4 questions → résultat personnalisé
│   │   ├── Booking.jsx      ← Formulaire de pré-réservation
│   │   ├── Chatbot.jsx      ← Widget chatbot Mistral AI
│   │   └── Footer.jsx
│   ├── data/
│   │   └── destinations.js  ← Données destinations + questions quiz
│   ├── utils/
│   │   └── images.js        ← Helper import.meta.glob pour images optionnelles
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            ← Design system complet
├── .env.example             ← Template — copier en .env (jamais committer .env)
├── .gitignore
├── vercel.json              ← Routage SPA Vercel
├── index.html               ← Fonts Google : Cinzel + Cormorant Garamond
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## Ajouter de vraies images

Placez vos photos dans `src/assets/` avec ces noms exacts :

| Fichier | Destination | Suggestion |
|---|---|---|
| `egypt.jpg` | Égypte Ancienne | Pyramides, temple de Karnak, bord du Nil |
| `rome.jpg` | Empire Romain | Colisée, Forum, Vue de Rome antique |
| `japan.jpg` | Japon Féodal | Sanctuaire torii, cerisiers, Mont Fuji |

Sources libres de droits recommandées : [Unsplash](https://unsplash.com), [Pexels](https://pexels.com).

Si un fichier est absent, le composant affiche automatiquement un fond gradient + emoji — aucune erreur de build.

---

## Limites connues

- Le chatbot Mistral nécessite `vercel dev` (ou un déploiement Vercel) pour fonctionner pleinement en local
- Avec `npm run dev` seul, le chatbot répond en mode démo (message statique)
- Le formulaire de réservation est fictif : aucune donnée n'est enregistrée
- La canvas Three.js se dégrade gracieusement si WebGL n'est pas disponible
- Les images de destinations sont optionnelles (gradient fallback si absentes)

---

## Crédits

- Typographies : [Cinzel](https://fonts.google.com/specimen/Cinzel), [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — Google Fonts (OFL)
- IA : [Mistral AI](https://mistral.ai/)
- 3D : [Three.js](https://threejs.org/) · [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) · [@react-three/drei](https://github.com/pmndrs/drei)
- Animations : [Framer Motion](https://www.framer.com/motion/)
- Photos destinations : à ajouter depuis Unsplash / Pexels (crédits à préciser selon les images choisies)

---

*Projet fictif — TimeTravel Agency ne propose aucun vrai voyage temporel. 🕰️*
