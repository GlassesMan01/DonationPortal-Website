import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ListCases() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);

  const role = Cookies.get("role");
  const listedCasesPage = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("image", image);

    Axios.post("http://localhost:3001/listedCase", formData)
      .then((response) => {
        console.log("Success:", response.data);
        listedCasesPage("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {role === "admin" && (
        <form
          className="container my-5"
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="mb-3">
            <label htmlFor="inputHeading" className="form-label">
              Heading
            </label>
            <input
              type="text"
              className="form-control"
              id="inputHeading"
              value={heading}
              onChange={(event) => setHeading(event.target.value)}
              required
              placeholder="Case Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="inputDescription"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter the case details"
              required
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="inputImage" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              id="inputImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <p>Selected Image: {image.name}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="inputAmount" className="form-label">
              Amount Required
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAmount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
              placeholder="$2000/-"
            />
          </div>

          <div className="mb-4">
            <center>
              <button type="submit" className="btn btn-dark">
                List Case
              </button>
            </center>
          </div>
        </form>
      )}
    </>
  );
}
