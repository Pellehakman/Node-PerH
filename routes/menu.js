const { Router } = require('express');
const router = Router();
const { getMenu, placeProduct, removeProduct } = require('../model/menudb');

const apiKeys = [    
    '7fh3hJhlvcaFFlfe34',
    'JF8jb3982JJFjcqx20',
    '098g3KfknvNJHf93j8',
    '342jJJf3jfkovupuHE',
    '4JfmJF93502jmfm9fF',
  ]
  
  function auth(request, response, next){
    console.log('*MIDDLEWARE*', `*PATH: ${request.url}*`,`*API-KEY: ${JSON.stringify(request.headers['api-key'])}*` )
    const apiKey = request.headers['api-key']  
    if(apiKey && apiKeys.includes(apiKey)){
      next();
    } else{
      const resObj={error: 'Access denied!'}
      response.json(resObj)
    }
  }  
  router.get('/key', (req, res) => {
    const index = Math.floor(Math.random() * apiKeys.length)
    const apiKey = apiKeys[index]
    const resObj = { key: apiKey }
    res.json(resObj)
  })

router.get('/', async (req, res) => {
    const menu = await getMenu()
    const resObj = {success: false};
    if (menu) { 
        resObj.success = true; 
        resObj.menu = menu} 
    else { 
        resObj.message = 'Error'};
        res.json(resObj);
});

router.post('/add', auth, async (req, res) => {
    const productArr = req.body
    const resObj = { success: false };

    if (productArr.hasOwnProperty('id') && productArr.hasOwnProperty('title') && productArr.hasOwnProperty('desc') && productArr.hasOwnProperty('price')) {
        const addProduct = await placeProduct(productArr);

    if (addProduct){
        resObj.success = true; 
        resObj.message = 'you have added one product'}; } 
    else {
        resObj.message = 'Wrong input'}
        res.json(resObj);

});

router.post('/remove', auth, async (req, res) => {
    const productRemove = req.body
    const resObj = { success: false };    
    if (productRemove.hasOwnProperty('title')) {
        resObj.success = true;
        resObj.message = 'you have removed the product'

        const remProduct = await removeProduct(productRemove);
        if (remProduct) { esObj.success = true };

        } else {
        resObj.message = 'You have entered the wrong format/title'
        resObj.success = false;
        }
    res.json(resObj);

});

module.exports = router