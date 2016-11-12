(function () {
    function repl(t) {
	var macros =  eLeMentS.page.addons.katex.options ? eLeMentS.page.addons.katex.options.macros : null;
	return macros
	    ? t.replace(new RegExp('(' + Object.keys(macros).join("|").replace(/\\/g, '\\\\') + ')(?=[^a-zA-Z]|$)', 'g'),
			function (match, macro) {
			    return macros[macro];
			})
	: t;
    }

    function escape(tex) {
	return repl(tex.replace(/^% <!\[CDATA\[|%\]\]>$/g, ''));
    }
    
    $$('script[type^="math/tex"]').forEach(function (m) {
	var options = { displayMode : m.type == 'math/tex; mode=display' };
	for (var o in eLeMentS.page.addons.katex.options)
	    options[o] = eLeMentS.page.addons.katex.options[o];
	var dest = document.createElement(options.displayMode ?  'div' : 'span');
	dest.classList.add('katex-plugin');
	m.parentElement.insertBefore(dest, m);
	try {
	    var tex = escape(m.textContent);
	    katex.render(tex, dest, options);
	    dest.addEventListener('copy', function(e) {
		e.clipboardData.setData('text/plain', tex);
		e.preventDefault();
	    });
	} catch (e) {
	    dest.textContent = e.message;
	    dest.classList.add('katex-error');
	}
    });
})();
