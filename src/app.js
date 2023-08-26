//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 3000

const productsService = require("./productsService");
const getRequestData = require('./utils');
const { error } = require('console');
const { response } = require('express');

const server = http.createServer(async (req, res) => {
  // Get all products
  if(req.url === "/products" && req.method === "GET"){
    res.writeHead(200,{"Content-Type": "application/json"})
    res.end(productsService.getProducts())
  }
  // Get a product with specified id
  else if(req.url.match(/\/products\/([0-9])/) && req.method == "GET"){
    const id = req.url.split("/")[2]
    productsService.getProductsById(parseInt(id),(err,data) => {
      if(err){
        res.writeHead(404,{"Content-Type": "application/json"})
        res.end(err)
      }else{
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(data);
      }
    })
  }

  // Create a new product
  else if(req.url === "/products" && req.method === "POST"){
    let req_body = await getRequestData(request);
    productsService.saveProduct(JSON.parse(req_body),(err,data) => {
      if(err){
        res.writeHead(401,{"Content-Type": "application/json"})
        res.end(err)
      }else{ 
        res.writeHead(201,{"Content-Type": "application/json"})
        res.end(data);
      }
    })
    
  }

  // Update a specific product
  else if(req.url.match(/\/products\/([0-9])/) && req.method == "PUT"){
    let prodId = req.url.split("/")[2]
    let req_body = await getRequestData(req);
    productsService.updateProduct(parseInt(prodId),JSON.parse(req_body),(err,data) => {
      if(err){
        res.writeHead(404,{"Content-Type": "application/json"})
        res.end(err)
      }else{
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(data);
      }
    })
  }

  // Delete a specific Product
  else if(req.url.match(/\/products\/([0-9])/) && req.method == "DELETE"){
    let prodId = req.url.split("/")[2];
    productsService.deleteProduct(parseInt(prodId)),((err,data) => {
      if(err){
        response.writeHead(404,{"Content-Type": "application/json"})
        response.end(err)
      }else{
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(data);
      }
    })
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})