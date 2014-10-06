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


## Types et conversions


### Parent-élément

Beaucoup de structures algèbriques en Sage sont organisées autour du
concept de parent-élément.

Par exemple, un anneau de polynômes est un *parent*, à qui
appartiennent des éléments. La majorité des valeurs en Sage possède un
parent, qu'on peut interroger avec la méthode `parent()` :

~~~
sage: 1.parent()
Integer Ring
sage: (1/2).parent()
Rational Field
sage: (0.5).parent()
Real Field with 53 bits of precision
~~~

Attention, beaucoup de noms prédéfinis appartiennent à l'*anneau
symbolique*, même si l'on pourrait imaginer qu'ils appartiennent à un
parent plus spécifique (réels, complexes, ...).

~~~
sage: i.parent()
Symbolic Ring
sage: pi.parent()
Symbolic Ring
sage: x.parent()
Symbolic Ring
~~~

Sage connaît un bon nombre de *coercitions* automatiques, qui
permettent de faire des opérations sur des éléments de parents
différents.

~~~
sage: A.<x> = QQ[]
sage: x.parent()
Univariate Polynomial Ring in x over Rational Field
sage: 2.parent()
Integer Ring
sage: (2+x).parent()
Univariate Polynomial Ring in x over Rational Field
~~~

Parfois Sage ne sait pas trouver de *coercition canonique*, dans ce
cas il donne une erreur :

~~~
sage: a = GF(7)(2); a
2
sage: a.parent()
Finite Field of size 7
sage: x + a
...
TypeError: unsupported operand parent(s) for '+': 'Univariate Polynomial Ring in
x over Rational Field' and 'Finite Field of size 7'
~~~

Il est possible dans ces cas de *convertir* un élément en l'associant
à un nouveau parent, Sage appliquera alors d'autres règles, dites de
*conversion*, qui ne doivent pas être canoniques. Toutes les
conversions prennent la forme de `parent(élément)`.

~~~
sage: x + QQ(a)
x + 2
sage: _.parent()
Univariate Polynomial Ring in x over Rational Field
~~~

Observons cela sur un exemple simple. Il existe un morphisme canonique
de $$ℤ$$ vers $$ℤ/10$$, Sage peut alors additionner deux éléments
appartenant à ces deux parents, et le résultat sera un élément de
$$ℤ/10$$.

~~~
sage: a = Zmod(10)(2)
sage: a.parent()
Ring of integers modulo 10
sage: 11.parent()
Integer Ring
sage: 11 + a
3
sage: _.parent()
Ring of integers modulo 10
~~~

Le *lift* d'un élément de $$ℤ/10$$ vers $$ℤ$$ n'a rien de canonique,
mais il est tout de même convenable d'appliquer cette *conversion*
lorsque elle est demandée par l'utilisateur :

~~~
sage: QQ(a).parent()
Rational Field
sage: 11 + QQ(a)
13
~~~

De façon similaire, il n'existe pas de morphisme naturel de $$ℚ$$ vers
$$ℤ/10$$. Sage donne donc correctement une erreur ici :

~~~
sage: 1/3 + a
...
TypeError: unsupported operand parent(s) for '+': 'Rational Field' and 'Ring of
integers modulo 10'
~~~

Mais, puisque 3 est inversible modulo 10, il est tout de même possible
de donner un sens à cette conversion :

~~~
sage: Zmod(10)(1/3) + a
9
~~~

### Base

Beaucoup de structures algèbriques en Sage ont une *base*. Par
exemple, les anneaux de polynômes ont pour base leur anneau de
coefficients.

~~~
sage: A.<x> = GF(7)[]
sage: A.base()
Finite Field of size 7
sage: A.base_ring()
Finite Field of size 7
~~~

Sage considère aussi les bases lorsque il cherche à trouver une
*coercition* entre deux éléments. Dans cet exemple, `x` est un
polynôme à coefficients dans $$𝔽_7$$, alors que 10 est un entier.  Au
moment de la coercition, Sage transforme 10 en un élément de $$𝔽_7$$,
puis le en un élément de $$𝔽_7[x]$$.

~~~
sage: 10.parent()
Integer Ring
sage: x + 10
x + 3
sage: _.parent()
Univariate Polynomial Ring in x over Finite Field of size 7
~~~

Il est possible d'obtenir une copie d'un anneau avec une base
différente grâce à la méthode `change_ring()` :

~~~
sage: B = A.change_ring(QQ); B
Univariate Polynomial Ring in x over Rational Field
sage: B(x)
x
sage: B(x).parent()
Univariate Polynomial Ring in x over Rational Field
sage: x.parent()
Univariate Polynomial Ring in x over Finite Field of size 7
~~~


### Classes, types

Chaque objet mathématique est représenté par une *classe*
Python. L'opérateur Python `type` permet d'interroger la classe
d'un objet :

~~~
sage: type(1)
<type 'sage.rings.integer.Integer'>
~~~

Souvent, différentes classes Python réalisent le même objet
mathématique, ce qui permet d'avoir plusieurs implantations pour un
même objet. Cela est particulièrement évident pour les corps finis, où
différents sous-systèmes sont choisis selon la cardinalité.

~~~
sage: A.<x> = GF(2)[]
sage: B.<y> = GF(3)[]
sage: C.<z> = GF(3^2,'a')[]
sage: type(x)
<type 'sage.rings.polynomial.polynomial_gf2x.Polynomial_GF2X'>
sage: type(y)
<type 'sage.rings.polynomial.polynomial_zmod_flint.Polynomial_zmod_flint'>
sage: type(z)
<type 'sage.rings.polynomial.polynomial_zz_pex.Polynomial_ZZ_pEX'>
~~~

Voici un autre exemple où deux classes différentes réalisent le même
objet mathématique, mais avec un code différent :

~~~
sage: A = matrix([[1,1],[1,1]])
sage: B = matrix([[1,1],[1,1]], sparse=True)
sage: A == B
True
sage: type(A)
<type 'sage.matrix.matrix_integer_dense.Matrix_integer_dense'>
sage: type(B)
<type 'sage.matrix.matrix_integer_sparse.Matrix_integer_sparse'>
~~~
