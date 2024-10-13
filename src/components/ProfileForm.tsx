import React from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomLoadingButton, InputField } from "./core";
import { profileTypeMutation } from "@/schemas";
import { saveProfile } from "./api"; // Use LocalStorage API

interface ProfileFormProps {
  initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    age?: string; // Make age optional if it's not required
  };
}

const ProfileForm = () => {
  const {
    profileTypeSchema,
    profileTypeSchemaInitialValue,
    profileTypeSchemaValidation,
  } = profileTypeMutation();

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await saveProfile(values); // Save profile to localStorage (POST/PUT)
      window.location.href = "/profile"; // Redirect to the profile display page on success
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ submit: error.message }); // Handle error messages
      } else {
        setErrors({ submit: "An unknown error occurred." });
      }
    } finally {
      setSubmitting(false); // Stop the loader
    }
  };

  return (
    <Formik
      initialValues={profileTypeSchemaInitialValue}
      validationSchema={Yup.object(profileTypeSchemaValidation)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="grid grid-cols-12  gap-x-4 gap-y-7">
          {profileTypeSchema.map((inputItem) => (
            <Field name={inputItem.name} key={inputItem.key}>
              {(props: FieldProps<string>) => (
                <div
                  className={`flex w-full flex-col justify-center gap-2  ${inputItem?.className}`}
                >
                  <div
                    className={`font-medium  ${
                      inputItem?.key ? "text-dark/80" : "text-secondary"
                    }`}
                  >
                    {inputItem.label}{" "}
                    <span>{inputItem?.required ? "*" : ""}</span>
                  </div>
                  {inputItem?.key ? (
                    <div className="relative">
                      <InputField
                        fullWidth
                        key={inputItem?.key}
                        variant="outlined"
                        name={inputItem?.name}
                        placeholder={inputItem?.placeholder}
                        type={inputItem?.type}
                        value={formik?.values[inputItem?.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="absolute -bottom-5 text-youtube/80 text-sm">
                        {Boolean(
                          formik?.touched[inputItem?.name] &&
                            formik?.errors[inputItem?.name]
                        )}
                        {formik?.touched[inputItem?.name] &&
                          formik?.errors[inputItem?.name]}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </Field>
          ))}
          <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
            <CustomLoadingButton
              title={"Create"}
              loading={formik.isSubmitting}
              type="submit"
              className="btn-primary py-3 rounded-md w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
