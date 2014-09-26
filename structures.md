---
layout: post
title: Anneaux, corps, polynômes, expressions
---

## Structures prédéfinies

Sage prédéfinit pour l'utilisateur certaines structures algèbriques de
base, les noms s'expliquent tous seuls :

~~~
sage: NN
Non negative integer semiring
sage: ZZ
Integer Ring
sage: QQ
Rational Field
sage: QQbar
Algebraic Field
sage: RR
Real Field with 53 bits of precision
sage: RDF
Real Double Field
sage: CC
Complex Field with 53 bits of precision
sage: GF(7)
Finite Field of size 7
sage: Zmod(15)
Ring of integers modulo 15
sage: Zmod(7)
Ring of integers modulo 7
sage: Qp(5)
5-adic Field with capped relative precision 20
~~~

## Variables et expressions symboliques

Voir le [Sagebook]({{ site.data.bib.sagebook }}), Section 1.2.

Sage peut utiliser toute la syntaxe du langage Python, à partir de la
possibilité de définir des variables :

~~~
sage: a = 2+2
sage: a
4
sage: a+2
6
~~~

Une variable spéciale, `_` (tiret bas), permet de faire référence à la
dernière valeur affichée :

~~~
sage: _
6
~~~

Cette variable est plus utile dans le terminal que dans le notebook,
où on peut revenir sur une cellule précédemment saisie.

Sage inclut un moteur de calcul symbolique. Le nom `x` est une
*variable symbolique* prédéfinie au lancement de Sage.

~~~
sage: a = (x^2 + 2) * (x^3 + 4)
sage: a
(x^3 + 4)*(x^2 + 2)
sage: a.expand()
x^5 + 2*x^3 + 4*x^2 + 8
~~~

On peut définir d'autres variables symboliques avec la fonction
`var`. Ses effets sont une entorse aux conventions de bon usage des
langages de programmation, mais Sage met la facilité d'utilisation en
avant...

~~~
sage: var('y')
y
sage: (x+y)*(x-y)
(x + y)*(x - y)
~~~

Une façon équivalente, mais moins magique d'écrire la même chose :

~~~
sage: y = var('y')
sage: (x+y)*(x-y)
(x + y)*(x - y)
~~~

Mais attention !

~~~
sage: Z = var('z')
sage: Z + z
2*z
~~~

Beurk ! En programmation il est bon usage de faire une différence
entre `Z` (un *nom de variable*) et sa *valeur* `z` (une *expression
symbolique*).

Beaucoup moins risqué : utiliser la méthode `SR.var` à la place de `var` :

~~~
sage: SR.var('t')
t
sage: t
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
...
NameError: name 't' is not defined
~~~

Correct, le nom `t` *ne souille pas l'espace des noms*. Maintenant :

~~~
sage: T = SR.var('t')
sage: T + T
2*t
sage: T + t
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
...
NameError: name 't' is not defined
~~~

Attention à ne pas confondre les *noms de variables* et les *variables
symboliques*, même lorsqu'elles ont la même écriture.

~~~
sage: X = SR.var('x')
sage: X
x
sage: x = 6
sage: x
6
sage: X+x
x + 6
~~~

Dans l'exemple ci-dessus, `X` est un *nom de variable* qui pointe vers
une *variable symbolique* représentée par le caractère `x`. Plus bas,
`x` est encore un *nom de variable* qui pointe vers la valeur entière
`6`.


## Polynômes

Voir le [Sagebook]({{ site.data.bib.sagebook }}), chapitre 7.

En plus des polynômes symboliques, Sage possède plusieurs classes
spécialisées de polynômes à coefficients dans différents anneaux.

La syntaxe la plus simple pour définir un anneau de polynômes (par
exemple sur le corps des rationnels) est

~~~
sage: A.<x> = QQ[]
sage: A
Univariate Polynomial Ring in x over Rational Field
~~~

Cette syntaxe associe le nom `x` au *générateur* de `A`. Il ne s'agit
plus d'expressions symboliques, tout calcul est maintenant exécuté
immédiatement :

~~~
sage: (x^2 + 2) * (x^3 + 4)
x^5 + 2*x^3 + 4*x^2 + 8
~~~

La syntaxe utilisée pour définir les polynômes n'est pas une syntaxe
Python standard. Voici deux autres façons de définir `A` qui sont
valides en Python.

~~~
sage: A = QQ['x']
sage: x = A.gen()
~~~

~~~
sage: A = PolynomialRing(QQ, 'x')
sage: x = A.gen()
~~~

Dans les deux cas, on voit bien la différence entre le *nom de
variable* `x` et sa *représentation* (aussi `x`). Cela ne doit pas
être nécessairement ainsi :

~~~
sage: A = QQ['x']
sage: toto = A.gen()
sage: toto^2 + 1
x^2 + 1
~~~

On peut définir des anneaux de polynômes à plusieurs variables :

~~~
sage: B.<x,y,z> = RR[]; B
Multivariate Polynomial Ring in x, y, z over Real Field with 53 bits of precision
~~~
