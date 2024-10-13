import React from "react";
// import { aadLeaveType, formikProps, leaveTypeMutation } from "@/schemas";
// import errorHelper from "@/utils/error";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomLoadingButton, InputField } from "./core";
import { profileTypeMutation } from "@/schemas";

const ProfileForm = () => {
  const {
    profileTypeSchema,
    profileTypeSchemaInitialValue,
    profileTypeSchemaValidation,
  } = profileTypeMutation();
  return (
    <Formik
      initialValues={profileTypeSchemaInitialValue}
      validationSchema={Yup.object(profileTypeSchemaValidation)}
      //   onSubmit={handleAddLeaveType}
      onSubmit={(values) => {
        console.log(values);
      }}
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
              title={"Add"}
              //   loading={isLoading}
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
