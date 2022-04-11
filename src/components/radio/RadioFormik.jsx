import { useField } from "formik";
import React from "react";

const RadioFormik = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer custom-radio">
        <input type="radio" className="hidden" {...field} {...props} />
        <div className="w-full h-full bg-white rounded-full"></div>
      </label>
      <span>{props.label}</span>
      
    </div>
  );
};

export default RadioFormik;
