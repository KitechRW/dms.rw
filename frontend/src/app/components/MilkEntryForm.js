"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MilkEntryForm({ onSuccess }) {
  const [form, setForm] = useState({
    farmer: "",
    cooperative: "",
    volume: "",
    status: "pending",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.farmer || !form.cooperative || !form.volume) {
      toast.error("Fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login again");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/milk-collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          farmer: form.farmer,
          cooperative: form.cooperative,
          volume: Number(form.volume),
          status: form.status,
          notes: form.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to save entry");
        return;
      }

      toast.success("Milk entry saved");

      
      setForm({
        farmer: "",
        cooperative: "",
        volume: "",
        status: "pending",
        notes: "",
      });

      onSuccess?.();
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-lg font-bold">Milk Entry</h2>

      <input
        name="farmer"
        value={form.farmer}
        onChange={handleChange}
        placeholder="Farmer ID"
        className="w-full border p-2 rounded"
      />

      <input
        name="cooperative"
        value={form.cooperative}
        onChange={handleChange}
        placeholder="Cooperative ID"
        className="w-full border p-2 rounded"
      />

      <input
        name="volume"
        value={form.volume}
        onChange={handleChange}
        placeholder="Volume (Liters)"
        type="number"
        step="0.1"
        className="w-full border p-2 rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
        className="w-full border p-2 rounded"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-900 text-white p-2 rounded"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </form>
  );
}