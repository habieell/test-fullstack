const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.post("/products", (req, res, next) => {
    let date = new Date();
    let hasError = false
    let errors = {}
    
    req.body.createOn = date.toISOString();
    req.body.transactionDate = date.toISOString();

    
    if (req.body.productID.length < 5) {
        hasError = true;
        errors.productID = "Product ID must be at least 5 characters";
    }
    
    if (req.body.productName.length < 5){
        hasError = true
        errors.productName = "Product Name must be at least 5 characters"
    }

    if (req.body.amount < 0){
        hasError = true
        errors.amount = "Amount must be at least 1"
    }

    if (req.body.customerName.length < 5){
        hasError = true
        errors.customerName = "Customer Name must be at least 5 characters"
    }

    if (req.body.createBy.length < 3){
        hasError = true
        errors.createBy = "Create By must be at least 3 characters"
    }

    if (req.body.status <= 0){
        hasError = true
        errors.createBy = "Choose a valid status"
    }

    if (hasError){
        res.status(400).jsonp(errors)
        return
    }


  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
