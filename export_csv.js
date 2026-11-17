const fs = require('fs');

let code = fs.readFileSync('C:/Users/hp/.gemini/antigravity/scratch/core-sneakers/js/products.js', 'utf8');
code = code.replace(/const PRODUCTS_DATA =/, 'global.PRODUCTS_DATA =');
eval(code);

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    str = '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

const headers = ['ID', 'Name', 'Gender', 'Category', 'Price (INR)', 'Original Price', 'Rating', 'Reviews Count', 'Badge', 'Section', 'Sizes', 'Colors', 'Images', 'Description', 'Details'];
const rows = [headers.join(',')];

for (const p of global.PRODUCTS_DATA) {
  const row = [
    escapeCsv(p.id),
    escapeCsv(p.name),
    escapeCsv(p.gender),
    escapeCsv(p.category),
    escapeCsv(p.price),
    escapeCsv(p.originalPrice),
    escapeCsv(p.rating),
    escapeCsv(p.reviewsCount),
    escapeCsv(p.badge),
    escapeCsv(p.section),
    escapeCsv((p.sizes || []).join(', ')),
    escapeCsv((p.colors || []).map(c => c.name).join(', ')),
    escapeCsv((p.images || []).join('\n')),
    escapeCsv(p.description),
    escapeCsv((p.details || []).join(' | '))
  ];
  rows.push(row.join(','));
}

fs.writeFileSync('C:/Users/hp/.gemini/antigravity/scratch/core-sneakers/products_catalog.csv', '\uFEFF' + rows.join('\r\n'), 'utf8');
console.log('Successfully generated products_catalog.csv with total rows:', rows.length);
