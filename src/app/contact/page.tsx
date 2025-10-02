"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Title from "@/components/Title";

// Zod validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\+?[\d\s\-\(\)]+$/, { message: "Invalid phone number format" })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const t = useTranslations("Contact");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    console.log("Contact form data:", data);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically send the data to your backend API
      alert("Message sent successfully! We'll get back to you soon.");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12 text-2xl">
          <Title t1={t("contact_us")} t2={t("us")} />
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("page_description")}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-gray-900 text-white p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-6">{t("get_in_touch")}</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t("address")}</h4>
                  <p className="text-gray-300">
                    {t("address_line1")}
                    <br />
                    {t("address_line2")}
                    <br />
                    {t("address_line3")}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t("phone")}</h4>
                  <p className="text-gray-300">{t("phone_number")}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t("email")}</h4>
                  <p className="text-gray-300">{t("email_address")}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    {t("business_hours")}
                  </h4>
                  <p className="text-gray-300">
                    {t("hours_weekday")}
                    <br />
                    {t("hours_saturday")}
                    <br />
                    {t("hours_sunday")}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("send_message")}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("full_name_required")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t("enter_full_name")}
                    {...register("name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("email_required")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("enter_email_address")}
                    {...register("email")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("phone_optional")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder={t("enter_phone")}
                    {...register("phone")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("subject_required")}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder={t("enter_subject")}
                    {...register("subject")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("message_required")}
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder={t("enter_message")}
                    {...register("message")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-vertical"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black w-full text-center hover:opacity-85 text-white text-xs px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-200 uppercase transition-all duration-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("sending_message")}
                      </span>
                    ) : (
                      t("send_message_button")
                    )}
                  </button>
                </div>

                {/* Root Error */}
                {errors.root && (
                  <div className="text-center">
                    <p className="text-sm text-red-600">
                      {errors.root.message}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
