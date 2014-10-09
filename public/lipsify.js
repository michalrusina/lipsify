/*
 * lipsify v1.0.0 09/10/2014
 * http://github.com/michalrusina/lipsify
 *
 * Michal Rusina
 * email@michalrusina.sk
 *
 */

function lipsify(options) {
	function init(options) {
		var counters = {},
			node = (options && options.node) ? options.node : document.body,
			random = (options && options.random) ? options.random : true,
			strings = (options && options.strings) ? options.strings : {
				'####': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'],
				'###': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'],
				'##': ['Lorem ipsum dolor', 'Consectetur adipisicing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore et dolore magna', 'Ut enim ad minim veniam', 'Quis nostrud exercitation ullamco', 'Laboris nisi ut', 'Aliquip ex ea commodo', 'Duis aute irure dolor', 'In reprehenderit in voluptate', 'Velit esse cillum'],
				'#': ['Lorem', 'Ipsum', 'Dolor', 'Consectetur', 'Adipisicing', 'Elit', 'Sed', 'Eiusmod', 'Tempor', 'Incididunt', 'Ut', 'Labore', 'Dolore', 'Magna']
			};

		for (var trigger in strings) {
			counters[trigger] = (random) ? Math.floor(Math.random() * strings[trigger].length + 1) : 0;
		}

		function pickString(trigger) {
			if (counters[trigger] === strings[trigger].length) { counters[trigger] = 0; }
			return strings[trigger][counters[trigger]++];
		}

		function replaceString(text) {
			for (var trigger in strings) {
				var splitted = text.split(trigger);

				for (var k = 0, l = splitted.length; k < l - 1; ++k) {
					splitted[k] += pickString(trigger);
				}

				var text = splitted.join('');
			}

			return text;
		}

		function traverseChildren(node) {
			if (node.nodeType === 1) {
				var attributes = Array.prototype.slice.call(node.attributes);
				for (attribute in attributes) {
					if (node.nodeName.toLowerCase() == 'a' && attributes[attribute].nodeName == 'href') continue;
					attributes[attribute].value = replaceString(attributes[attribute].value);
				}
			}

			if (node.nodeType === 3 && !(/^\s*$/).test(node.nodeValue)) {
				node.nodeValue = replaceString(node.nodeValue, strings);
			}

			else {
				for (var i = 0, j = node.childNodes.length; i < j; ++i) {
					traverseChildren(node.childNodes[i]);
				}
			}
		}

		traverseChildren(node);
	}

	function addLoad(func) {
		if (typeof window.onload !== 'function') {
			window.onload = func;
		}

		else {
			var oldLoad = window.onload;
			window.onload = function() {
				if (oldLoad) { oldLoad(); }
				func();
			};
		}
	}

	(document.body) ? init(options) : addLoad(function() { lipsify(); });
}

lipsify();