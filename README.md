🏠 The Good Corner V2
The Good Corner V2 est une plateforme web de petites annonces, inspirée de Leboncoin.
Les utilisateurs peuvent consulter, publier et gérer des annonces dans différentes catégories (automobile, maison & meubles, tech...).

🔗 Démo en ligne : stg.the-good-corner.hyna.me

🚀 Stack technique
Frontend	Backend	Services	Base de données	DevOps
React	Node.js (GraphQL)	Nginx (API Gateway)	PostgreSQL	Docker, Docker Compose
Vite	Apollo Server	Service d'images	Adminer	Healthchecks, volumes persistants

🛠️ Architecture
scss
Copier
Modifier
The Good Corner V2
├── frontend (Vite, React)
├── backend (GraphQL API, Node.js)
├── img (service de gestion d'images)
├── nginx (API Gateway)
├── db (PostgreSQL)
└── adminer (interface DB)
📦 Lancer le projet
🔧 Prérequis
Docker + Docker Compose

Fichier .env avec :

bash
Copier
Modifier
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
GATEWAY_PORT=...
🚀 Commandes
1️⃣ Cloner le repo :

bash
Copier
Modifier
git clone https://github.com/hyna42/TGC-V2
cd TGC-V2
2️⃣ Lancer avec Docker Compose :

bash
Copier
Modifier
docker-compose up --build
3️⃣ Accéder à l'app :

Frontend : http://localhost:5173

Backend (GraphQL Playground) : http://localhost:4000

Adminer : http://localhost:8080

📂 Services
Service	Port local	Description
Frontend	5173	Application web React
Backend	4000	API GraphQL (Node.js, Apollo)
Images	4000 (shared)	Upload et gestion des images
Adminer	8080	Interface pour PostgreSQL
PostgreSQL	5432 (interne)	Base de données
Nginx	${GATEWAY_PORT}	API Gateway (reverse proxy)

📷 Fonctionnalités
✅ Parcourir et rechercher des annonces
✅ Filtrer par catégories
✅ Télécharger des images pour les annonces
✅ Backend en GraphQL
✅ Déploiement orchestré avec Docker
✅ Healthchecks intégrés

📬 Contact
👤 Amadou Diallo
🔗 GitHub | LinkedIn | 📧 hyna@duck.com

Dis-moi si tu veux que je t’aide à intégrer ce README directement dans ton projet ! 💪
Je peux aussi t’aider à customiser le design du site si tu veux un style plus cool 🎨.







Vous avez dit :
en mode markdown a coller direct sur mo,n reame


ChatGPT a dit :
Bien sûr ! Voici le code markdown complet, prêt à être collé directement dans ton README :

markdown
Copier
Modifier
## 🏠 The Good Corner V2

**The Good Corner V2** est une plateforme web de petites annonces, inspirée de *Leboncoin*.  
Les utilisateurs peuvent consulter, publier et gérer des annonces dans différentes catégories (automobile, maison & meubles, tech...).

🔗 **Démo en ligne** : [stg.the-good-corner.hyna.me](https://stg.the-good-corner.hyna.me)

---

## 🚀 Stack technique

| **Frontend** | **Backend** | **Services** | **Base de données** | **DevOps** |
|--------------|-------------|--------------|---------------------|------------|
| React        | Node.js (GraphQL) | Nginx (API Gateway) | PostgreSQL | Docker, Docker Compose |
| Vite         | Apollo Server    | Service d'images     | Adminer    | Healthchecks, volumes persistants |

---

## 🛠️ Architecture









