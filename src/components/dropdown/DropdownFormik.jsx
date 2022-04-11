import { useField } from "formik";
import React, { useState, useEffect } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownFormik = ({ lableText, name, data, setValue, dropdownLabel = "Select your job" }) => {
  const [label, setLabel] = useState(dropdownLabel);
  const { show, setShow, nodeRef } = useClickOutSide();
  const [field, meta] = useField({ name });
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };

  useEffect(() => {
    if (field.value === "") setLabel(dropdownLabel);
  }, [field.value]);

  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer">{lableText}</label>
      <div className="relative" ref={nodeRef}>
        <div
          className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-lg cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <span>{label}</span>
        </div>
        <div
          className={`absolute left-0 w-full bg-white rounded-lg top-full ${
            show ? "" : "opacity-0 invisible"
          }`}
        >
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <div
                className="p-5 cursor-pointer hover:bg-gray-100"
                onClick={handleClickDropdownItem}
                data-value={item.value}
                key={item.id}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
      {meta.touched && meta.error ? <p className="text-sm text-red-500">{meta.error}</p> : null}
    </div>
  );
};

export default DropdownFormik;
