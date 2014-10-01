---
layout: post
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

## Structures de contrôle

L'indentation en python a une valeur syntaxique : elle sert à délimter
les blocs. Toutes les lignes d'un même bloc doivent être précédées du
même nombre d'espaces blancs, et on général on conseille d'utiliser 4
espaces blancs.

Voici un exemple de bloc conditionnel mettant en évidence cette
syntax.

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
