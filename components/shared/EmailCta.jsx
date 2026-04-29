"use client";

/**
 * EmailCta — shared functional email capture component.
 * Submits to POST /api/leads and shows success/error feedback.
 * Used by all Cta32 variants across every page.
 */

import React, { useState } from "react";

export function EmailCta({
  heading = "Get in touch with us",
  subheading = "Tell us what you're looking for and we'll help you find it",
  buttonLabel = "Get started",
  source = "email_cta",
  imageSrc,
  imageAlt = "Real estate property",
}) {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Website",
          lastName:  "Visitor",
          email,
          source,
          interest: "general",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex flex-col items-center">
        <div className="mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{subheading}</p>

          {status === "success" ? (
            <div className="mx-auto mt-6 w-full max-w-sm rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 md:mt-8">
              ✅ Thanks! We'll be in touch shortly.
            </div>
          ) : (
            <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
              <form
                onSubmit={handleSubmit}
                className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Sending…
                    </span>
                  ) : buttonLabel}
                </button>
              </form>

              {errorMsg && (
                <p className="text-xs text-red-600">{errorMsg}</p>
              )}

              <p className="text-xs text-gray-500">
                By clicking {buttonLabel} you agree to our Terms and Conditions.
              </p>
            </div>
          )}
        </div>

        {imageSrc && (
          <img
            src={imageSrc}
            className="size-full object-cover"
            alt={imageAlt}
            loading="lazy"
          />
        )}
      </div>
    </section>
  );
}
