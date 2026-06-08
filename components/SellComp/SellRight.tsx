"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, UploadCloud, X, FileText } from "lucide-react";
import { API } from "@/lib/api";

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  brand: string;
  capacity_range: string;
  manufacturing_year: string;
  running_hours: string;
  condition: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

interface SelectOption {
  id: string | number;
  name: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  full_name: "",
  email: "",
  phone_number: "",
  company_name: "",
  brand: "",
  capacity_range: "",
  manufacturing_year: "",
  running_hours: "",
  condition: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 6;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ALLOWED_EXTENSIONS = ".jpg,.jpeg,.png,.pdf";

const validate = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.full_name.trim()) {
    errors.full_name = "Full name is required.";
  } else if (formData.full_name.trim().length < 2) {
    errors.full_name = "Full name must be at least 2 characters.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.phone_number.trim()) {
    errors.phone_number = "Phone number is required.";
  } else if (!/^\+?[0-9\s\-().]{7,15}$/.test(formData.phone_number.trim())) {
    errors.phone_number = "Enter a valid phone number.";
  }

  if (!formData.brand) errors.brand = "Please select a brand.";
  if (!formData.capacity_range) errors.capacity_range = "Please select a capacity range.";
  if (!formData.manufacturing_year) errors.manufacturing_year = "Please select a manufacturing year.";
  if (!formData.running_hours) errors.running_hours = "Please select running hours.";
  if (!formData.condition) errors.condition = "Please select a condition.";

  return errors;
};

// ─── Generic hook to fetch select options ────────────────────────────────────
function useSelectOptions(url: string) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((data: SelectOption[]) => {
        if (!cancelled) setOptions(data);
      })
      .catch(() => {
        if (!cancelled) setOptions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [url]);

  return { options, loading };
}

// ─── Reusable Select field ────────────────────────────────────────────────────
interface SelectFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  placeholder?: string;
  options: SelectOption[];
  loading?: boolean;
  error?: string;
  /**
   * Which field to submit as the <option> value.
   * - "name"  → sends the display label (default) — use for brand, capacity, year, hours, condition
   * - "id"    → sends the numeric/foreign-key id — use only when backend expects an id
   */
  valueKey?: "id" | "name";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

function SelectField({
  label,
  name,
  value,
  placeholder = "Select option",
  options,
  loading = false,
  error,
  valueKey = "name",
  onChange,
  onBlur,
}: SelectFieldProps) {
  const selectClass = `w-full h-14 px-5 rounded-2xl border appearance-none focus:outline-none focus:ring-1 bg-white ${
    error
      ? "border-red-400 focus:ring-red-400 text-gray-800"
      : "border-gray-200 focus:ring-[#f07020] text-gray-500"
  } disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} *
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={loading}
          className={selectClass}
        >
          <option value="">{loading ? "Loading…" : placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={String(opt[valueKey])}>
              {opt.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SellRight() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic options from API
  const { options: brandOptions, loading: brandsLoading } = useSelectOptions(API.brands);
  const { options: capacityOptions, loading: capacitiesLoading } = useSelectOptions(API.capacities);
  const { options: yearOptions, loading: yearsLoading } = useSelectOptions(API.years);
  const { options: hoursOptions, loading: hoursLoading } = useSelectOptions(API.hours);
  const { options: engineConditionOptions, loading: engineConditionsLoading } = useSelectOptions(API.engineConditions);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);

    if (touched[e.target.name as keyof FormData]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: fieldErrors[e.target.name as keyof FormData] || undefined,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof FormData;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || undefined }));
  };

  const processFiles = useCallback((newFiles: File[]) => {
    const errs: string[] = [];
    const valid: UploadedFile[] = [];

    newFiles.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errs.push(`"${file.name}" must be a JPG, PNG, or PDF.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        errs.push(`"${file.name}" exceeds the 5 MB size limit.`);
        return;
      }
      valid.push({
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      });
    });

    setFileErrors(errs);
    setUploadedFiles((prev) => {
      const combined = [...prev, ...valid];
      if (combined.length > MAX_FILES) {
        setFileErrors((e) => [...e, `Only the first ${MAX_FILES} files are kept.`]);
        return combined.slice(0, MAX_FILES);
      }
      return combined;
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => {
      const next = [...prev];
      if (next[idx].preview) URL.revokeObjectURL(next[idx].preview!);
      next.splice(idx, 1);
      return next;
    });
  };

  const handleSubmit = async () => {
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      uploadedFiles.forEach(({ file }) => body.append("photos[]", file));

      const response = await fetch(API.sellRequest, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (result.status) {
        alert("Thank you, we'll contact you soon.");
        setFormData(INITIAL_FORM);
        setErrors({});
        setTouched({});
        uploadedFiles.forEach(({ preview }) => { if (preview) URL.revokeObjectURL(preview); });
        setUploadedFiles([]);
        setFileErrors([]);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  const inputClass = (name: keyof FormData) =>
    `w-full h-14 px-5 rounded-2xl border text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
      errors[name]
        ? "border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:ring-[#f07020]"
    }`;

  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 md:p-10">
      <h2 className="text-4xl font-bold text-[#1a1a1a] mb-10">
        Genset Information Form
      </h2>

      {/* ─── Your Information ─── */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">Your Information</h3>
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name *</label>
            <input type="text" name="full_name" value={formData.full_name}
              onChange={handleChange} onBlur={handleBlur} placeholder="John Doe"
              className={inputClass("full_name")} />
            {errors.full_name && <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Email *</label>
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} onBlur={handleBlur} placeholder="john@example.com"
              className={inputClass("email")} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
            <input type="text" name="phone_number" value={formData.phone_number}
              onChange={handleChange} onBlur={handleBlur} placeholder="+91 98765 43210"
              className={inputClass("phone_number")} />
            {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Company Name</label>
            <input type="text" name="company_name" value={formData.company_name}
              onChange={handleChange} placeholder="Your Company"
              className={inputClass("company_name")} />
          </div>

        </div>
      </div>

      {/* ─── Genset Details ─── */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">Genset Details</h3>
        <div className="grid md:grid-cols-2 gap-6">

          {/* Brand — sends name */}
          <SelectField
            label="Brand"
            name="brand"
            value={formData.brand}
            options={brandOptions}
            loading={brandsLoading}
            error={errors.brand}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Capacity Range — sends name */}
          <SelectField
            label="Capacity Range"
            name="capacity_range"
            value={formData.capacity_range}
            placeholder="Select capacity"
            options={capacityOptions}
            loading={capacitiesLoading}
            error={errors.capacity_range}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Manufacturing Year — sends make_year (name), not age_years (id) */}
          <SelectField
            label="Manufacturing Year"
            name="manufacturing_year"
            value={formData.manufacturing_year}
            placeholder="Select year"
            options={yearOptions}
            loading={yearsLoading}
            error={errors.manufacturing_year}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Running Hours — sends label (name) */}
          <SelectField
            label="Running Hours"
            name="running_hours"
            value={formData.running_hours}
            placeholder="Select running hours"
            options={hoursOptions}
            loading={hoursLoading}
            error={errors.running_hours}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {/* Engine Condition — full width, sends name */}
          <div className="md:col-span-2">
            <SelectField
              label="Engine Condition"
              name="condition"
              value={formData.condition}
              placeholder="Select engine condition"
              options={engineConditionOptions}
              loading={engineConditionsLoading}
              error={errors.condition}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

        </div>
      </div>

      {/* ─── Photos & Documents ─── */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">
          Photos & Documents
          <span className="ml-2 text-sm font-normal text-gray-400">(Optional)</span>
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          Upload photos or inspection reports of your genset. JPG, PNG, or PDF · Max 5 MB per file · Up to 6 files.
        </p>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); processFiles([...e.dataTransfer.files]); }}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-colors px-6 py-10 ${
            isDragOver
              ? "border-[#f07020] bg-orange-50"
              : "border-orange-200 bg-[#fff8f4] hover:border-[#f07020] hover:bg-orange-50"
          }`}
        >
          <UploadCloud className="w-10 h-10 text-[#f07020]" />
          <div className="text-center">
            <p className="text-sm font-semibold text-[#f07020]">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF · Max 5 MB per file</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_EXTENSIONS}
            className="hidden"
            onChange={(e) => processFiles([...e.target.files!])}
          />
        </div>

        {fileErrors.length > 0 && (
          <ul className="mt-3 space-y-1">
            {fileErrors.map((err, i) => (
              <li key={i} className="text-xs text-red-500">{err}</li>
            ))}
          </ul>
        )}

        {uploadedFiles.length > 0 && (
          <p className="text-xs text-gray-400 mt-3">
            {uploadedFiles.length} / {MAX_FILES} file{uploadedFiles.length !== 1 ? "s" : ""} selected
          </p>
        )}

        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {uploadedFiles.map(({ file, preview }, idx) => (
              <div key={idx} className="relative rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 group">
                {preview ? (
                  <img src={preview} alt={file.name} className="w-full h-24 object-cover" />
                ) : (
                  <div className="w-full h-24 flex flex-col items-center justify-center bg-orange-50 text-[#f07020]">
                    <FileText className="w-8 h-8" />
                    <span className="text-[10px] font-semibold mt-1">PDF</span>
                  </div>
                )}
                <p className="text-[11px] text-gray-500 px-2 py-1.5 truncate">{file.name}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── CTA ─── */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-[#f07020] hover:bg-[#d85f14] text-white text-lg font-semibold transition shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Information"}
      </button>
    </div>
  );
}