import React from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomLoadingButton, InputField } from "./core";
import { profileTypeMutation } from "@/schemas";
import { saveProfile } from "./api";

interface ProfileFormProps {
  initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    age?: string;
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
      await saveProfile(values);
      window.location.href = "/profile";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: "An unknown error occurred." });
      }
    } finally {
      setSubmitting(false);
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
