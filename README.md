# À contre-pied

Média en ligne indépendant consacré au sport, à la politique et à la société. Le site publie l’actualité sous un autre angle : articles en Markdown, mise en page magazine, et rédaction depuis un CMS sur `/admin`.

Le média est dirigé par Yenael Fort.

## Pile technique

- [Astro 5](https://astro.build/) en rendu statique (`output: 'static'`)
- Articles Markdown dans `src/content/articles`, validés par `src/content.config.ts`
- Feuille de style unique : `src/styles/global.css`
- [Decap CMS](https://decapcms.org/) (interface `/admin`, authentification GitHub via Netlify)
- Déploiement [Netlify](https://www.netlify.com/) (`netlify.toml` : build `npm run build`, publication `dist`, Node.js 20)
- Formulaire de newsletter branché sur Netlify Forms

## Prérequis

- Node.js 20 (ou une version récente compatible, 18.20+ / 22)
- npm

## Installation

```bash
npm install
```

## Lancer en local

```bash
npm run dev
```

Le site est servi sur [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
```

Astro écrit le site statique dans `dist/`. Pour le prévisualiser :

```bash
npm run preview
```

## Déployer sur Netlify

1. Sur [app.netlify.com](https://app.netlify.com) : **Add new site** → **Import an existing project** → GitHub → dépôt `devjoshweb/A-contre-pied`.
2. Les réglages de build sont déjà dans `netlify.toml`. Netlify les reprend tels quels : commande `npm run build`, dossier publié `dist`, Node.js 20.
3. Lancer le déploiement. Chaque push sur `main` reconstruit le site.

Le formulaire d’inscription (`name="newsletter"`, page de remerciement `/merci/`) est marqué `data-netlify="true"`. Après le premier déploiement, les envois apparaissent dans l’onglet **Forms** du site Netlify.

## Le CMS `/admin`

Decap CMS est servi par `public/admin/`. Un article publié depuis l’interface devient un fichier Markdown dans `src/content/articles` ; les images vont dans `public/uploads`. Decap commit ces fichiers sur la branche `main`, ce qui relance le build Netlify. Le site se met à jour en une minute environ.

La configuration est dans `public/admin/config.yml` :

- dépôt : `devjoshweb/A-contre-pied`
- branche : `main`
- authentification : OAuth GitHub proxifié par Netlify (`base_url: https://api.netlify.com`)
- rubriques : Sport, Politique, Société

### Brancher l’authentification GitHub (une fois)

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
   - **Homepage URL** : l’adresse du site Netlify
   - **Authorization callback URL** : `https://api.netlify.com/auth/done`
2. Générer un *client secret*, puis copier le *client ID* et le *client secret*.
3. Netlify → **Site configuration** → **Access & security** → **OAuth** → **Install provider** → GitHub, et coller les deux valeurs.

### Publier un article

Ouvrir `https://<votre-site>/admin`, choisir **Login with GitHub**, puis **New Article**. Renseigner le titre, la rubrique, la date, l’auteur, le chapô, l’image de couverture et le texte, puis **Publish**.

Un article d’exemple est déjà présent : `src/content/articles/bienvenue.md`. On peut le modifier ou le supprimer depuis l’admin.

## Arborescence

```
astro.config.mjs          configuration Astro
package.json              scripts npm (dev, build, preview)
netlify.toml              build et en-têtes HTTP
src/
  pages/                  accueil, rubriques, article, à propos, 404, merci
  layouts/Base.astro      gabarit (en-tête, navigation, lettre, pied de page)
  components/             carte d’article, formulaire de newsletter
  content/articles/       articles Markdown
  content.config.ts       schéma de la collection
  styles/global.css
  lib.ts                  rubriques et format de date
public/
  admin/                  Decap CMS (index.html + config.yml)
  uploads/                médias déposés depuis l’admin
  favicon.svg
  robots.txt
```
