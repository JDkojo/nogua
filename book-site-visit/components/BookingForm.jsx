"use client";

/**
 * BookingForm — functional site visit booking form.
 * Submits to POST /api/visits and captures the lead in the CRM.
 */

import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React, { useState } from "react";

const INITIAL = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  visitDate: "",
  visitTime: "",
  notes: "",
};

export function BookingForm({ propertyId = null, propertyTitle = "" }) {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.clientName || !form.visitDate) {
      setErrorMsg("Name and preferred visit date are required.");
      return;
    }
    if (!form.clientEmail && !form.clientPhone) {
      setErrorMsg("Please provide at least an email or phone number.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId:  propertyId || 1, // fallback for demo
          clientName:  form.clientName,
          clientEmail: form.clientEmail,
          clientPhone: form.clientPhone,
          visitDate:   form.visitDate,
          visitTime:   form.visitTime,
          notes:       form.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Booking failed.");
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-12 text-center">
        <div className="mb-4 text-4xl">🏡</div>
        <h3 className="mb-2 text-xl font-bold">Visit booked!</h3>
        <p className="text-gray-600">
          We've received your request
          {propertyTitle ? ` for ${propertyTitle}` : ""}. Our team will
          confirm your visit within 24 hours.
        </p>
        <button
          className="mt-6 text-sm underline"
          onClick={() => setStatus("idle")}
        >
          Book another visit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-lg grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
    >
      <h3 className="text-2xl font-bold">Book a Site Visit</h3>
      {propertyTitle && (
        <p className="text-sm text-gray-500">Property: {propertyTitle}</p>
      )}

      {errorMsg && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid w-full items-center">
        <Label htmlFor="clientName" className="mb-2">Full name *</Label>
        <Input
          type="text"
          id="clientName"
          value={form.clientName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid w-full items-center">
          <Label htmlFor="clientEmail" className="mb-2">Email</Label>
          <Input
            type="email"
            id="clientEmail"
            value={form.clientEmail}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="grid w-full items-center">
          <Label htmlFor="clientPhone" className="mb-2">Phone</Label>
          <Input
            type="tel"
            id="clientPhone"
            value={form.clientPhone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid w-full items-center">
          <Label htmlFor="visitDate" className="mb-2">Preferred date *</Label>
          <Input
            type="date"
            id="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
        <div className="grid w-full items-center">
          <Label htmlFor="visitTime" className="mb-2">Preferred time</Label>
          <Input
            type="time"
            id="visitTime"
            value={form.visitTime}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid w-full items-center">
        <Label htmlFor="notes" className="mb-2">Additional notes</Label>
        <Textarea
          id="notes"
          placeholder="Any specific requirements or questions?"
          className="min-h-[6rem]"
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" title="Book Visit" disabled={status === "loading"}>
        {status === "loading" ? "Booking…" : "Book Visit"}
      </Button>
    </form>
  );
}
