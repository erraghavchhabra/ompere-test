"use client";

import { useState } from "react";
import ContactInfo from "@/components/ContactInfo";
import { API } from "@/lib/api";

type FormDataType = {
  name: string;
  contact_number: string;
  location: string;
  email: string;
  message: string;
  best_time_to_contact: string;
};

type ErrorsType = {
  [key: string]: string;
};

const validate = (formData: FormDataType): ErrorsType => {
  const errors: ErrorsType = {};

  // Name
  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // Contact Number
  if (!formData.contact_number.trim()) {
    errors.contact_number = "Contact number is required.";
  } else if (
    !/^\+?[0-9\s\-().]{7,15}$/.test(formData.contact_number.trim())
  ) {
    errors.contact_number = "Enter a valid contact number.";
  }

  // Location
  if (!formData.location.trim()) {
    errors.location = "Location is required.";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
  ) {
    errors.email = "Enter a valid email address.";
  }

  // Message
  if (!formData.message.trim()) {
    errors.message = "Message is required.";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (formData.message.trim().length > 1000) {
    errors.message = "Message must be under 1000 characters.";
  }

  return errors;
};

export default function Contact() {

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<ErrorsType>({});

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    contact_number: "",
    location: "",
    email: "",
    message: "",
    best_time_to_contact: "Anytime",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updated);

    if (touched[e.target.name]) {

      const fieldErrors = validate(updated);

      setErrors((prev) => ({
        ...prev,
        [e.target.name]: fieldErrors[e.target.name] || "",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));

    const fieldErrors = validate(formData);

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: fieldErrors[e.target.name] || "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {} as Record<string, boolean>
    );

    setTouched(allTouched);

    const validationErrors = validate(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {

      const response = await fetch(API.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status) {

        alert("Contact form submitted successfully");

        setFormData({
          name: "",
          contact_number: "",
          location: "",
          email: "",
          message: "",
          best_time_to_contact: "Anytime",
        });

        setErrors({});
        setTouched({});

      } else {
        alert("Something went wrong");
      }

    } catch (error) {

      console.log(error);
      alert("Server Error");

    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name: string) =>
    `w-full p-3 rounded-lg border focus:outline-none focus:ring-1 ${
      errors[name]
        ? "border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:ring-[#f07020]"
    }`;

  return (
    <>
      <section className=" py-16 bg-gradient-to-t from-orange-100/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest text-[#f07020] uppercase mb-4">
              Contact Us
            </p>

            <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Get in Touch With Us
            </h1>

            <div className="w-16 h-[3px] bg-[#f07020] mx-auto mb-6" />

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Have questions? We're here to help. Reach out and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </section>

      <ContactInfo />

      {/* CONTACT FORM + MAP */}
      <section className="w-full py-20 bg-gradient-to-t from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* LEFT SIDE - FORM */}
            <div className="bg-white shadow-xl rounded-2xl p-10 border border-orange-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Us
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Name"
                    className={fieldClass("name")}
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contact Number"
                    className={fieldClass("contact_number")}
                  />

                  {errors.contact_number && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.contact_number}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Location"
                    className={fieldClass("location")}
                  />

                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email ID"
                    className={fieldClass("email")}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Message"
                    rows={4}
                    className={fieldClass("message")}
                  />

                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-sm text-red-500">
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}

                    <span className="text-xs text-gray-400 ml-auto">
                      {formData.message.length}/1000
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-2">

                  <p className="font-semibold text-gray-800">
                    Best Time to Contact You
                  </p>

                  <select
                    name="best_time_to_contact"
                    value={formData.best_time_to_contact}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
                  >
                    <option value="Anytime">Anytime</option>

                    <option value="Office Hours (9:00 AM - 6:00 PM)">
                      Office Hours (9:00 AM - 6:00 PM)
                    </option>

                    <option value="Morning (8:00 AM - 12:00 PM)">
                      Morning (8:00 AM - 12:00 PM)
                    </option>

                    <option value="Afternoon (12:00 PM - 4:00 PM)">
                      Afternoon (12:00 PM - 4:00 PM)
                    </option>

                    <option value="Evening (4:00 PM onwards)">
                      Evening (4:00 PM onwards)
                    </option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f07020] hover:bg-[#d95f16] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Send Message"}
                </button>

              </form>
            </div>

            {/* RIGHT SIDE - MAP */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-orange-100 h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=123+Industrial+Area,+Sector+5,+Gurgaon,+Haryana+-+122001"
                className="w-full h-full min-h-[500px]"
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}