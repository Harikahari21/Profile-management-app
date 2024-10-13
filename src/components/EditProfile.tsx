import { editProfileTypeMutation } from "@/schemas";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, FieldProps, Form, Formik } from "formik";
import { CustomLoadingButton, InputField } from "./core";

interface EditProfileProps {
  profile: any;
  onClose: () => void;
  onUpdate: (updatedProfile: any) => void;
}

const EditProfile = ({ profile, onClose, onUpdate }: EditProfileProps) => {
  const [initialProfile, setInitialProfile] = useState(profile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setInitialProfile(JSON.parse(savedProfile));
    }
  }, []);

  const {
    editProfileTypeSchema,
    editProfileTypeSchemaInitialValue,
    editProfileTypeSchemaValidation,
  } = editProfileTypeMutation({ profile: initialProfile });

  const handleSubmit = (values: any) => {
    localStorage.setItem("profile", JSON.stringify(values));
    setInitialProfile(values);
    onUpdate(values);
    onClose();
  };
  return (
    <Formik
      initialValues={editProfileTypeSchemaInitialValue}
      validationSchema={Yup.object(editProfileTypeSchemaValidation)}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form className="grid grid-cols-12  gap-x-4 gap-y-7">
          {editProfileTypeSchema.map((inputItem) => (
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
              title={"Update"}
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

export default EditProfile;
