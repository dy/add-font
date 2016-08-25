require('enable-mobile');
const addFont = require('./');

// //by url w/o extension - will insert eot, woff2, woff and ttf
// addFont('//cdn.jsdelivr.net/font-hack/2.020/fonts/eot/latin/hack-regular-latin-webfont', `
// 	font-family: Hack;
// 	font-weight: normal;
// `);

// //Non-URL will try to fetch font from google fonts and register by the same name
// addFont('Material Icons', 400);

// //Buffer will insert raw data as a font
// addFont(myFont.toArrayBuffer(), {
// 	fontStyle: 'italic',
// 	fontFamily: 'noname'
// });


//CSS URL inserts the <link> to head
addFont('//cdn.jsdelivr.net/font-hack/2.020/css/hack.min.css');

let el1 = document.body.appendChild(document.createElement('pre'));
el1.style.fontFamily = 'Hack';
el1.innerHTML = `addFont(//cdn.jsdelivr.net/font-hack/2.020/css/hack.min.css');`;

//Font URL w/o extension inserts eot, woff2, woff, ttf, svg and otf versions
addFont('https://cdnjs.cloudflare.com/ajax/libs/css-social-buttons/1.2.0/css/zocial',
	`font-family: zocial; font-weight: normal;`);
let el2 = document.body.appendChild(document.createElement('div'));
el2.style.fontFamily = 'zocial';
let str = ''; for (let i = 0; i < 103; i++) {
	str += String.fromCharCode(0xf100 + i) + ' ';
}
el2.innerHTML = str;

//Font URL with extension inserts only target font file
addFont('./wavefont.otf', 'wavefont');
let el3 = document.body.appendChild(document.createElement('div'));
el3.style.fontFamily = 'wavefont';
el3.style.fontSize = '32px';
str = ''; for (let i = 0; i < 256; i++) {
	str += String.fromCharCode(0x200 - 127 + i);
}
el3.innerHTML = str;

//ArrayBuffer will insert raw data as a font
addFont(myFont.toArrayBuffer(), `font-weight: bold; font-family: my-font-${id};`);