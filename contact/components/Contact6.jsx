"use client";

import {
  Button,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@relume_io/relume-ui";
import React, { useState } from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "",
  inquiryType: "",
  message: "",
  terms: false,
};

export function Contact6() {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSelect = (value) => setForm((prev) => ({ ...prev, interest: value }));
  const handleRadio  = (value) => setForm((prev) => ({ ...prev, inquiryType: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.firstName || !form.lastName) {
      setErrorMsg("Please enter your first and last name.");
      return;
    }
    if (!form.email && !form.phone) {
      setErrorMsg("Please provide at least an email or phone number.");
      return;
    }
    if (!form.terms) {
      setErrorMsg("You must agree to the terms before submitting.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName:   form.firstName,
          lastName:    form.lastName,
          email:       form.email,
          phone:       form.phone,
          interest:    form.interest,
          inquiryType: form.inquiryType,
          message:     form.message,
          source:      "contact_form",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16">
        <div>
          <div className="mb-6 md:mb-8">
            <p className="mb-3 font-semibold md:mb-4">Message</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Send your inquiry
            </h2>
            <p className="md:text-md">
              Tell us what you're looking for and we'll get back to you
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 py-2">
            <div className="flex items-center gap-4">
              <BiEnvelope className="size-6 flex-none" />
              <p>hello@realestate.com</p>
            </div>
            <div className="flex items-center gap-4">
              <BiPhone className="size-6 flex-none" />
              <p>+234 800 000 0000</p>
            </div>
            <div className="flex items-center gap-4">
              <BiMap className="size-6 flex-none" />
              <p>123 Main Street, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-12 text-center">
            <div className="mb-4 text-4xl">✅</div>
            <h3 className="mb-2 text-xl font-bold">Message received!</h3>
            <p className="text-gray-600">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              className="mt-6 text-sm underline"
              onClick={() => setStatus("idle")}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid max-w-lg grid-cols-1 grid-rows-[auto_auto] gap-6"
          >
            {errorMsg && (
              <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="grid w-full items-center">
                <Label htmlFor="firstName" className="mb-2">First name</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center">
                <Label htmlFor="lastName" className="mb-2">Last name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid w-full items-center">
                <Label htmlFor="email" className="mb-2">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid w-full items-center">
                <Label htmlFor="phone" className="mb-2">Phone number</Label>
                <Input
                  type="text"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid w-full items-center">
              <Label className="mb-2">What's your interest</Label>
              <Select onValueChange={handleSelect} value={form.interest}>
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential Property</SelectItem>
                  <SelectItem value="commercial">Commercial Property</SelectItem>
                  <SelectItem value="luxury">Luxury Property</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center py-3 md:py-4">
              <Label className="mb-3 md:mb-4">How would you describe yourself</Label>
              <RadioGroup
                className="grid grid-cols-2 gap-x-6 gap-y-3.5"
                value={form.inquiryType}
                onValueChange={handleRadio}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buying" id="buying" />
                  <Label htmlFor="buying">Buying property</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selling" id="selling" />
                  <Label htmlFor="selling">Selling property</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investment" id="investment" />
                  <Label htmlFor="investment">Investment inquiry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="management" id="management" />
                  <Label htmlFor="management">Property management</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general">General question</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="message" className="mb-2">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us more"
                className="min-h-[11.25rem] overflow-auto"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
              <Checkbox
                id="terms"
                checked={form.terms}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, terms: checked }))
                }
              />
              <Label htmlFor="terms" className="cursor-pointer">
                I agree to the terms
              </Label>
            </div>

            <div>
              <Button type="submit" title="Send" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
