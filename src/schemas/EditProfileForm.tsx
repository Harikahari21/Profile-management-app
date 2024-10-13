import * as Yup from "yup";

const editProfileTypeMutation = ({ profile }: { profile: any }) => {
  const editProfileTypeSchema = [
    {
      key: "1",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required("Name is required")
        .matches(
          /^[A-Za-z ]+$/,
          "First Name must only contain alphabetic characters"
        )
        .trim(),
      initialValue: profile?.firstName,
      className: "col-span-12 ",
    },
    {
      key: "2",
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required("Name is required")
        .matches(
          /^[A-Za-z ]+$/,
          "Last Name must only contain alphabetic characters"
        )
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be less than 50 characters")
        .trim(),
      initialValue: profile?.lastName,
      className: "col-span-12 ",
    },
    {
      key: "3",
      name: "email",
      label: "Enter Your Email",
      placeholder: "youremail@domain.com",
      type: "email",
      required: true,
      validationSchema: Yup.string()
        .email("Invalid email")
        .required("Email is Required !")
        .trim(),
      initialValue: profile?.email,
      className: "col-span-12",
    },
    {
      key: "4",
      name: "age",
      label: "Age",
      placeholder: "Enter Your Age",
      type: "number",
      required: false,
      validationSchema: Yup.string()
        .matches(/^[0-9]*$/, "Age must only contain digits")
        .trim(),
      initialValue: profile?.age,
      className: "col-span-12 ",
    },
  ];

  const editProfileTypeSchemaInitialValue = editProfileTypeSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const editProfileTypeSchemaValidation = editProfileTypeSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema | Yup.NumberSchema }
  );
  return {
    editProfileTypeSchema,
    editProfileTypeSchemaInitialValue,
    editProfileTypeSchemaValidation,
  };
};

export { editProfileTypeMutation };
