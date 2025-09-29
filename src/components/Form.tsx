"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  firstName: z.string().min(4, { message: "Minimum length is 4" }),
  lastName: z.string().min(4, { message: "Minimum length is 4" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(4, { message: "Minimum length is 4" }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: "Invalid phone number",
  }),
});

type FormData = z.infer<typeof schema>;

const onSubmit: SubmitHandler<FormData> = async (data) => {
  console.log(data);
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 space-y-4"
    >
      {/* First and Last Name */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Address */}
      <div>
        <input
          type="text"
          placeholder="Address"
          {...register("address")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address.message}</span>
        )}
      </div>

      {/* City and Postal Code */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="City"
            {...register("city")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="number"
            placeholder="Postal Code"
            {...register("postalCode")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.postalCode && (
            <span className="text-red-500 text-sm">
              {errors.postalCode.message}
            </span>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <input
          type="text"
          placeholder="Country"
          {...register("country")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.country && (
          <span className="text-red-500 text-sm">{errors.country.message}</span>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone")}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      {/* Submit Button */}
    </form>
  );
};

export default Form;
