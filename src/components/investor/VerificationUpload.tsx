"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";

export interface VerificationDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "uploading" | "uploaded" | "verified" | "rejected";
}

interface VerificationUploadProps {
  onDocumentsChange?: (documents: VerificationDocument[]) => void;
  maxFiles?: number;
}

const DOCUMENT_TYPES = [
  { value: "tax_return", label: "Tax Return (Form 1040)" },
  { value: "w2", label: "W-2 Form" },
  { value: "bank_statement", label: "Bank Statement" },
  { value: "brokerage_statement", label: "Brokerage Statement" },
  { value: "cpa_letter", label: "CPA Verification Letter" },
  { value: "attorney_letter", label: "Attorney Verification Letter" },
  { value: "third_party", label: "Third-Party Verification" },
  { value: "other", label: "Other Supporting Document" },
];

export default function VerificationUpload({
  onDocumentsChange,
  maxFiles = 5,
}: VerificationUploadProps) {
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedType, setSelectedType] = useState("tax_return");
  const [error, setError] = useState("");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      setError("");

      if (documents.length + files.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const newDocs: VerificationDocument[] = [];

      Array.from(files).forEach((file) => {
        // Validate file type
        const validTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/jpg",
        ];
        if (!validTypes.includes(file.type)) {
          setError("Only PDF, JPG, and PNG files are accepted");
          return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          setError("Files must be under 10MB");
          return;
        }

        const doc: VerificationDocument = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: selectedType,
          size: formatFileSize(file.size),
          uploadedAt: new Date().toISOString(),
          status: "uploading",
        };

        newDocs.push(doc);
      });

      if (newDocs.length > 0) {
        const updatedDocs = [...documents, ...newDocs];
        setDocuments(updatedDocs);

        // Simulate upload completion
        setTimeout(() => {
          setDocuments((prev) =>
            prev.map((d) =>
              newDocs.find((nd) => nd.id === d.id)
                ? { ...d, status: "uploaded" as const }
                : d
            )
          );
          onDocumentsChange?.(
            updatedDocs.map((d) => ({ ...d, status: "uploaded" as const }))
          );
        }, 1500);
      }
    },
    [documents, maxFiles, selectedType, onDocumentsChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      e.target.value = ""; // Reset input
    },
    [processFiles]
  );

  const removeDocument = useCallback(
    (id: string) => {
      const updatedDocs = documents.filter((d) => d.id !== id);
      setDocuments(updatedDocs);
      onDocumentsChange?.(updatedDocs);
    },
    [documents, onDocumentsChange]
  );

  const getTypeLabel = (type: string): string => {
    return DOCUMENT_TYPES.find((t) => t.value === type)?.label || type;
  };

  const getStatusColor = (status: VerificationDocument["status"]): string => {
    switch (status) {
      case "uploading":
        return "text-cosmic-gold";
      case "uploaded":
        return "text-blue-400";
      case "verified":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-cosmic-white/50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Type Selector */}
      <div>
        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
          Document Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors appearance-none cursor-pointer"
        >
          {DOCUMENT_TYPES.map((type) => (
            <option
              key={type.value}
              value={type.value}
              className="bg-space-800 text-cosmic-white"
            >
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-cosmic-gold bg-cosmic-gold/10"
            : "border-white/10 hover:border-cosmic-gold/30 hover:bg-white/5"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload
          className={`w-10 h-10 mx-auto mb-4 ${
            isDragging ? "text-cosmic-gold" : "text-cosmic-white/30"
          }`}
        />
        <p className="text-sm text-cosmic-white/70 mb-2">
          {isDragging
            ? "Drop files here"
            : "Drag and drop files here, or click to browse"}
        </p>
        <p className="text-xs text-cosmic-white/40">
          PDF, JPG, PNG up to 10MB each (max {maxFiles} files)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </motion.div>
      )}

      {/* Uploaded Documents */}
      <AnimatePresence>
        {documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <p className="text-xs font-heading tracking-wider text-cosmic-white/50">
              Uploaded Documents ({documents.length}/{maxFiles})
            </p>

            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-nebula-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-cosmic-white truncate">
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-cosmic-white/40">
                        {getTypeLabel(doc.type)}
                      </span>
                      <span className="text-cosmic-white/20">•</span>
                      <span className="text-xs text-cosmic-white/40">
                        {doc.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {doc.status === "uploading" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-cosmic-gold/30 border-t-cosmic-gold rounded-full animate-spin" />
                      <span className="text-xs text-cosmic-gold">
                        Uploading...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className={`text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="p-2 text-cosmic-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Box */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <h4 className="text-xs font-heading tracking-wider text-cosmic-gold mb-2">
          Document Requirements
        </h4>
        <ul className="text-xs text-cosmic-white/50 space-y-1">
          <li>
            • <strong>Tax Returns:</strong> Last 2 years showing income {">"}$200K
            ($300K joint)
          </li>
          <li>
            • <strong>Bank/Brokerage:</strong> Statements showing net worth {">"}{" "}
            $1M (excluding primary residence)
          </li>
          <li>
            • <strong>Professional Letter:</strong> From CPA, attorney, or
            registered broker-dealer
          </li>
          <li>
            • <strong>Third-Party:</strong> Verification from
            VerifyInvestor.com or similar service
          </li>
        </ul>
      </div>
    </div>
  );
}
