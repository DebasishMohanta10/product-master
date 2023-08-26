// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  let product = null

  // get a product by ID
  product= productsList.find(prod => prod.id === productId)

  if (!product){
    return done("Requested product doesn't exist..!",null)
  }

  return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
  // save a product
  // check for duplicate product name
  const existingProduct= productsList.filter((existingProd) => existingProd.id === newProduct.id)
  if(existingProduct.length !== 0){
    return done("Product already exists..!",null);
  }
  productsList.push(newProduct);
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  product = productsList.findIndex(prod => prod.id === productId)
  if(product === -1){
    return done("Requested product doesn't exist..!",null)
  }
  productsList[product] = {...productsList[product],...updateData}
  updatedProductList = productsList.concat();
  return done(null, JSON.stringify(updatedProductList));
}

const deleteProduct = (productId, done) => {
  // delete a product
  product = productsList.findIndex(prod => prod.id === productId)
  console.log(productId);
  if(product === -1){
    return done("Requested product doesn't exist..!",null)
  }
  productsList.splice(product,1)    
  return done(null, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}