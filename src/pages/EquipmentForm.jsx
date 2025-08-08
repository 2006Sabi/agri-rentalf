import React, { useState } from "react";
import "./EquipmentForm.css";

const EquipmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pricing: { hourly: 0, daily: 0 },
    location: { address: "", city: "", state: "", pincode: "" },
    images: [{ url: "", alt: "", isPrimary: true }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Tractor", "Harvester", "JCB", "Tiller", "Sprayer"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, field, value) => {
    const updated = [...formData.images];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, images: updated });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: "", alt: "", isPrimary: false }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitted Data:", formData);
      alert("Equipment added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "",
        pricing: { hourly: 0, daily: 0 },
        location: { address: "", city: "", state: "", pincode: "" },
        images: [{ url: "", alt: "", isPrimary: true }],
      });
    } catch (err) {
      alert("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="equipment-form-container">
      <h1>Add Equipment</h1>
      <p>Fill in the details to list your equipment</p>

      <div className="info-section">
        <h3>Note:</h3>
        <ul>
          <li>Please ensure your equipment details are accurate.</li>
          <li>
            Only public image URLs are supported (e.g., from Imgur or
            Cloudinary).
          </li>
          <li>All fields marked with * are mandatory.</li>
          <li>Rates must be entered in Indian Rupees (₹).</li>
        </ul>
      </div>

      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Equipment Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row-2">
          <div className="input-group">
            <label>Hourly Rate (₹)</label>
            <input
              type="number"
              name="pricing.hourly"
              value={formData.pricing.hourly}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Daily Rate (₹)</label>
            <input
              type="number"
              name="pricing.daily"
              value={formData.pricing.daily}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Address</label>
          <input
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
          />
        </div>

        <div className="row-2">
          <div className="input-group">
            <label>City</label>
            <input
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>State</label>
            <input
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Pincode</label>
          <input
            name="location.pincode"
            value={formData.location.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="image-group">
          <h4>Images</h4>
          {formData.images.map((img, index) => (
            <div className="row-2" key={index}>
              <div className="input-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={img.url}
                  onChange={(e) =>
                    handleImageChange(index, "url", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <label>Alt Text</label>
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) =>
                    handleImageChange(index, "alt", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add-image-btn"
            onClick={addImageField}
          >
            + Add Image
          </button>
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? "Adding Equipment..." : "Add Equipment"}
        </button>
      </form>
    </div>
  );
};

export default EquipmentForm;
