import React, { useState } from "react";
import { Button } from "../ui/button";

const PlanModal = ({ plan, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    description: plan?.description || "",
    planType: plan?.planType.toUpperCase() || "basic",
    price: parseInt(plan?.price, 10) || "",
    duration: plan?.duration || "monthly",
  });
  const [features, setFeatures] = useState(plan?.features || []);
  const [featureInput, setFeatureInput] = useState("");
  const [error, setError] = useState(null);

  // Handle changes to text inputs for plan details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Adds a feature to the list if input is not empty
  const addFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  // Removes a feature from the list based on its index
  const handleRemoveFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  // Handle form submission by merging the features into the plan data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price) {
      setError("All fields are required");
      return;
    }
    const planData = {
      ...formData,
      features: features,
      price: parseInt(formData.price, 10),
    };
    onSave(planData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          {plan ? "Edit Plan" : "Create New Plan"}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Plan Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Plan Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
            ></textarea>
          </div>
          {/* Plan Type */}
          <div className="mb-4">
            <label className="block text-gray-700">Plan Type</label>
            <select
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="BASIC">Basic</option>
              <option value="PREMIUM">Premium</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </div>
          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700">Price (NGN)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Duration */}
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          {/* Features Section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Features</label>
            <div className="mb-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-1 text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a feature and press Enter"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          {/* Form Actions */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 text-gray-500"
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              loading={loading}
              // disable={}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;
