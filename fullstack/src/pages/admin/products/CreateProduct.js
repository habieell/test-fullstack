import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CreateProduct() {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(1); // Default ID

  useEffect(() => {
    async function fetchLatestId() {
      try {
        const response = await fetch("http://localhost:4000/data");
        const existingData = await response.json();

        // Cari ID tertinggi yang ada, lalu tambahkan 1
        let maxID = existingData.reduce(
          (max, item) => Math.max(max, parseInt(item.id) || 0),
          0
        );

        setNextId(maxID + 1);
      } catch (error) {
        console.error("Error fetching latest ID:", error);
      }
    }
    fetchLatestId();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // Set ID yang berurutan
    product.id = nextId.toString();

    // Format tanggal & waktu (YYYY-MM-DD HH:MM:SS)
    const now = new Date();
    const formattedDate = now.toISOString().replace("T", " ").split(".")[0];

    product.createOn = formattedDate;
    product.transactionDate = formattedDate;

    try {
      const response = await fetch("http://localhost:4000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        navigate("/admin/products");
      } else {
        alert("Unable to create product");
      }
    } catch (error) {
      alert("Unable to connect to server!");
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Product ID</label>
              <div className="col-sm-8">
                <input className="form-control" name="productID" required />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Product Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="productName" required />
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
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Customer Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="customerName" required />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Status</label>
              <div className="col-sm-8">
                <select className="form-select" name="status" required>
                  <option value="0">Success</option>
                  <option value="1">Failed</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Create By</label>
              <div className="col-sm-8">
                <input className="form-control" name="createBy" required />
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
