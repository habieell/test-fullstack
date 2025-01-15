import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/data/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch(() => alert("Unable to fetch product details"));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Product Detail</h2>
      <div className="row mb-3">
        <div className="col-sm-4">Product ID:</div>
        <div className="col-sm-8">{product.productID}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Product Name:</div>
        <div className="col-sm-8">{product.productName}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Amount:</div>
        <div className="col-sm-8">{product.amount}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Customer Name:</div>
        <div className="col-sm-8">{product.customerName}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Status:</div>
        <div className="col-sm-8">{product.status === 0 ? "SUCCESS" : "FAILED"}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Transaction Date:</div>
        <div className="col-sm-8">{product.transactionDate}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Create By:</div>
        <div className="col-sm-8">{product.createBy}</div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">Create On:</div>
        <div className="col-sm-8">{product.createOn}</div>
      </div>
      <div className="row">
        <div className="col-sm-12 d-grid">
          <Link className="btn btn-secondary" to="/admin/products">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}