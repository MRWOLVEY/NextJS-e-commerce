"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import z from "zod";

const createSchema = (t: any) =>
  z.object({
    firstName: z.string().min(4, { message: t("min_length_4") }),
    lastName: z.string().min(4, { message: t("min_length_4") }),
    email: z
      .string()
      .email({ message: t("invalid_email") })
      .min(1, { message: t("email_required") }),
    address: z.string().min(1, { message: t("address_required") }),
    city: z.string().min(1, { message: t("city_required") }),
    postalCode: z.string().min(1, { message: t("postal_code_required") }),
    country: z.string().min(4, { message: t("min_length_4") }),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
      message: t("invalid_phone"),
    }),
  });

const Form = () => {
  const t = useTranslations("Auth");
  const schema = createSchema(t);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    delayError: 300,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 space-y-4"
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("first_name")}
            {...register("firstName")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("last_name")}
            {...register("lastName")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder={t("email_address")}
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder={t("address")}
          {...register("address")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.address && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.address.message}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("city")}
            {...register("city")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.city && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.city.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="number"
            placeholder={t("postal_code")}
            {...register("postalCode")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.postalCode && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.postalCode.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder={t("country")}
          {...register("country")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.country && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.country.message}
          </span>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder={t("phone_number")}
          {...register("phone")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
