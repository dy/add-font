# add-font [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Register new font-face for the current web page by URL or from ArrayBuffer.

[![npm install add-font](https://nodei.co/npm/add-font.png?mini=true)](https://npmjs.org/package/add-font/)

```js
const addFont = require('add-font');

//CSS URL inserts the <link> to head
addFont('//cdn.jsdelivr.net/font-hack/2.020/css/hack.min.css');

//Font URL w/o extension inserts eot, woff2, woff, ttf, svg and otf versions
addFont('//cdn.jsdelivr.net/font-hack/2.020/fonts/eot/latin/hack-regular-latin-webfont', `font-family: Hack; font-weight: normal;`);

//Font URL with extension inserts only target font file
addFont('./wavefont.otf', 'wavefont');

//ArrayBuffer will insert raw data as a font
addFont(myFont.toArrayBuffer(), `font-weight: bold; font-family: my-font-${id};`);
```

## API

**`addFont(cssUrl)`**<br/>
**`addFont(fontUrl, cssString|fontName)`**<br/>
**`addFont(fontUrlList, cssString|fontName)`**<br/>
**`addFont(arrayBuffer, cssString|fontName)`**

Attach font to the page, apply additional parameters, which are whether font name or `@font-face` properties, eg `font-family: <x>; font-style: <y>; font-weight: <z>`.

## Related

* [google-fonts](https://github.com/hughsk/google-fonts) — attach google fonts by name.
* [webfontloader](https://github.com/typekit/webfontloader) — solution for all possible font include cases.