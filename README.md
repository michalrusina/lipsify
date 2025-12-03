# Lipsify - Random Lorem Ipsum Generator

[![Build Status](https://travis-ci.org/michalrusina/lipsify.svg?branch=master)](https://travis-ci.org/michalrusina/lipsify)

Lipsify replaces text placeholders in your HTML templates to "Lorem Ipsum" texts. By using placeholders you can keep your demo template code short, clean and thus readable.
Another benefit is that the replaced text will be random (with slightly different lenght) and thus its really easy to find places where your layout could break or look bad if there's too long or too short text.

**Warning: Its not a good idea in include lipsify in production unless you know what yuore doing.**

## Features

-   Replaces placeholders with random "Lorem Ipsum" text.
-   **Dynamic Content Support**: Automatically replaces placeholders in content added to the DOM after initial page load (e.g., via AJAX) using a `MutationObserver`.
-   Placeholders for one word, a phrase, one sentence, and one paragraph.
-   Placeholders for an exact number of words.
-   Placeholders for a random number of words.
-   Attributes `href`, `src`, `action`, and `value` are excluded from replacement to prevent breaking functionality.

## Usage

Lipsify is distributed in the `dist` folder, providing both unminified and minified versions.

### Direct Inclusion (UMD)

Include `dist/lipsify.js` or `dist/lipsify.min.js` directly in your HTML document.

```html
<script src="dist/lipsify.min.js"></script>
```

### ES Module

If you are using a module bundler, you can import Lipsify as an ES module:

```javascript
import 'lipsify'; // Assuming 'lipsify' resolves to 'dist/lipsify.js' or 'dist/lipsify.esm.js'
// Or directly:
import '../dist/lipsify.js';
```

After including, write hash characters instead of text (in tag text content or attributes) as placeholders:

-   `§` - **one word** `Consectetur`

-   `§§` - **a phrase** `Sed do eiusmod tempor`

-   `§§§` - **one sentence** `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

-   `§§§§` - **one paragraph** `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

-   `§3§` - **exact number of words** In this case `Lorem ipsum dolor`

-   `§3§6§` - **random number of words** In this case a phrase from 3 to 6 words

## CDN

You can use Lipsify from a CDN (e.g., unpkg):

```html
<script src="https://unpkg.com/lipsify/dist/lipsify.min.js"></script>
```

## Development

To contribute to the project:

1.  Fork the repository.
2.  Clone your fork.
3.  Install dependencies: `npm install`
4.  Make your changes in `src/lipsify.js`.
5.  Build the project: `npm run build`
6.  Run linting: `npm run lint`
7.  Create a new branch: `git checkout -b my-new-feature`
8.  Commit your changes: `git commit -am 'Add some feature'`
9.  Push to the branch: `git push origin my-new-feature`
10. Submit a pull request.

## Demo

See a live demonstration of Lipsify's features in `demo/index.html`.

## Author

**Michal Rusina**
- GitHub: [@michalrusina](https://github.com/michalrusina)
- Email: michalrusina@gmail.com
- Website: [https://www.michalrusina.sk](https://www.michalrusina.sk)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
