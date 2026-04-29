"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminSettingsPage() {
  const { authFetch } = useAuth();
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving]   = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  useEffect(() => {
    authFetch("/api/settings")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setSettings(json.data);
        else setError(json.error);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [authFetch]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);
    try {
      const res = await authFetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSuccess("Settings saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const SETTING_GROUPS = [
    {
      title: "Company Information",
      keys: ["company_name", "company_email", "company_phone", "company_address"],
    },
    {
      title: "Business Rules",
      keys: ["default_currency", "commission_rate", "payment_gateway"],
    },
    {
      title: "Notifications",
      keys: ["whatsapp_enabled", "email_notifications"],
    },
  ];

  const LABELS = {
    company_name:        "Company Name",
    company_email:       "Company Email",
    company_phone:       "Company Phone",
    company_address:     "Company Address",
    default_currency:    "Default Currency",
    commission_rate:     "Default Commission Rate (%)",
    payment_gateway:     "Payment Gateway",
    whatsapp_enabled:    "WhatsApp Notifications",
    email_notifications: "Email Notifications",
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-sm text-gray-500">Configure your real estate portal</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="max-w-2xl space-y-8">
          {error && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
          )}

          {SETTING_GROUPS.map((group) => (
            <div key={group.title} className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-5 text-base font-semibold">{group.title}</h2>
              <div className="space-y-4">
                {group.keys.map((key) => {
                  const isBool = ["whatsapp_enabled", "email_notifications"].includes(key);
                  return (
                    <div key={key}>
                      <label className="mb-1.5 block text-sm font-medium">
                        {LABELS[key] || key}
                      </label>
                      {isBool ? (
                        <select
                          value={settings[key] || "false"}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                          <option value="true">Enabled</option>
                          <option value="false">Disabled</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={settings[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {isSaving ? "Saving…" : "Save Settings"}
          </button>
        </form>
      )}
    </div>
  );
}
