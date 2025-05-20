## Pinpo Project

### Description

Pinpo est un projet d'intégration d'API en TypeScript permettant l'import de leads via un serveur Express. Le projet est dockerisé pour faciliter le déploiement.

### Prérequis

* Docker Desktop installé ([lien d'installation](https://www.docker.com/products/docker-desktop/)) 
* Git installé ([lien d'installation](https://git-scm.com/))

### Installation

1. Clonez le dépôt GitHub :

   ```bash
   git clone https://github.com/Fushina/Pinpo.git
   cd Pinpo
   ```

2. Construisez l'image Docker :

   ```bash
   docker build -t pinpo-app .
   ```

3. Démarrez le conteneur Docker :
Attention: Pour faciliter l'intégration et le dévellopement nous avons décidez de hoisir de monter le dossier Pinpo dans le docker.

Pour ce faire et jusqu'à la fin de la procédure ${PWD} et votre chemin du dossier Git que vous venez de push.
   ```bash
   docker run -d -p 3000:3000 -v ${PWD}:/workspace pinpo-app
   ```

### Initialisation des variables d'environnement

Lors du premier démarrage, et votre premiere connexion, il vous sera demandé de remplir différente information:

La clé API: Fournit par Pinpo, qui vous permet d'accèder à l'API de PINPO (Lien de la documentation(https://docs.pinpo.ai))

Le numéro de scénario : Fournit par Pinpo. Ce numéro est un ID pour chaque scénario que vous avez configuré.
(Attention: Le premier scénario est celui par défaut, vous pouvez le modifier ultérieurement où en ajouter différent, si vous avez différentes intérogation veuillez contacter votre CX)

L'URL pour le webhook subscription de PINPO: Information que vous avez envoyé à pinpo, Si ce n'est pas fait alors veuille le communiquer le plus tôt possible à votre CX.
Cette information vous permettra de recevoir les informations par rapport aux différents leads en cours.

Toutes ces informations sont actuellement stocké dans le config.json

Où vous pouvez aussi y retrouver les informations de vos différents Salesman.

### Accès au serveur

Une fois le conteneur démarré, l'application est accessible à l'adresse :

```
http://localhost:3000
```

ou à l'adresse de votre serveur au port voulu

### Débogage et logs

Pour les prochaines étapes il va vous être nécessaire de connaitre le container ID de votre docker.
Vous pouvez l'avoir en faisant cette commande:

```bash
  docker ps
```

Vous aurez le nom de tout vos containers, le port utilisé et l'id.

Pour voir les logs en direct, utilisez :

```bash
   docker logs <container_id> -f
```

Pour accéder au shell du conteneur :

```bash
   docker exec -it <container_id> /bin/sh
```

### Arrêter le conteneur

```bash
   docker stop <container_id>
```

### Rebuild après modifications

Si des modifications sont effectuées dans le code, il faut reconstruire l'image :

```bash
   docker build -t pinpo-app .
```

Et relancer le conteneur :

```bash
   docker run -d -p 3000:3000 -v ${PWD}:/workspace pinpo-app
```
