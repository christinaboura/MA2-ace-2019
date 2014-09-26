---
layout: post
title: Introduction à l'environnemnt de travail et à Sage
---

## Environnement de travail

- Creation des comptes utilisateurs, première connexion, lancement
  d'un terminal, changer son mot de passe (`passwd`).
- Accès distant à `bourbaki.math.uvsq.fr` via ssh/scp/sftp.


## Prise en main de Sage

- Présentation de Sage : histoire, buts, modèle de développement, architecture.


### Interfaces pour l'utilisation de Sage

- Notebook *classique* :
  - Espace de cours sur <http://sage.math.uvsq.fr/>,
  - Notebook publique à <http://sagenb.org/> (UWashington).

- SageMathCloud : <https://cloud.sagemath.com/> (UWashington).

- Dans un terminal : taper la commande `sage` dans un terminal de la salle.

- Installation locale sur machine personnelle (notebook *classique* et terminal) :
  - Instructions générales : <http://www.sagemath.org/download.html>
  - Linux :
	- Distribution précompilée (méthode conseillée) :
      [64 bits](http://www-ftp.lip6.fr/pub/math/sagemath/linux/64bit/index.html),
      [32 bits](http://www-ftp.lip6.fr/pub/math/sagemath/linux/32bit/index.html)
	- Compiler à partir du
      [code source](http://www.sagemath.org/download-source.html).
  - MacOS,
    [distribution précompilée](http://www.sagemath.org/download-mac.html)
    (méthode conseillée).
  - Windows : [Image virtualisée](http://www.sagemath.org/download-windows.html)
      (pour [VirtualBox](https://www.virtualbox.org/)).
  - Toute architecture (**méthode conseillée pour toute plateforme**) :
    [Sage Debian Live](http://sagedebianlive.metelu.net/) (démarrage
    d'un système Linux préconfiguré depuis clef USB ou CD).


### Premiers pas avec Sage

Référence : chapitre 1 du [Sagebook]({{ site.data.bib.sagebook }}).

- Utilisation du notebook : créer une feuille de calcul, cellules,
  affichage du résultat, instruction `print`, *typesetting*.
- Syntaxe Python, objets, propriétés, méthodes.
- Aide, recherche et exploration : completion automatique (touche
  **tab**), aide en ligne (clef magique `?`), exploration du code source
  (clef magique `??`).
