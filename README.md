Lipsify - Random Lorem Ipsum Generator 
======================================

About
-----

Lipsify replaces text placeholders in your HTML templates to "Lorem Ipsum" texts. By using placeholders you can keep your template code short and clean.
Another benefit is that the replaced text will be random (with slightly different lenght) and thus its really easy to find places where your layout could break or look bad if there's too long or too short text.

Installation
------------

```
bower install lipsify --save-dev
```

Attention: do not include lipsify in production!


Usage
-----

Just include lipsify.js in your HTML document and write hash characters instead of text (in tag content or attributes).


`\#` - __one word__ "Consectetur"

`\#\#` - __a phrase__ "Sed do eiusmod tempor"

`\#\#\#` - __one sentence__ "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

`\#\#\#\#` - __one paragraph__ "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


Attributes `href`, `src`, `action` and `value` are excluded from replacement for obvious reasons.


```
<script src="path/to/lipsify.js"></script>
```

If you're using some king of ajax loading or markup generation, lipsify won't replace placeholders in new markup generated after `onload` event. Anyway, you can run lipsify manually.

```
lispify();
```


Questions?
----------

If you have any questions, please feel free to contact me.

[email@michalrusina.sk](email@michalrusina.sk) 