import { useState, useEffect } from "react";
import Button from "./Button";

const StaffForm = ({
  onSubmit,
  defaultValues = {},
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name || "",
        email: defaultValues.email || "",
        password: "",
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border rounded p-2"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border rounded p-2"
        required
      />
      {!defaultValues || !defaultValues._id ? (
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border rounded p-2"
          required
        />
      ) : null}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {defaultValues && defaultValues._id ? "Update" : "Create"}

        </Button>
      </div>
    </form>
  );
};

export default StaffForm;
