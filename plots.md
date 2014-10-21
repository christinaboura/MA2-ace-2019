---
layout: post
title: Tracer des courbes et des surfaces en Sage
---

Source: [Sage Tutorial](http://www.sagemath.org/doc/tutorial/tour_plotting.html)

Beaucoup d'objets en Sage peuvent être *tracés* :

~~~
sage: plot(cos)   # Affiche la fonction cosinus entre -1 et 1

sage: plot(cos, -5, 5)  # même fonction entre -5 et 5

~~~

La majorité des objets sont tracés par la fonction `plot()`, mais
beaucoup disposent aussi d'une méthode plus spécifique `.plot()`
attachée à l'objet, qui peut donner accès à plus d'options :

~~~
sage: A.<x,y,z> = QQ[]
sage: C = Curve(x^3 + y^3 + x*z^2)
sage: plot(C)    # Affiche la courbe C

sage: C.plot()   # Affiche la même courbe

sage: C.plot(patch=0)  # Affiche la même courbe dans une carte affine différente

~~~

Les *plots* sont des objets, qu'on peut stocker, copier...

~~~
sage: a = C.plot()
sage: a.set_aspect_ratio(2.0)
sage: a

~~~

et même additionner, le résultat étant la superposition de plusieurs
*plots*.

~~~
sage: C.plot(patch=0) + C.plot(patch=1) + a

~~~


## Tracés implicites et paramétriques

Le lieu d'annulation d'un polynôme à deux variables est tracé par la
fonction `implicit_plot()`. Cette fonction prend en argument le
polynôme à tracer et des bornes sur les axes sous forme de *tuples* :

~~~
sage: A.<x,y> = QQ[]
sage: implicit_plot(x*y - 1, (x, -10, 10), (y, -10, 10))

~~~

Il est important que le polynôme appartienne à un anneau bivarié,
faute de quoi, Sage va donner une erreur :

~~~
sage: A.<x,y,z> = QQ[]
sage: implicit_plot(x*y -1, (x, -10, 10), (y, -10, 10))
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
...
ValueError: Variable 'z' not found
~~~

La fonction `implicit_plot3d()` a les mêmes conventions d'appel et
permet de tracer des surfaces dans un espace à trois dimensions.

~~~
sage: implicit_plot3d(x*y*z - 1, (x,-10,10), (y,-10,10), (z,-10,10))

~~~

La fonction `parametric_plot()` permet de tracer des courbes ou des
surfaces paramétriques dans un espace à deux ou trois dimensions. Dans
ce sens, il s'agit d'une forme plus générale de `plot(cos)`.

~~~
sage: var('a,b')
(a, b)
sage: parametric_plot([cos(a), sin(a)], (a,-pi,pi))

sage: parametric_plot([cos(a), cos(a*b), sin(a)], (a,-pi,pi), (b,-pi,pi))

~~~
