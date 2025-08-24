import { useState, useRef, type FormEvent } from "react";
import {
  inputClass,
  queryInputClass,
  type formType,
  type FormDataRaw,
  type FormErrors,
} from "./utils";
export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formObj, setFormObj] = useState<formType>({
    fname: { value: "", isValid: false },
    lname: { value: "", isValid: false },
    email: { value: "", isValid: false },
    query: { value: "", isValid: false },
    message: { value: "", isValid: false },
    consent: false,
  });

  // Validation
  function validateForm(data: FormDataRaw): FormErrors {
    const newErrors: FormErrors = {};
    if (!data.fname) newErrors.fname = "This field is required";
    if (!data.lname) newErrors.lname = "This field is required";
    if (!data.email) {
      newErrors.email = "Please enter a valid emil address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid emil address";
    }
    if (!data.query || !["support", "general"].includes(data.query))
      newErrors.query = "Please select a query type";
    if (!data.message) newErrors.message = "This field is required";
    if (!data.consent)
      newErrors.consent =
        "To submit this form, please consent to being contacted";
    return newErrors;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: FormDataRaw = Object.fromEntries(formData.entries());

      // Update validation state
      const validationErrors = validateForm(data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setFormObj({
          fname: { value: data.fname || "", isValid: !validationErrors.fname },
          lname: { value: data.lname || "", isValid: !validationErrors.lname },
          email: { value: data.email || "", isValid: !validationErrors.email },
          query: {
            value: data.query || "support",
            isValid: !validationErrors.query,
          },
          message: {
            value: data.message || "",
            isValid: !validationErrors.message,
          },
          consent: data.consent === "on",
        });
        return;
      }
      // Validation passed, clear errors
      setErrors({});
      // Update formObj with valid data
      const processedData: formType = {
        fname: { value: data.fname || "", isValid: true },
        lname: { value: data.lname || "", isValid: true },
        email: { value: data.email || "", isValid: true },
        query: { value: data.query || "support", isValid: true },
        message: { value: data.message || "", isValid: true },
        consent: data.consent === "on",
      };
      setFormObj(processedData);
      console.log("Form submitted:", processedData, "", formObj);
    }
  }

  return (
    <section className="bg-cust-White p-6 font-karla rounded-2xl md:w-1/2 ">
      <h1 className="text-3xl font-bold text-cust-Grey-900">Contact Us</h1>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-7 mt-6"
        noValidate
      >
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 ">
          <div className="flex flex-col gap-2 md:w-full">
            <label className="text-cust-Grey-900" htmlFor="fname">
              First Name *
            </label>
            <input className={inputClass} type="text" id="fname" name="fname" />
            {errors.fname && <p className="text-red-500">{errors.fname}</p>}
          </div>
          <div className="flex flex-col gap-2 md:w-full">
            <label className="text-cust-Grey-900" htmlFor="lname">
              Last Name *
            </label>
            <input className={inputClass} type="text" id="lname" name="lname" />
            {errors.lname && <p className="text-red-500">{errors.lname}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-cust-Grey-900" htmlFor="email">
            Email Address *
          </label>
          <input className={inputClass} type="email" id="email" name="email" />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* Query */}
        <div className="">
          <fieldset>
            <legend className="mb-4 text-cust-Grey-900">Query Type *</legend>
            <div className="flex flex-col gap-4 md:flex-row">
              <label
                htmlFor="general"
                className={`${queryInputClass} flex items-center gap-4 md:w-full cursor-pointer
    outline outline-cust-Grey-500
    peer-checked:bg-cust-Green-200 peer-checked:outline-1 peer-checked:outline-cust-Green-600
  `}
              >
                <input
                  type="radio"
                  id="general"
                  name="query"
                  value="general"
                  className="peer h-4 w-4 accent-cust-Green-600"
                />
                <span className="text-cust-Grey-900">General Request</span>
              </label>

              <label
                htmlFor="support"
                className={`${queryInputClass} flex items-center gap-4 md:w-full cursor-pointer outline outline-cust-Grey-500 peer-checked:bg-cust-Green-200 peer-checked:outline-1 peer-checked:outline-cust-Green-600
  `}
              >
                <input
                  type="radio"
                  id="support"
                  name="query"
                  value="support"
                  className="peer h-4 w-4 accent-cust-Green-600"
                />
                <span className="text-cust-Grey-900">Support Request</span>
              </label>
            </div>

            {errors.query && <p className="text-red-500">{errors.query}</p>}
          </fieldset>
        </div>

        {/* Message */}
        <div className="flex flex-col ">
          <label className="mb-4 text-cust-Grey-900" htmlFor="message">
            Message *
          </label>
          <textarea
            className={`${inputClass} h-58 md:h-32`}
            name="message"
            id="message"
          ></textarea>
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </div>
        <div className="flex gap-4 flex-col">
          <div className="flex gap-4">
            <input
              className="scale-125 checked:bg-cust-Green-600"
              type="checkbox"
              id="consent"
              name="consent"
            />
            <label className="text-cust-Grey-900" htmlFor="consent">
              I consent to being contacted by the team
            </label>
          </div>
          {errors.consent && <p className="text-red-500">{errors.consent}</p>}
        </div>
        <button className="bg-cust-Green-600 p-4 text-cust-White font-bold rounded-xl hover:bg-cust-Grey-900 cursor-pointer">
          Submit
        </button>
      </form>
    </section>
  );
}
