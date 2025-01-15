const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/products", (req, res, next) => {
  let date = new Date();
  let hasError = false;
  let errors = {};

  // Simpan tanggal dengan waktu lengkap
  req.body.createOn = date.toISOString().replace("T", " ").split(".")[0];
  req.body.transactionDate = date.toISOString().replace("T", " ").split(".")[0];

  if (req.body.productID.length < 5) {
    hasError = true;
    errors.productID = "Product ID must be at least 5 characters";
  }

  if (req.body.productName.length < 5) {
    hasError = true;
    errors.productName = "Product Name must be at least 5 characters";
  }

  if (req.body.amount < 1) {
    hasError = true;
    errors.amount = "Amount must be at least 1";
  }

  if (req.body.customerName.length < 5) {
    hasError = true;
    errors.customerName = "Customer Name must be at least 5 characters";
  }

  if (req.body.createBy.length < 3) {
    hasError = true;
    errors.createBy = "Create By must be at least 3 characters";
  }

  if (hasError) {
    res.status(400).jsonp(errors);
    return;
  }

  next();
});

server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
