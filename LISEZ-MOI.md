# DES TRICOTS POUR LE 24H — version à publier

Cette version inclut les photos d'Annette, Colette et Odette, les cinq pages, un formulaire de réservation qui ne dépend pas du logiciel de courriel des visiteurs, et une administration protégée par mot de passe.

## Publication (Netlify)

1. Créez un compte sur https://www.netlify.com/ et connectez votre compte GitHub.
2. Créez un dépôt GitHub **privé** et ajoutez-y le contenu de ce dossier (les fichiers doivent être à la racine du dépôt).
3. Dans Netlify, choisissez **Add new project → Import an existing project** et sélectionnez ce dépôt. Le fichier `netlify.toml` indique le dossier de publication et les fonctions. La commande de build peut rester vide. Netlify installera les dépendances de `package.json`.
4. Dans **Project configuration → Environment variables**, ajoutez :
   - `ADMIN_PASSWORD` : un mot de passe fort et unique pour vous connecter à `/admin.html`.
   - `ADMIN_SECRET` : une longue chaîne aléatoire secrète, différente du mot de passe (au moins 32 caractères).
   Définissez les deux pour les fonctions de production. Redéployez après l'ajout.
5. Dans Netlify, activez **Forms** si nécessaire et vérifiez que le formulaire `reservations` est détecté après le déploiement. Configurez **Forms → Form notifications** pour recevoir un courriel à `mascaro.charlotte@gmail.com` lors d'une nouvelle réservation. Les demandes sont également visibles dans Netlify → Forms. Faites un envoi de test.
6. Ouvrez l'URL publique fournie par Netlify. Pour ajouter ou modifier une tuque, allez à `https://votre-site.netlify.app/admin.html` et connectez-vous.

## Points importants

- Aucun paiement n'est encaissé sur le site. Les visiteurs remplissent une demande, puis paient par Interac selon vos instructions après confirmation.
- Les réservations **ne bloquent pas automatiquement** une tuque : marquez-la « Vendue » après avoir confirmé la réservation. Les demandes multiples restent possibles.
- Le catalogue et les photos ajoutées sont conservés dans Netlify Blobs. Vérifiez les quotas et les conditions de votre forfait Netlify. Exportez régulièrement une copie de vos données et de vos photos; aucune sauvegarde automatisée n'est fournie.
- Le mot de passe protège l'interface d'administration, mais cette version ne comprend pas de limitation des tentatives de connexion, de gestion multi-utilisateur ni de protection anti-spam avancée. Pour une boutique publique à long terme, ajoutez ces protections.
- La possibilité d'émettre un reçu fiscal et les informations nécessaires doivent être confirmées avec l'organisme habilité à les émettre. Le site ne génère pas de reçus.
- Les pages et les photos initiales peuvent être consultées en ouvrant `index.html` localement, mais les formulaires et l'administration nécessitent le déploiement Netlify.
- Avant de partager le lien, testez une réservation, une notification, un ajout de photo, et la mise à jour du statut d'une tuque.
