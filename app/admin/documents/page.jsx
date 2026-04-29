"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDocumentsPage() {
  const { authFetch } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", type: "", fileData: "" });
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading]   = useState(false);

  const fetchDocs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/documents?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setDocuments(json.data.documents);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, [filters]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadForm((p) => ({ ...p, fileData: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");
    if (!uploadForm.title || !uploadForm.fileData) {
      setUploadError("Title and file are required.");
      return;
    }
    setUploading(true);
    try {
      const res = await authFetch("/api/documents", {
        method: "POST",
        body: JSON.stringify(uploadForm),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setShowUpload(false);
      setUploadForm({ title: "", type: "", fileData: "" });
      fetchDocs();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-gray-500">{pagination.total} documents</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + Upload Document
        </button>
      </div>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-xl font-bold">Upload Document</h2>
            {uploadError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{uploadError}</div>
            )}
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Title *</label>
                <input value={uploadForm.title} onChange={(e) => setUploadForm((p) => ({ ...p, title: e.target.value }))}
                  required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Document Type</label>
                <input value={uploadForm.type} placeholder="e.g. contract, deed, receipt"
                  onChange={(e) => setUploadForm((p) => ({ ...p, type: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">File *</label>
                <input type="file" onChange={handleFileChange} required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={uploading}
                  className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-50">
                  {uploading ? "Uploading…" : "Upload"}
                </button>
                <button type="button" onClick={() => setShowUpload(false)}
                  className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {error && <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Module</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Uploaded By</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Expires</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400">No documents found.</td></tr>
              ) : (
                documents.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{d.title}</td>
                    <td className="px-4 py-3 text-gray-600">{d.type || "—"}</td>
                    <td className="px-4 py-3 capitalize text-gray-500">{d.related_module || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{d.uploaded_by_name || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {d.expires_at ? new Date(d.expires_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(d.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <a href={d.file_url} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 hover:underline">
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
