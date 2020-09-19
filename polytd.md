---
layout: default
title: Algèbre effective avec SageMath
addons:
  mathjax: yes
  highlightjs: true
---

$$
\def\Z{\mathbb{Z}}
\def\Q{\mathbb{Q}}
\def\F{\mathbb{F}}
$$

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
