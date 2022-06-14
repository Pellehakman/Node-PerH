const nedb = require('nedb-promise');
const database = new nedb({
  filename: 'menu.db',
  autoload: true
});















async function placeProduct(product) {
  const change = await database.insert(product)
  return change
};

async function removeProduct(productRemove) {

  await database.remove(productRemove), {
      multi: true
    },
    function (err, numRemoved) {
      if (!err) {
        console.log('REMOVED' + numRemoved)
      } else {
        console.log("ERROR" + err)
      }
    }

}

async function getMenu() {
  let result = await database.find({});
  if (result.length === 0) {
    result = await database.insert((require('../menu.json')))
  }
  return result;
};

module.exports = {
  getMenu,
  placeProduct,
  removeProduct
}