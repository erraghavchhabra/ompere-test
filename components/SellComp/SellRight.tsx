"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  UploadCloud,
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { API } from "@/lib/api";

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  state: string;
  city: string;
  address: string;
  brand: string;
  brand_other: string;
  capacity_range: string;
  capacity_range_other: string;
  manufacturing_year: string;
  running_hours: string;
  condition: string;
  preferred_inspection_time: string;
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
  state: "",
  city: "",
  address: "",
  brand: "",
  brand_other: "",
  capacity_range: "",
  capacity_range_other: "",
  manufacturing_year: "",
  running_hours: "",
  condition: "",
  preferred_inspection_time: "",
};

const OTHER_VALUE = "Other";
const OTHER_OPTION: SelectOption = { id: "Other", name: OTHER_VALUE };

// Matches any "other"-style entry the backend might already send
// (Other, Others, Not Listed, etc.) so we never render it twice —
// once from the API response and once from our static OTHER_OPTION.
const isOtherLikeLabel = (name: string) =>
  /^other|not\s*listed/i.test(name.trim());

const withOtherOption = (options: SelectOption[]): SelectOption[] => {
  const withoutExistingOther = options.filter(
    (opt) => !isOtherLikeLabel(opt.name),
  );
  return [...withoutExistingOther, OTHER_OPTION];
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 6;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ALLOWED_EXTENSIONS = ".jpg,.jpeg,.png,.pdf";

// ─── States we currently operate in ───────────────────────────────────────
const OPERATING_STATES = [
  "Madhya Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Karnataka",
];

// ─── Full list of Indian states & UTs shown in the dropdown ──────────────
const INDIAN_STATES: SelectOption[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
].map((name) => ({ id: name, name }));

const isStateSupported = (state: string) =>
  !state || OPERATING_STATES.includes(state);

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

  if (!formData.state) {
    errors.state = "Please select a state.";
  } else if (!isStateSupported(formData.state)) {
    errors.state = `We are currently not operating in your ${formData.state} state. We expect to launch services in your state soon`;
  }

  if (!formData.city.trim()) {
    errors.city = "City is required.";
  }
  // address is optional — no validation

  if (!formData.brand) {
    errors.brand = "Please select a brand.";
  } else if (formData.brand === OTHER_VALUE && !formData.brand_other.trim()) {
    errors.brand = "Please enter the brand name.";
  }

  if (!formData.capacity_range) {
    errors.capacity_range = "Please select a capacity range.";
  } else if (
    formData.capacity_range === OTHER_VALUE &&
    !formData.capacity_range_other.trim()
  ) {
    errors.capacity_range = "Please enter the capacity range.";
  }
  if (!formData.manufacturing_year)
    errors.manufacturing_year = "Please select a manufacturing year.";
  if (!formData.running_hours)
    errors.running_hours = "Please select running hours.";
  if (!formData.condition) errors.condition = "Please select a condition.";
  if (!formData.preferred_inspection_time)
    errors.preferred_inspection_time =
      "Please select a preferred inspection time.";
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
    return () => {
      cancelled = true;
    };
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

// ─── Loading fallback shown while the Suspense boundary resolves ─────────────
function SellRightFallback() {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 md:p-10">
      <h2 className="text-4xl font-bold text-[#1a1a1a] mb-10">
        Genset Information Form
      </h2>
      <div className="animate-pulse space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-14 bg-gray-100 rounded-2xl" />
          <div className="h-14 bg-gray-100 rounded-2xl" />
          <div className="h-14 bg-gray-100 rounded-2xl" />
          <div className="h-14 bg-gray-100 rounded-2xl" />
          <div className="h-14 bg-gray-100 rounded-2xl" />
          <div className="h-14 bg-gray-100 rounded-2xl" />
        </div>
        <div className="h-14 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Inner component: everything that actually uses useSearchParams() ────────
function SellRightForm() {
  const searchParams = useSearchParams();
  const qpBrandId = searchParams.get("brand_id");
  const qpCapacityKva = searchParams.get("capacity_kva");
  const qpYear = searchParams.get("year");
  const hasPrefillParams = !!(qpBrandId || qpCapacityKva || qpYear);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // ── Scroll to the form when arriving with prefill query params ────────────
  useEffect(() => {
    if (hasPrefillParams && formContainerRef.current) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Only run once on mount — hasPrefillParams won't change after that
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dynamic options from API
  const { options: brandOptions, loading: brandsLoading } = useSelectOptions(
    API.brands,
  );
  const { options: capacityOptions, loading: capacitiesLoading } =
    useSelectOptions(API.capacities);
  const { options: yearOptions, loading: yearsLoading } = useSelectOptions(
    API.years,
  );
  const { options: hoursOptions, loading: hoursLoading } = useSelectOptions(
    API.hours,
  );
  const { options: engineConditionOptions, loading: engineConditionsLoading } =
    useSelectOptions(API.engineConditions);

  // ── Prefill from query params (coming from the Hero price-calculator) ─────
  useEffect(() => {
    if (!qpBrandId || brandsLoading || brandOptions.length === 0) return;
    const match = brandOptions.find((b) => String(b.id) === String(qpBrandId));
    if (match) {
      setFormData((prev) =>
        prev.brand ? prev : { ...prev, brand: match.name },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qpBrandId, brandOptions, brandsLoading]);

  useEffect(() => {
    if (!qpCapacityKva || capacitiesLoading || capacityOptions.length === 0)
      return;
    const match = capacityOptions.find(
      (c) => String(c.name) === String(qpCapacityKva),
    );
    if (match) {
      setFormData((prev) =>
        prev.capacity_range ? prev : { ...prev, capacity_range: match.name },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qpCapacityKva, capacityOptions, capacitiesLoading]);

  useEffect(() => {
    if (!qpYear || yearsLoading || yearOptions.length === 0) return;
    const match = yearOptions.find((y) => String(y.name) === String(qpYear));
    if (match) {
      setFormData((prev) =>
        prev.manufacturing_year
          ? prev
          : { ...prev, manufacturing_year: match.name },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qpYear, yearOptions, yearsLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Changing state again shouldn't keep showing a stale "City is
    // required" message from an earlier blur — clear city's touched/error
    // state so it only reappears once the user actually revisits city.
    if (name === "state") {
      setTouched((prev) => ({ ...prev, city: false }));
      setErrors((prev) => ({ ...prev, city: undefined }));
    }

    // Clear the free-text value if the user picks a normal option again
    // after having selected "Other"
    if (name === "brand" && value !== OTHER_VALUE) {
      updated.brand_other = "";
      setFormData(updated);
    }
    if (name === "capacity_range" && value !== OTHER_VALUE) {
      updated.capacity_range_other = "";
      setFormData(updated);
    }

    if (touched[name as keyof FormData]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormData] || undefined,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      });
    });

    setFileErrors(errs);
    setUploadedFiles((prev) => {
      const combined = [...prev, ...valid];
      if (combined.length > MAX_FILES) {
        setFileErrors((e) => [
          ...e,
          `Only the first ${MAX_FILES} files are kept.`,
        ]);
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
      {} as Record<keyof FormData, boolean>,
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
        setShowSuccessModal(true);

        setFormData(INITIAL_FORM);
        setErrors({});
        setTouched({});

        uploadedFiles.forEach(({ preview }) => {
          if (preview) URL.revokeObjectURL(preview);
        });

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

  const stateUnsupported =
    !!formData.state && !isStateSupported(formData.state);

  return (
    <>
      <div
        ref={formContainerRef}
        className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 md:p-10 scroll-mt-24"
      >
        <h2 className="text-4xl font-bold text-[#1a1a1a] mb-10">
          Genset Information Form
        </h2>

        {hasPrefillParams && (
          <div className="mb-8 flex items-start gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-[#f07020] mt-0.5 shrink-0" />
            <p className="text-sm text-[#f07020]">
              We've pre-filled your brand, capacity, and year from your
              earlier selection — just confirm the rest.
            </p>
          </div>
        )}

        {/* ─── Your Information ─── */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
            Your Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={inputClass("full_name")}
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 98765 43210"
                className={inputClass("phone_number")}
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone_number}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Your Company"
                className={inputClass("company_name")}
              />
            </div>

            {/* State */}
            <div>
              <SelectField
                label="State"
                name="state"
                value={formData.state}
                placeholder="Select state"
                options={INDIAN_STATES}
                error={
                  errors.state && !stateUnsupported ? errors.state : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {stateUnsupported && (
                <div className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-700">
                    We are currently not operating in your{" "}
                    <span className="font-semibold">{formData.state}</span>{" "}
                    state. We expect to launch services in your state soon.
                  </p>
                </div>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Indore"
                className={inputClass("city")}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            {/* Address (optional) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Address
                <span className="ml-2 text-sm font-normal text-gray-400">
                  (Optional)
                </span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Plot no., street, landmark…"
                rows={3}
                className={`w-full px-5 py-4 rounded-2xl border text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 resize-none border-gray-200 focus:ring-[#f07020]`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Preferred Time for Inspection *
              </label>

              <div className="relative">
                <select
                  name="preferred_inspection_time"
                  value={formData.preferred_inspection_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-14 px-5 pr-12 rounded-2xl border appearance-none bg-white focus:outline-none focus:ring-1 ${
                    errors.preferred_inspection_time
                      ? "border-red-400 focus:ring-red-400 text-gray-800"
                      : "border-gray-200 focus:ring-[#f07020] text-gray-500"
                  }`}
                >
                  <option value="">Select preferred time</option>
                  <option value="09:00 AM - 12:00 PM">
                    09:00 AM - 12:00 PM
                  </option>
                  <option value="12:00 PM - 03:00 PM">
                    12:00 PM - 03:00 PM
                  </option>
                  <option value="03:00 PM - 06:00 PM">
                    03:00 PM - 06:00 PM
                  </option>
                  <option value="Any Time">Any Time</option>
                </select>

                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {errors.preferred_inspection_time && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.preferred_inspection_time}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Genset Details ─── */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
            Genset Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Brand — sends name */}
            <div>
              <SelectField
                label="Brand"
                name="brand"
                value={formData.brand}
                options={
                  brandsLoading ? brandOptions : withOtherOption(brandOptions)
                }
                loading={brandsLoading}
                error={errors.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {formData.brand === OTHER_VALUE && (
                <input
                  type="text"
                  name="brand_other"
                  value={formData.brand_other}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter brand name"
                  className={`${inputClass("brand_other")} mt-3`}
                />
              )}
            </div>

            {/* Capacity Range — sends name */}
            <div>
              <SelectField
                label="Capacity Range"
                name="capacity_range"
                value={formData.capacity_range}
                placeholder="Select capacity"
                options={
                  capacitiesLoading
                    ? capacityOptions
                    : withOtherOption(capacityOptions)
                }
                loading={capacitiesLoading}
                error={errors.capacity_range}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {formData.capacity_range === OTHER_VALUE && (
                <input
                  type="text"
                  name="capacity_range_other"
                  value={formData.capacity_range_other}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter capacity range (e.g. 50-60 kVA)"
                  className={`${inputClass("capacity_range_other")} mt-3`}
                />
              )}
            </div>

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
            <span className="ml-2 text-sm font-normal text-gray-400">
              (Optional)
            </span>
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Upload photos or inspection reports of your genset. JPG, PNG, or PDF
            · Max 5 MB per file · Up to 6 files.
          </p>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              processFiles([...e.dataTransfer.files]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-colors px-6 py-10 ${
              isDragOver
                ? "border-[#f07020] bg-orange-50"
                : "border-orange-200 bg-[#fff8f4] hover:border-[#f07020] hover:bg-orange-50"
            }`}
          >
            <UploadCloud className="w-10 h-10 text-[#f07020]" />
            <div className="text-center">
              <p className="text-sm font-semibold text-[#f07020]">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, PDF · Max 5 MB per file
              </p>
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
                <li key={i} className="text-xs text-red-500">
                  {err}
                </li>
              ))}
            </ul>
          )}

          {uploadedFiles.length > 0 && (
            <p className="text-xs text-gray-400 mt-3">
              {uploadedFiles.length} / {MAX_FILES} file
              {uploadedFiles.length !== 1 ? "s" : ""} selected
            </p>
          )}

          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {uploadedFiles.map(({ file, preview }, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 group"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt={file.name}
                      className="w-full h-24 object-cover"
                    />
                  ) : (
                    <div className="w-full h-24 flex flex-col items-center justify-center bg-orange-50 text-[#f07020]">
                      <FileText className="w-8 h-8" />
                      <span className="text-[10px] font-semibold mt-1">
                        PDF
                      </span>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-500 px-2 py-1.5 truncate">
                    {file.name}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
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
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl">
            {/* Top Gradient */}
            <div className="h-3 bg-gradient-to-r from-[#f07020] to-[#ff9a57]" />

            <div className="p-10 text-center">
              <div className="relative mx-auto mb-8">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-30" />

                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Your generator information has been submitted successfully. Our
                team will review your details and contact you within
                <span className="font-semibold text-[#f07020]"> 4 hours</span>.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="rounded-2xl bg-orange-50 p-3">
                  <p className="text-xs text-gray-500">Response</p>
                  <p className="font-bold text-[#f07020]">4 Hours</p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-3">
                  <p className="text-xs text-gray-500">Inspection</p>
                  <p className="font-bold text-[#f07020]">Free</p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-3">
                  <p className="text-xs text-gray-500">Payment</p>
                  <p className="font-bold text-[#f07020]">48 Hours</p>
                </div>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-14 rounded-2xl bg-[#f07020] hover:bg-[#d85f14] text-white font-semibold text-lg transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Default export: wraps the form in a Suspense boundary ───────────────────
// Required because useSearchParams() opts this tree into client-side rendering;
// Next.js needs a Suspense boundary around it to avoid bailing out the whole
// route from static rendering.
export default function SellRight() {
  return (
    <Suspense fallback={<SellRightFallback />}>
      <SellRightForm />
    </Suspense>
  );
}