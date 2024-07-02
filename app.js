const express = require('express');
const bodyParser = require('body-parser');

const { getStoredItems, storeItems } = require("/Users/mohamed.moghazi/Desktop/WBS coding/repos/React/dummy-backend/data/Items");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>
{
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/items', async (req, res) =>
{
  const storeditems = await getStoredItems();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ items: storeditems });
});

app.get('/diaries/:id', async (req, res) =>
{
  const storeditems = await getStoredItems();
  const item = storeditems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post('/items', async (req, res) =>
{
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: 'Stored new item.', item: newItem });
});

app.listen(8080);
