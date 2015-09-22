window.MathJax = {
    config: ["MMLorHTML.js"],
    jax: ["input/TeX","input/AsciiMath","output/HTML-CSS","output/NativeMML"],
    extensions: ["MathMenu.js","MathZoom.js"],
    TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"],
        Macros: {
            PGCD : '\\mathrm{pgcd}',
            Z    : '\\mathbb{Z}',
            Q    : '\\mathbb{Q}',
            R    : '\\mathbb{R}',
            C    : '\\mathbb{C}',
            F    : '\\mathbb{F}',
            lex  : '\\mathrm{lex}',
            LT   : '\\mathrm{LT}',
            LM   : '\\mathrm{LM}',
            Syz  : '\\mathrm{Syz}'
	}
    }
};
