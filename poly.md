---
layout: default
title: Algèbre commutatative et effective
addons:
  mathjax: yes
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

$$
\def\a{\alpha}
\def\N{\mathbb{N}}
\def\Z{\mathbb{Z}}
\def\R{\mathbb{R}}
\def\Q{\mathbb{Q}}
\def\C{\mathbb{C}}
\def\F{\mathbb{F}}
\def\kk{\mathsf{k}}
\def\LL{\mathcal{L}}
\def\PP{\mathfrak{P}}
\def\dd{\,\mathrm{d}}
\def\im{\mathrm{Im}}
\def\LC{\mathrm{LC}}
\def\LT{\mathrm{LT}}
\def\LM{\mathrm{LM}}
\def\mdeg{\mathrm{mdeg}}
$$

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
