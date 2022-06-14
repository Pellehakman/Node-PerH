const express = require('express')
const app = express();
const PORT = 8000;
const fs = require('fs')
app.use(express.json());

const accountRouter = require('./routes/account');
const orderRouter = require('./routes/order');
const menuRouter = require('./routes/menu');

const apiKeys = [    
  '7fh3hJhlvcaFFlfe34',
  'JF8jb3982JJFjcqx20',
  '098g3KfknvNJHf93j8',
  '342jJJf3jfkovupuHE',
  '4JfmJF93502jmfm9fF',
]

app.get('/api/key', (req, res) => {
  const index = Math.floor(Math.random() * apiKeys.length)
  const apiKey = apiKeys[index]
  const resObj = { key: apiKey }
  res.json(resObj)
})


app.use('/api/account', accountRouter);
app.use('/api/order', orderRouter);
app.use('/api/menu', menuRouter);


 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});