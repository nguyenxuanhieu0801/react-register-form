import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";

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

const schema = yup
  .object({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
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
    term: yup.boolean().required("Please accept the terms and conditions"),
  })
  .required();

const RegisterHook = () => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(values);
        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          job: "",
          term: false,
        });
      }, 5000);
    });
  };

  const watchGender = watch("gender");

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="max-w-[300px] mx-auto my-10">
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="username" className="cursor-pointer">
          Username
        </label>
        <InputHook
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          control={control}
        />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer">
          Email
        </label>
        <InputHook
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          control={control}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <p className="text-sm text-red-500"></p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <InputHook
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          control={control}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Gender
        </label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <RadioHook
              control={control}
              name="gender"
              value="male"
              checked={watchGender === "male"}
            />
            <span>Male</span>
          </div>
          <div className="flex items-center gap-3">
            <RadioHook
              control={control}
              name="gender"
              value="female"
              checked={watchGender === "female"}
            />
            <span>Female</span>
          </div>
        </div>
        {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Are you</label>
        <DropdownHook
          control={control}
          setValue={setValue}
          name="job"
          data={dropdownData}
          dropdownLabel="Select your job"
        />
        {errors.job && <p className="text-sm text-red-500">{errors.job.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <CheckboxHook control={control} text="I accept the terms and conditions" name="term" />
        {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}
      </div>
      <button
        className={`w-full p-5 mt-5 font-semibold text-white bg-blue-500 rounded-lg ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
