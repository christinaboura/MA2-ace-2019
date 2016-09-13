---
title: Syntaxe Python/Sage
---

## Variables, assignement

Python est un langage dynamiquement typé, les variables n'ont pas
besoin d'être déclarées, et leur type peut changer au cours de
l'exécution.

~~~
python: a = 3
python: type(a)
<type 'int'>
python: a = '3'
python: type(a)
<type 'str'>
python: a
'3'
python: int(a)
3
~~~

## Syntaxe

L'indentation en python a une valeur syntaxique : elle sert à délimter
les blocs. Toutes les lignes d'un même bloc doivent être précédées du
même nombre d'espaces blancs ; en général on conseille d'utiliser 4
espaces blancs.

Voici un exemple de bloc conditionnel mettant en évidence cette
syntaxe.

~~~
if a == 0:
    print 'a vaut 0'
elif a > 0:
    print 'a est positif'
    print 'il vaut %d' % a
else:
    print 'a est négatif'
print 'encore des questions sur a?'
~~~

Les retours à la ligne sont interdits en Python, sauf entre
parenthèses `()`, crochets `[]`, et accolades `{}`. L'exemple suivant
est incorrect :

~~~
if a == b
   and c == d:
    print 'yes'
~~~

Alors que ceci est correct (et équivalent à la sémantique entendue):

~~~
if (a == b
    and c == d):
    print 'yes'
~~~


## Structures de contrôle

Source : <https://docs.python.org/2/tutorial/controlflow.html>

### `if... else`

La seule construction conditionnelle existante en Python est
`if... elif... else...`. Toutes les branches sont optionnelles, à
l'exception du `if`, il peut y avoir un nombre quelconque de `elif`,
mais un seul `else` à la fin.

~~~
if a == b == c:
    print 'égaux'
elif a <= b <= c  or  c <= b <= a:
    print 'b au milieu'
elif b <= a <= c  or  c <= a <= b:
    print 'a au milieu'
else:
    print 'c au milieu'
~~~

### Boucle `for... in`

Il existe deux types de boucles en Python. La plus couramment utilisée
est le `for... in` qui permet de parcourir les éléments d'une liste.

~~~
for i in range(10):
    print i
~~~

#### La fonction `range`

La boucle `for` est souvent utilisée en conjonction avec la fonction
`range`, dont la syntaxe générale est :

~~~
range(start, end, step)
~~~

Ainsi appelée, la fonction génère la liste des entiers entre `start`
(inclus) et `end` (non inclus) avec pas de `step` :

~~~
python: range(0, 10, 2)
[0, 2, 4, 6, 8]
~~~

Les deux autres syntaxes admissibles sont `range(start, end)` (pas
égal à 1) et `range(end)` (début égal à 0).

**Note :** À partir de Python 3.x, `range` ne renvoie plus une liste,
 mais un *générateur*. La différence réside exclusivement dans
 l'utilisation de la mémoire, beaucoup plus efficace avec la 3.x. Le
 même comportement est réalisé par la fonction `xrange` en Python 2.x.

### Boucle `while`

La deuxième boucle est très similaire à la boucle `while` en C.

~~~
a = 0
while a < 10:
    a += 1
    print a
~~~

Pas étonnant qu'il soit alors beaucoup plus facile d'écrire une boucle
infinie :

~~~
while True:
    print 'boucle toujours'
~~~

### Interrompre les boucles: `break`, `continue` et `return`

Comme en C, l'instruction `break` sort de la boucle sans vérifier la
condition :

~~~
for i in range(10):
    print i
    if i > 2:
        break
~~~

L'instruction `continue` passe à l'itération suivante en sautant le
reste du corps :

~~~
for i in range(10):
    if i % 2 == 0:
        continue
    print i
~~~

Et le `return` sort immédiatement de toute boucle et de la fonction
qui le contient.


## Listes

Source : <https://docs.python.org/2/tutorial/datastructures.html#more-on-lists>

L'un des objets les plus utilisés en Python, ce sont les listes. On
déclare une liste avec les crochets `[]`, et on accède à ses éléments
comme on accède aux éléments d'un tableau en C :

~~~
python: l = [1, 2, 'a', True]
python: l
[1, 2, 'a', True]
python: l[0]
1
python: l[3]
True
python: l[4]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
~~~

La syntaxe pour accéder aux éléments d'une liste est plus puissante en
Python qu'en C. Les indices négatifs accèdent aux éléments à partir du
dernier :

~~~
python: l[-1]
True
python: l[-4]
1
python: l[-5]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
~~~

Il est aussi possible d'obtenir les sous-listes d'une liste avec une
syntaxe qui rappelle les paramètres de la fonction
`range`. L'expression `l[start:end:step]` donne la sous-liste de `l`
qui démarre à l'élément `start` (inclus), se termine à l'élément `end`
(exclus) et saute tous les `step` éléments. Chacun des composants peut
être omis, il prendra alors une valeur par défaut (0 pour `start`, la
longueur de la liste pour `end`, 1 pour `step`).

~~~
python: l = range(10)
python: l
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
python: l[0:4]
[0, 1, 2, 3]
python: l[0:4:2]
[0, 2]
python: l[2:]
[2, 3, 4, 5, 6, 7, 8, 9]
python: l[:-3]
[0, 1, 2, 3, 4, 5, 6]
python: l[0::3]
[0, 3, 6, 9]
python: l[4:-2]
[4, 5, 6, 7]
python: l[::]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
python: l[:]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

~~~

La syntaxe `[:]` est un raccourci courant pour *copier* une liste :

~~~
python: l[:] == l
True
python: l[:] is l
False
~~~

### Compréhensions

Python offre une syntaxe pour la création des listes qui devrait être
familière aux mathématiciens. C'est un héritage du langage Lisp appelé
*compréhensions de listes* :

~~~
python: [a + 0.5 for a in range(10)]
[0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5]
~~~

ce qui est sémantiquement équivalent à

~~~
l = []
for a in range(10):
	l.append(a + 0.5)
~~~

On peut ajouter un nombre arbitraire de `for` et de `if` (sans `else`)
dans une compréhension, ils seront déroulés dans l'ordre :

~~~
[x*y for x in range(10)
     for y in range(x)
     if (x + y) % 2 == 0]
~~~

(les retours à la ligne sont optionnels) est équivalent à

~~~
l = []
for x in range(10):
    for y in range(x):
        if (x + y) % 2 == 0:
            l.append(x*y)
~~~

### Opérateurs fonctionnels sur les listes

Python définit quelques fonctions typiques des langages fonctionnels
pour traiter efficacement une liste. Les plus importantes sont `map`,
`filter`, et `reduce` ; elles laissent inchangée la liste d'origine.

`map` applique une fonction à chaque élément d'une liste et renvoie la
liste des résultats. Dans l'exemple ci-dessous, `hex` est la fonction
qui renvoie la représentation hexadécimale d'un entier :

~~~
python: map(hex, range(10,20))
['0xa', '0xb', '0xc', '0xd', '0xe', '0xf', '0x10', '0x11', '0x12', '0x13']
~~~

`filter` applique une fonction à chaque élément d'une liste et renvoie
la liste des éléments pour lesquels la fonction à donné
`True`. L'exemple suivant utilise la fonction `is_prime` de Sage, qui
teste la primalité de son paramètre :

~~~
sage: filter(is_prime, range(20))
[2, 3, 5, 7, 11, 13, 17, 19]
~~~

`reduce` parcourt la liste de gauche à droite. Le résultat de chaque
itération est obtenu en appliquant une fonction bivariée au résultat
de l'itération précédente et à l'élément courant. Dans l'exemple
suivant, `reduce` calcule la somme des entiers de 0 à 9 ; la fonction
standard `operator.add` est l'équivalent de l'opérateur `+` :

~~~
python: import operator
python: reduce(operator.add, range(10))
45
~~~

À partir de l'opérateur `reduce`, il est facile de définir quelques
autres fonctions très utiles : `sum`, `all`, `any`, `max`, `min`,
`join`. Vous êtes invités à en lire la documentation.



## Fonctions

Source : <https://docs.python.org/2/tutorial/controlflow.html>

Les fonctions Python sont définies par le mot clef `def`. Elles
peuvent prendre un nombre arbitraire de paramètres, et renvoyent une
valeur à l'aide du mot clef `return`. Toute fonction renvoye une
valeur, les fonctions qui n'ont pas de `return` renvoient la valeur
spéciale `None`.

~~~
def max(x, y):
    if x > y:
        return x
    else:
        return y
~~~

Certains paramètres peuvent prendre des valeurs par défaut. Si un
paramètre prend une valeur par défaut, tous ceux qui le suivent
doivent aussi en prendre.

~~~
python: def test(a, b, c=0, d=False):
.......    return a, b, c, d

python: test(1, 2)
(1, 2, 0, False)
python: test(1, 2, 3)
(1, 2, 3, False)
python: test(1, 2, 3, 4)
(1, 2, 3, 4)
python: test(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: test() takes at least 2 arguments (1 given)
~~~

Les paramètres d'une fonction peuvent être assignés hors ordre avec la
notation `paramètre=valeur` :

~~~
python: test(b=1, a=2)
(2, 1, 0, False)
python: test(1, 2, d=4)
(1, 2, 0, 4)
~~~

Python fournit deux opérateurs unaires pour transformer des objets en
paramètres d'une fonction. L'opérateur `*` transforme une liste ou un
tuple, tandis que l'opérateur `**` transforme un dictionnaire :

~~~
python: l = range(4)
python: test(*a)
(0, 1, 2, 3)
python: d = { 'a' : 3, 'b' : 5, 'd' : 1 }
python: test(**d)
(3, 5, 0, 1)
~~~
