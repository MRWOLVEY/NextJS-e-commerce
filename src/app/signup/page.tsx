"use client";
import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ShopContext } from "@/context/ShopContext";

const createRegistrationSchema = (t: any) =>
  z.object({
    name: z.string().min(2, { message: t("min_length_2") }),
    email: z
      .string()
      .email({ message: t("invalid_email") })
      .min(1, { message: t("email_required") }),
    password: z
      .string()
      .min(6, { message: t("min_length_6") })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: t("password_complexity"),
      }),
  });

const SignupPage = () => {
  const { dispatch, actions } = useContext(ShopContext);
  const t = useTranslations("Auth");
  const registrationSchema = createRegistrationSchema(t);
  type RegistrationFormData = z.infer<typeof registrationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    delayError: 300,
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    console.log("Registration data:", data);

    // Dispatch register action
    dispatch({
      type: actions.register,
      payload: data,
    });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("create_account")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("create_account_description")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("full_name")}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t("enter_name")}
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("email_address")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("enter_email")}
                {...register("email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("password")}
              </label>
              <input
                id="password"
                type="password"
                placeholder={t("create_strong_password")}
                {...register("password")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black w-full text-center hover:opacity-85 text-white text-xs my-5 px-8 py-3 active:bg-gray-700 rounded-sm shadow-lg shadow-gray-200 uppercase transition-all duration-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
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
                    {t("registering")}
                  </span>
                ) : (
                  t("register")
                )}
              </button>
            </div>

            {errors.root && (
              <div className="text-center">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("already_have_account")}{" "}
              <a
                href="/login"
                className="font-medium text-black hover:text-gray-500"
              >
                {t("sign_in_link")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
