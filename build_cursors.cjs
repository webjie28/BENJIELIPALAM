const fs = require('fs');

function createSvg(matrix, fillMap) {
  const lines = matrix.trim().split('\n');
  const h = lines.length;
  const w = Math.max(...lines.map(l => l.length));
  
  let rects = '';
  for(let y=0; y<h; y++) {
    for(let x=0; x<lines[y].length; x++) {
      const c = lines[y][x];
      if (fillMap[c]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fillMap[c]}"/>`;
      }
    }
  }
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${rects}</svg>`;
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

const arrowGrid = `
W
WW
WBW
WBBW
WBBBW
WBBBBW
WBBBBBW
WBBBBBBW
WBBBBBBBW
WBBBBBBBBW
WBBBBBBBBBW
WBBBBBBBBBBW
WBBBBBBWWWWW
WBBBWBBW
WBBW WBBW
WBW  WBBW
WW   WBBW
      WBBW
      WBBW
       WW
`;

const handGrid = `
     BB
    BWWB
    BWWB
    BWWB
    BWWB  BB BB BB
    BWWB BWWBWWBWWB
   BBWWB BWWBWWBWWB
  BWWWWB BWWBWWBWWB
 BWWWWWB BWWWWWWWWB
BWWWWWWB BWWWWWWWWB
BWWWWWWWBBWWWWWWWWB
 BWWWWWWBBWWWWWWWWB
  BWWWWWWWWWWWWWWB
   BWWWWWWWWWWWB
    BWWWWWWWWWB
     BBBBBBBBB
`;

const textGrid = `
   BBBBB
     B
     B
     B
     B
     B
     B
     B
     B
     B
     B
     B
     B
   BBBBB
`;

const arrowUri = createSvg(arrowGrid, { 'W': 'white', 'B': 'black' });
const handUri = createSvg(handGrid, { 'W': 'white', 'B': 'black' });
const textUri = createSvg(textGrid, { 'W': 'black', 'B': 'black' }); // Or maybe text should just be white text cursor? No, Mac text cursor is black.

console.log('/* --- Custom Retro Mac Cursors --- */');
console.log(`
body, html {
  cursor: url('${arrowUri}') 1 1, auto !important;
}

a, button, .cta-btn, .project-card, .social-icon-btn, .hero-social-link, [role="button"] {
  cursor: url('${handUri}') 6 1, pointer !important;
}

p, h1, h2, h3, h4, h5, h6, span {
  cursor: url('${textUri}') 5 8, text;
}
`);
