(function() {
    var opts = eLeMentS.page.addons.book.crossref || {};
    var counters = {
	sections : {},
	theorems : 0,
    };
    var sections = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    sections.forEach(function (s,i) {
	counters.sections[i] = 0;
    });
    $$(sections.join(',') + ',.theorem').forEach(function(t) {
	if (t.classList.contains('theorem')) {
	    var type = 'Theorem';
	    if (opts.theorems && opts.theorems.types) {
		type = opts.theorems.types.theorem || type;
		for (var typ in opts.theorems.types) {
		    if (typ != 'theorem' && t.classList.contains(typ)) {
			type = opts.theorems.types[typ];
			break;
		    }
		}
	    }
	    t.dataset['counterType'] = type;
	    t.dataset.counter = (
		(opts.theorems && opts.theorems.reset !== undefined)
		    ? counters.sections[opts.theorems.reset] + '.' : ''
	    ) + ++counters.theorems;
	} else {
	    var index = sections.indexOf(t.tagName);
	    t.dataset['counterType'] = opts['section-name'] || 'Section';
	    t.dataset.counter = ++counters.sections[index];
	    for (var i = index + 1; i < sections.length; i++)
		counters.sections[i] = 0;
	    if (opts.theorems && index == opts.theorems.reset)
		counters.theorems = 0;
	}
    });
    
    $$('.crossref').forEach(function(r) {
	try {
	    var ref = $(r.getAttribute('href'));
	    r.textContent += ' ' + ref.dataset['counter'];
	    if (ref.title)
		r.title = ref.title;
	} catch (e) {
	    r.textContent = e.message;
	    r.classList.add('book-error');
	}
    });
})();
