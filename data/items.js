const fs = require('node:fs/promises');

async function getStoredItems()
{
  const rawFileContent = await fs.readFile('items.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storeItems = data.items ?? [];
  return storeItems;
}

function storeItems(items)
{
  return fs.writeFile('items.json', JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;