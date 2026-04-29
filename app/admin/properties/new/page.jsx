"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const INITIAL = {
  title: "", description: "", type: "residential", status: "available",
  price: "", address: "", city: "", state: "", country: "Nigeria",
  bedrooms: "", bathrooms: "", areaSqm: "",
};

export default function NewPropertyPage() {
  const { authFetch } = useAuth();
  const router = useRouter();
  const [form, setForm]     = useState(INITIAL);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authFetch("/api/properties", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price:     Number(form.price),
          bedrooms:  form.bedrooms  ? Number(form.bedrooms)  : undefined,
          bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
          areaSqm:   form.areaSqm   ? Number(form.areaSqm)   : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create property");
      router.push("/admin/properties");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Property</h1>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-xl border border-gray-200 bg-white p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Type *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="luxury">Luxury</option>
              <option value="land">Land</option>
              <option value="new_launch">New Launch</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
              <option value="off_market">Off Market</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Price (₦) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Area (sqm)</label>
            <input name="areaSqm" type="number" value={form.areaSqm} onChange={handleChange} min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Bedrooms</label>
            <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Bathrooms</label>
            <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Address *</label>
            <input name="address" value={form.address} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">State</label>
            <input name="state" value={form.state} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50">
            {loading ? "Saving…" : "Save Property"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
