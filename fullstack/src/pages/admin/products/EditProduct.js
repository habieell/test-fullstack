import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditProduct() {
  const params = useParams();
  const [initialData, setInitialData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/data/${params.id}`)
      .then((response) => response.json())
      .then((data) => setInitialData(data))
      .catch(() => alert("Unable to fetch product"));
  }, [params.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (Object.keys(initialData).length === 0) {
      alert("Product data is still loading. Please wait.");
      return;
    }

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // Ensure the status is converted to a number
    product.status = Number(product.status);

    try {
      const response = await fetch(`http://localhost:4000/data/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        navigate("/admin/products");
      } else {
        alert("Unable to update product");
      }
    } catch {
      alert("Unable to connect to server!");
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="productID" value={params.id} />

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Product Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="productName"
                  value={initialData.productName || ""}
                  onChange={(e) => setInitialData({ ...initialData, productName: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Amount</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="amount"
                  type="number"
                  min="1"
                  value={initialData.amount || ""}
                  onChange={(e) => setInitialData({ ...initialData, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Customer Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="customerName"
                  value={initialData.customerName || ""}
                  onChange={(e) => setInitialData({ ...initialData, customerName: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Status</label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="status"
                  value={initialData.status || 0}
                  onChange={(e) => setInitialData({ ...initialData, status: e.target.value })}
                >
                  <option value="0">Success</option>
                  <option value="1">Failed</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Create By</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="createBy"
                  value={initialData.createBy || ""}
                  onChange={(e) => setInitialData({ ...initialData, createBy: e.target.value })}
                />
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to="/admin/products">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
