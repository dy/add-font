/**
 * @module  add-font
 *
 * Register font from url or arrayBuffer
 */
'use strict';

const style = require('insert-styles');
const isUrl = require('is-url');
const extname = require('get-ext');

module.exports = addFont;


let fontMap = {};
let _URL = window.URL || window.webkitURL;
let extensions = ['eot', 'woff', 'woff2', 'ttf', 'svg', 'otf'];
let format = {eot: 'embedded-opentype', woff2: 'woff2', woff: 'woff', ttf: 'truetype', svg: 'svg', otf: 'opentype'};


//main method
function addFont (src, desc) {
	desc = desc || '';

	//buffer case
	if (src instanceof ArrayBuffer) {
		return addFromBuffer(src, desc);
	}

	if (typeof src != 'string') throw 'Argument should be a font name string or ArrayBuffer';

	let name;
	let ext = extname(src);

	//insert css link
	if (ext === '.css') {
		if (document.querySelector(`[src="${src}"]`)) return;
		let link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('src', src);
		document.head.appendChild(link);
		return;
	}


	name = getFamilyName(desc);

	//url case
	let urls = [];

	if (Array.isArray(src)) {
		urls = src;
	}

	//if no extension - include all font variants
	if (!format[ext.slice(1)]) {
		for (let i = 0; i < extensions.length; i++) {
			urls.push(src + '.' + extensions[i]);
		}
	}
	else {
		urls.push(src);
	}

	//create string of fonts
	let srcStr = 'src: ';
	for (let i = 0; i < urls.length; i++) {
		let url = urls[i];
		let ext = extname(url);
		let filepath = url.slice(0, -ext.length);
		if (ext === '.eot') {
			srcStr += `url("${filepath + '.eot'}");\n`;
			srcStr += `src: url("${filepath+'.eot?#iefix'}") format("${format.eot}"),\n`;
		} else {
			srcStr += `url("${filepath + ext}") format("${format[ext.slice(1)]}"),\n`;
		}
	}
	srcStr = srcStr.trim().slice(0, -1);

	style(`
	@font-face {
		font-family: "${name}";
		${srcStr};
		${desc}
	}
	`, { id: name });
}


//buffer method
function addFromBuffer (buffer, desc) {
	let name = getFamilyName(desc);

	//new style
	if (document.fonts) {
		if ( fontMap[name] ) {
			document.fonts.delete( fontMap[name] );
		}

		let fontFace = fontMap[name] = new window.FontFace(name, buffer);

		if ( fontface.status === 'error' ) {
			throw new Error('Fontface is invalid and cannot be displayed');
		}

		document.fonts.add(fontFace);
	}

	//old style
	else {
		let url = _URL.createObjectURL(new Blob(
			[ new DataView(buffer) ],
			{ type: 'font/opentype' }
		));

		if ( fontMap[name] ) {
			_URL.revokeObjectURL( fontMap[name] );
		}

		style(`
		@font-face {
			font-family: "${name}";
			src: url(${url});
		}
		`, { id: name });

		fontMap[name] = url;
	}
}

//get font name from string
function getFamilyName (cssString) {
	if (!/:/.test(cssString)) return cssString;
	return /font(?:-family)?\s*:\s*"?([^;,"']*)"?/ig.exec(cssString)[1] || cssString;
}

