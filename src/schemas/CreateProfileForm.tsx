import * as Yup from "yup";

const profileTypeMutation = () => {
  const profileTypeSchema = [
    {
      key: "1",
      name: "name",
      label: " Name",
      placeholder: "Enter your name",
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required("Name is required")
        .matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be less than 50 characters")
        .trim(),
      initialValue: "",
      className: "col-span-12 ",
    },
    {
      key: "2",
      name: "email",
      label: "Enter Your Email",
      placeholder: "youremail@domain.com",
      type: "email",
      required: true,
      validationSchema: Yup.string()
        .email("Invalid email")
        .required("Email is Required !")
        .trim(),
      initialValue: "",
      className: "col-span-12",
    },
    {
      key: "3",
      name: "age",
      label: "Age",
      placeholder: "Enter Your Age",
      type: "number",
      required: false,
      validationSchema: Yup.string()
        .matches(/^[0-9]*$/, "Age must only contain digits")
        .trim(),
      initialValue: "",
      className: "col-span-12 ",
    },
  ];

  const profileTypeSchemaInitialValue = profileTypeSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const profileTypeSchemaValidation = profileTypeSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema | Yup.NumberSchema }
  );
  return {
    profileTypeSchema,
    profileTypeSchemaInitialValue,
    profileTypeSchemaValidation,
  };
};

export { profileTypeMutation };
