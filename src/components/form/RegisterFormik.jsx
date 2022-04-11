import { Formik } from "formik";
import * as yup from "yup";
import CheckboxFormik from "../checkbox/CheckboxFormik";
import DropdownFormik from "../dropdown/DropdownFormik";
import InputFormik from "../input/InputFormik";
import RadioFormik from "../radio/RadioFormik";

const dropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
  {
    id: 4,
    value: "constructor",
    text: "Constructor",
  },
];

const RegisterFormik = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        gender: "male",
        job: "",
        term: false,
      }}
      validationSchema={yup.object({
        username: yup.string().required("Please enter your username"),
        email: yup
          .string()
          .email("Please enter valid email address")
          .required("Please enter your email"),
        password: yup
          .string()
          .required("Please enter your password")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message:
              "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
          })
          .min(8, "Your password must be at least 8 characters or greater"),
        gender: yup
          .string()
          .required("Please select your gender")
          .oneOf(["male", "female"], "You can only select male or female"),
        job: yup
          .string()
          .required("Please select your job")
          .oneOf(["teacher", "developer", "doctor", "constructor"]),
        term: yup.boolean().oneOf([true], "Please accept the terms and conditions"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 500);
      }}
    >
      {(formik) => {
        console.log("Hieu", formik);
        const watchGender = formik.values.gender;

        return (
          <form onSubmit={formik.handleSubmit} className="max-w-[300px] mx-auto my-10">
            <InputFormik
              id="username"
              name="username"
              label="Username"
              placeholder="Enter your username"
              type="text"
            />
            <InputFormik
              id="email"
              name="email"
              label="Email address"
              placeholder="Enter your email address"
              type="email"
            />
            <InputFormik
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="password" className="cursor-pointer">
                Gender
              </label>
              <div className="flex items-center gap-5">
                <RadioFormik
                  name="gender"
                  value="male"
                  label="Male"
                  checked={watchGender === "male"}
                />
                <RadioFormik
                  name="gender"
                  value="female"
                  label="Female"
                  checked={watchGender === "female"}
                />
              </div>
            </div>
            <DropdownFormik
              lableText="Your job"
              name="job"
              data={dropdownData}
              dropdownLabel="Select your job"
              setValue={formik.setFieldValue}
            />
            <CheckboxFormik name="term">I accept the terms and conditions</CheckboxFormik>
            <button
              className={`w-full p-5 mt-5 font-semibold text-white bg-blue-500 rounded-lg ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormik;
