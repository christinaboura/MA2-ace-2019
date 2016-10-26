function graph(selector, nodes, edges) {
    var svg = d3.select(selector).append('svg');
    var g = svg.append('g');
    g.selectAll("line")
    	.data(edges)
    	.enter()
    	.append("line")
    	.attr("x1", function(d) { return nodes[d.f].x })
    	.attr("y1", function(d) { return nodes[d.f].y })
    	.attr("x2", function(d) { return nodes[d.t].x })
    	.attr("y2", function(d) { return nodes[d.t].y })
    	.style("stroke", "black");
    
    g.selectAll("circle .nodes")
	.data(nodes)
	.enter()
	.append("svg:circle")
	.attr("class", "nodes")
	.attr("cx", function(n) { return n.x })
	.attr("cy", function(n) { return n.y })
	.attr("r", "7px")
	.attr("fill", function(n) { return n.color || 'black' });
    
    var bbox = svg.node().getBBox();
    svg.attr('width', bbox.width)
	.attr('height', bbox.height)
    g.attr('transform', 'translate(' + (-bbox.x) + ' ' + (-bbox.y) + ')');
    
    return svg;
}

(function() {
    var node = function(phi, d, color) {
	return {
	    x:      d * Math.cos(phi),
	    y:     -d * Math.sin(phi),
	    color: ['red', 'green', 'blue'][color % 3],
	};
    };
    
    var nodes = [0,1,2,3,4].map(function(i) {
	return node((0.5+0.4*i)*Math.PI, 45, Math.floor(i / 2));
    }).concat([0,1,2,3,4].map(function(i) {
	return node((0.5+0.4*i)*Math.PI, 100, 5-i);
    }));
    
    var edges = [0,1,2,3,4].map(function(i) {
	return [
	    { f: i,     t: (i+2) % 5 },
	    { f: 5 + i, t: 5 + (i+1)%5 },
	    { f: i,     t: 5 + i },
	];
    }).reduce(function(a,b) { return a.concat(b) });
    
    graph("#petersen", nodes, edges);
})();

(function() {
    nodes = [[0,0], [0,2], [1,1], [2,1], [3,0], [3,2], [4,1]].map(function (c) {
	return {x: 50*c[0], y: 50*c[1]};
    });
    edges = [
	{f:0,t:1}, {f:0,t:2}, {f:0,t:4},
	{f:1,t:2}, {f:1,t:5},
	{f:3,t:4}, {f:3,t:5}, {f:3,t:6},
	{f:4,t:6},
	{f:5,t:6},
    ];
    graph("#grrr-1", nodes, edges);
    graph("#grrr-2", nodes, edges);
})();


(function() {
    nodes = Array(20).fill(0).map(function(x,i) {
	return {
	    x: 150*Math.floor(i/4) + 140*(0.5-Math.random()),
	    y: 100*(i%4) + 90*(0.5-Math.random()),
	};
    });
    edges = [[0, 2], [0, 4], [0, 5], [0, 6], [0, 12], [1, 4], [1, 5], [1, 7],
	     [1, 9], [1, 15], [2, 8], [2, 13], [2, 16], [2, 19], [3, 10],
	     [3, 11], [3, 13], [3, 14], [3, 19], [4, 12], [4, 14], [4, 19],
	     [5, 8], [5, 9], [5, 16], [6, 8], [6, 16], [6, 17], [6, 18],
	     [7, 9], [7, 10], [7, 11], [7, 18], [8, 12], [8, 13], [9, 15],
	     [9, 17], [10, 11], [10, 13], [10, 19], [11, 16], [11, 19],
	     [12, 14], [12, 16], [13, 15], [14, 17], [14, 18], [15, 17],
	     [15, 18], [17, 18]].map(function(e) { return { f:e[0], t:e[1] } });
    graph("#grrr-no", nodes, edges);

    var mat = Array(400).fill(0);
    edges.forEach(function(e) { mat[20*e.f + e.t] = mat[20*e.t + e.f] = 1; });
    var adj = $('#grrr-adj');
    for (var i = 0; i < 20; i++) {
	var r = adj.append('tr');
	for (var j = 0; j < 20; j++) {
	    r.append('td ' + mat[20*i + j]);
	}
    }
})();

(function() {
    $$('.sudoku,#grrr-adj').forEach(function(s) {
	s.css({
	    'MozUserSelect': 'all',
	    'WebkitUserSelect': 'all',
	    'userSelect': 'all',
	});
	var data = '[' + s.$$('tr').map(function(r) {
	    return '[' + r.$$('td').map(function(c) {
		var x = c.textContent;
		return x == ' ' ? '0' : x;
	    }).join(',') + ']'
	}).join(',\n ') + ']';
	s.addEventListener('copy', function(e) {
	    e.clipboardData.setData('text/plain', data);
	    e.preventDefault();
	});
    });
})()
