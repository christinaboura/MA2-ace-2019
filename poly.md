---
layout: default
title: Algèbre commutatative et effective
addons:
  katex:
    options:
      macros:
        \a : \alpha
        \N : \mathbb{N}
        \Z : \mathbb{Z}
        \R : \mathbb{R}
        \Q : \mathbb{Q}
        \C : \mathbb{C}
        \F : \mathbb{F}
        \kk : \mathsf{k}
        \LL : \mathcal{L}
        \PP : \mathfrak{P}
        \dd : \,\mathrm{d}
        \im : \{\mathrm{Im}
        \LC : \mathrm{LC}
        \LT : \mathrm{LT}
        \LM : \mathrm{LM}
        \mdeg : \mathrm{mdeg}
  style_goodies: yes
  book:
    crossref:
      theorems:
        reset: 1
        types:
          theo: Théorème
          defi: Définition
          preu: Preuve
          coro: Corollaire
          lemm: Lemme
          prop: Proposition
          exer: Exercice
          exem: Exemple
          rema: Remarque
          propdefi: 'Proposition & définition'
          ques: Question
          axio: Axiome
          nota: Notation
          algo: Algorithme
---

<style>
ol#markdown-toc ol {
list-style-type: decimal;
}
</style>

### Table des matières
{:.no_toc}

{::options toc_levels="1..3" /}
1. TOC
{:toc}

{% for p in site.poly %}
## {{ p.title }}

{{ p.content }}

{% endfor %}
