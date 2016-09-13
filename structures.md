---
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

### Polynômes multivariés

Avec la même syntaxe, on peut définir des anneaux de polynômes à
plusieurs variables :

~~~
sage: B.<x,y,z> = RR[]; B
Multivariate Polynomial Ring in x, y, z over Real Field with 53 bits of precision
~~~

L'ordre monomial par défaut sur les anneaux multivariés est *degrevlex* :

~~~
sage: B.term_order()
Degree reverse lexicographic term order
sage: z < y < x < z^2 < y*z < x*z < y^2 < x*y < x^2
True
~~~

Il est possible de choisir l'ordre au moment de la création :

~~~
sage: C.<x,y,z> = PolynomialRing(QQ, order='lex')
sage: C
Multivariate Polynomial Ring in x, y, z over Rational Field
sage: C.term_order()
Lexicographic term order
sage: z < z^2 < x < x*y < x^2 
True
~~~

Il est aussi possible d'obtenir une copie d'un anneau avec un ordre
différent :

~~~
sage: D = B.change_ring(order='invlex')
sage: D.term_order()
Inverse lexicographic term order
sage: D == B
False
~~~

Sage supporter quelques ordres prédéfinis : `lex`, `invlex`,
`degrevlex`, ... La liste complète peut être obtenue interactivement :

~~~
sage.rings.polynomial.term_order?
~~~

Il est possible de construire des ordres arbitraires grâce à la classe
`TermOrder`. Il est par exemple possible de construire un ordre *avec
poids* :

~~~
sage: t = TermOrder('wdegrevlex', (1,2,3)); t
Weighted degree reverse lexicographic term order with weights (1, 2, 3)
sage: E.<x,y,z> = PolynomialRing(QQ, order=t)
sage: x < y < x^2 < z < x*y < x^3 < y^2
True
~~~

Lire la documentation de `TermOrder` pour plus de détails.


## Idéaux et bases de Gröbner

Sage sait calculer la division Euclidienne entre polynômes
multivariés :

~~~
sage: A.<x,y> = QQ[]
sage: (x^2 - y) % (x + y)
x^2 + x
sage: (x^2 - y) // (x + y)
-1
sage: (x^2 - y).quo_rem(x + y)
(-1, x^2 + x)
~~~

Le résultat est bien évidemment dépendant de l'ordre choisi :

~~~
sage: (x^2 - y).quo_rem(x + y)
(-y + x, y^2 - y)
~~~

Le point de départ pour travailler avec les bases de Gröbner est la
méthode `.ideal()` des anneaux de polynômes.

~~~
sage: A.<x,y,z> = QQ[]
sage: I = A.ideal(x^2 - y*z, x^3*y + 2*y*z - 4*z^2); I
Ideal (x^2 - y*z, x^3*y + 2*y*z - 4*z^2) of Multivariate Polynomial Ring in x, y, z
over Rational Field
~~~

Les idéaux ont une méthode `.groebner_basis()`, dont le résultat
dépend bien évidemment de l'ordre choisi :

~~~
sage: I.groebner_basis()
[y^3*z^2 + 2*x*y*z - 4*x*z^2, x*y^2*z + 2*y*z - 4*z^2, x^2 - y*z]
~~~

C'est cette base qui est utilisée pour calculer les formes normales de
polynômes modulo l'idéal. Les méthodes `.mod` (définie sur les
polynômes) et `.reduce` (définie sur les idéaux et sur les polynômes),
calculent la forme normale :

~~~
sage: (x^6*z - y*z^3 + x*z).mod(I)
-2*x*y*z^3 + 4*x*z^4 - y*z^3 + x*z
sage: I.reduce(x^6*z - y*z^3 + x*z)
-2*x*y*z^3 + 4*x*z^4 - y*z^3 + x*z
sage: (x^6*z - y*z^3 + x*z).reduce(I)
-2*x*y*z^3 + 4*x*z^4 - y*z^3 + x*z
~~~

Attention : les méthodes définies sur les polynômes se comportent
différemment lorsqu'elles reçoivent en paramètre une liste de
polynômes plutôt qu'un idéal.

~~~
sage: (x^6*z - y*z^3 + x*z).reduce([x^2 - y*z, x^3*y + 2*y*z - 4*z^2])
y^3*z^4 - y*z^3 + x*z
sage: (x^6*z - y*z^3 + x*z).mod([x^2 - y*z, x^3*y + 2*y*z - 4*z^2])
-2*x*y*z^3 + 4*x*z^4 - y*z^3 + x*z
~~~

De manière générale, préférez `I.reduce` en toute occasion.

Lorsque un polynôme appartient à l'idéal, la méthode `lift` permet de
l'exprimer comme une combinaison linéaire de ses générateurs :

~~~
sage: p = 2*x^3*y^3 - x*y^4*z + 2*y^3*z - 4*y^2*z^2
sage: I.reduce(p)
0
sage: p.lift(I)
[x*y^3, y^2]
sage: _[0] * I.0 + _[1] * I.1 == p
True
~~~


## Résultants et élimination

Le résultant de deux polynômes est calculé par la méthode `.resultant()`

~~~
sage: A.<x> = QQ[]
sage: (x^2+1).resultant(2*x)
4
~~~

Dans les anneaux à plusieurs variables, Sage élimine par défaut la
première variable :

~~~
sage: A.<x,y,z> = QQ[]
sage: (x*y + z).resultant(x+z+y)
y^2 + y*z - z
~~~

Il est aussi possible d'indiquer la variable que l'on souhaite
éliminer :

~~~
sage: (x*y + z).resultant(x+z+y, z)
-x*y + x + y
~~~

Des éliminations plus complexes peuvent être réalisées grâce aux bases
de Gröbner, en effet on a déjà vu plus haut que Sage supporte le
calcul de bases de Gröbner pour l'ordre *lex*, ce qui permet de
calculer les idéaux d'élimination. Cette même fonctionnalité est
encapsulée dans la méthode `.elimination_ideal()`, que voici à l'œuvre
sur le même exemple :

~~~
sage: I = A.ideal(x*y + z, x+z+y)
sage: I.elimination_ideal(z)
Ideal (x*y - x - y) of Multivariate Polynomial Ring in x, y, z over Rational Field
~~~

`.elimination_ideal()` peut aussi prendre une liste de variables à éliminer :

~~~
sage: A.<w,x,y,z> = QQ[]
sage: I = A.ideal(x*y + w*z, x*z + w*y, x*w + y*z, x^2 + y^2 + z^2 + w^2)
sage: I.elimination_ideal([x,y]).gens()
[3*w^2*z + z^3, w^3 + 3*w*z^2, w*z^3, z^5]
~~~
