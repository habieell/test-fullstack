import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function CreateProduct() {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // Tambahkan createOn dan transactionDate
    const now = new Date().toISOString()
    product.createOn = now
    product.transactionDate = now

    if (
      !product.productID ||
      !product.productName ||
      !product.amount ||
      !product.customerName ||
      !product.status ||
      !product.createBy
    ) {
      alert("Please fill all fields");
      return
    }

    try {
      const response = await fetch("http://localhost:4000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Kirim data dalam format JSON
      })

      const data = await response.json()
      
      if (response.ok) {
        navigate("/admin/products")
      } else if (response.status === 400) {
        setValidationErrors(data)
      } else {
        alert("Unable to create product")
      }
    } catch (error) {
      alert("Unable to connect to server!")
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
                <input className="form-control" name="productID" />
                <span className="text-danger">{validationErrors.ProductID}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Product Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="productName" />
                <span className="text-danger">{validationErrors.productName}</span>
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
                />
                <span className="text-danger">{validationErrors.amount}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Customer Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="customerName" />
                <span className="text-danger">{validationErrors.customerName}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Status</label>
              <div className="col-sm-8">
                <select className="form-select" name="status">
                  <option value="0">Success</option>
                  <option value="1">Failed</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Create By</label>
              <div className="col-sm-8">
                <input className="form-control" name="createBy" />
                <span className="text-danger">{validationErrors.createBy}</span>
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
  )
}
