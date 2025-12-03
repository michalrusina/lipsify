(function () {
	'use strict';

	const paragraphs = [
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
		'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
	];

	const sentences = paragraphs.join(' ').split(/(?<=[.?!])\s+/);
	const words = sentences.join(' ').replace(/[.,?]/g, '').split(' ');

	/**
	 * Capitalizes the first letter of a string.
	 * @param {string} str - The string to capitalize.
	 * @returns {string} The capitalized string.
	 */
	function capitalize(str) {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Generates a random integer between two values, inclusive.
	 * @param {number} min - The minimum value.
	 * @param {number} max - The maximum value.
	 * @returns {number} A random integer.
	 */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Generates a string of words of a given length.
	 * @param {number} count - The number of words to generate.
	 * @returns {string} The generated string of words.
	 */
	function getWords(count) {
		const start = getRandomInt(0, words.length - count);
		const result = words.slice(start, start + count).join(' ');
		return capitalize(result);
	}

	/**
	 * Generates a string of sentences of a given length.
	 * @param {number} count - The number of sentences to generate.
	 * @returns {string} The generated string of sentences.
	 */
	function getSentences(count) {
		const start = getRandomInt(0, sentences.length - count);
		const result = sentences.slice(start, start + count).join(' ');
		return capitalize(result);
	}

	/**
	 * Generates a string of paragraphs of a given length.
	 * @param {number} count - The number of paragraphs to generate.
	 * @returns {string} The generated string of paragraphs.
	 */
	function getParagraphs(count) {
		const start = getRandomInt(0, paragraphs.length - count);
		const result = paragraphs.slice(start, start + count).join('\n\n');
		return capitalize(result);
	}

	/**
	 * Generates a random phrase.
	 * @returns {string} The generated phrase.
	 */
	function getPhrase() {
		const sentence = sentences[getRandomInt(0, sentences.length - 1)];
		const words = sentence.split(' ');
		const phraseLength = getRandomInt(3, 6);
		const result = words.slice(0, phraseLength).join(' ');
		return capitalize(result);
	}

	/**
	 * Replaces placeholders in a string with "Lorem Ipsum" text.
	 * @param {string} text - The text to process.
	 * @returns {string} The text with placeholders replaced.
	 */
	function replaceText(text) {
		text = text.replace(/§(\d+)§(\d+)§/g, (match, min, max) =>
			getWords(getRandomInt(parseInt(min), parseInt(max)))
		);
		text = text.replace(/§(\d+)§/g, (match, count) =>
			getWords(parseInt(count))
		);
		text = text.replace(/§§§§/g, () => getParagraphs(1));
		text = text.replace(/§§§/g, () => getSentences(1));
		text = text.replace(/§§/g, () => getPhrase());
		text = text.replace(/§/g, () => capitalize(words[getRandomInt(0, words.length - 1)]));
		return text;
	}

	/**
	 * Traverses the DOM and replaces placeholders with "Lorem Ipsum" text.
	 * @param {Node} node - The root node to traverse.
	 */
	function runLipsify(node) {
		const exceptions = ['href', 'src', 'action', 'value'];
		const walker = document.createTreeWalker(
			node,
			NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
			null
		);

		let currentNode;
		while ((currentNode = walker.nextNode())) {
			if (currentNode.nodeType === Node.ELEMENT_NODE) {
				for (let i = 0; i < currentNode.attributes.length; i++) {
					const attr = currentNode.attributes[i];
					if (exceptions.indexOf(attr.nodeName) === -1) {
						attr.value = replaceText(attr.value);
					}
				}
			} else if (
				currentNode.nodeType === Node.TEXT_NODE &&
				!/^\s*$/.test(currentNode.nodeValue)
			) {
				currentNode.nodeValue = replaceText(currentNode.nodeValue);
			}
		}
	}

	/**
	 * Executes a function when the DOM is fully loaded.
	 * @param {function} func - The function to execute.
	 */
	function addLoad(func) {
		if (document.readyState === 'complete') {
			func();
		} else {
			window.addEventListener('load', func);
		}
	}

	addLoad(function () {
		runLipsify(document.body);

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					runLipsify(node);
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
})();