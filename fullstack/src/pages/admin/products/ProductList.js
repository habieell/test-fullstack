import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  function getProducts() {
    fetch("http://localhost:4000/data")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => alert("Unable to fetch data"));
  }

  useEffect(getProducts, []);

  function deleteProduct(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch("http://localhost:4000/data/" + id, { method: "DELETE" })
      .then((response) => {
        if (response.ok) getProducts();
        else throw new Error();
      })
      .catch(() => alert("Unable to delete product"));
  }

  function sortData(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setProducts(sortedProducts);
  }

  function getSortIcon(key) {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "⇅";
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>

      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/admin/products/create">Create Product</Link>
          <button type="button" className="btn btn-outline-primary" onClick={getProducts}>Refresh</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortData("id")} style={{ cursor: "pointer" }}>ID {getSortIcon("id")}</th>
            <th onClick={() => sortData("productID")} style={{ cursor: "pointer" }}>ProductID {getSortIcon("productID")}</th>
            <th onClick={() => sortData("productName")} style={{ cursor: "pointer" }}>Product Name {getSortIcon("productName")}</th>
            <th onClick={() => sortData("amount")} style={{ cursor: "pointer" }}>Amount {getSortIcon("amount")}</th>
            <th onClick={() => sortData("customerName")} style={{ cursor: "pointer" }}>Customer Name {getSortIcon("customerName")}</th>
            <th onClick={() => sortData("status")} style={{ cursor: "pointer" }}>Status {getSortIcon("status")}</th>
            <th onClick={() => sortData("transactionDate")} style={{ cursor: "pointer" }}>Transaction Date {getSortIcon("transactionDate")}</th>
            <th onClick={() => sortData("createBy")} style={{ cursor: "pointer" }}>Create By {getSortIcon("createBy")}</th>
            <th onClick={() => sortData("createOn")} style={{ cursor: "pointer" }}>Create On {getSortIcon("createOn")}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.productID}</td>
              <td>{product.productName}</td>
              <td>{product.amount}</td>
              <td>{product.customerName}</td>
              <td>{product.status === 0 ? "SUCCESS" : "FAILED"}</td>
              <td>{product.transactionDate.slice(0, 10)}</td>
              <td>{product.createBy}</td>
              <td>{product.createOn.slice(0, 10)}</td>
              <td>
                <Link className="btn btn-primary btn-sm me-1" to={"/admin/products/edit/" + product.id}>Edit</Link>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}