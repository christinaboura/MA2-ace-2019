---
layout: default
title: Algèbre effective avec SageMath
addons:
  mathjax:
    options:
      TeX:
        Macros:
          PGCD : \mathrm{pgcd}
          Z    : \mathbb{Z}
          Q    : \mathbb{Q}
          R    : \mathbb{R}
          C    : \mathbb{C}
          F    : \mathbb{F}
          lex  : \mathrm{lex}
          LT   : \mathrm{LT}
          LM   : \mathrm{LM}
          Syz  : \mathrm{Syz}
  highlightjs: true
---

<style>
ol#markdown-toc ol {
list-style-type: decimal;
}
</style>

## Table des matières
{:.no_toc}

{::options toc_levels="1..2" /}
1. TOC
{:toc}

{% for p in site.polytd %}
# {{ p.title }}

{{ p.content }}

{% endfor %}
