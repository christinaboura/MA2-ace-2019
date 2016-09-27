---
title: La hyérarchie des types en Sage
---


## Parents et éléments

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

## Base

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


## Classes, types

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
