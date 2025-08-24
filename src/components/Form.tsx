import { useState, useRef, useEffect, type FormEvent } from "react";
import Toast from "./Toast";
import {
  inputClass,
  queryInputClass,
  initialFormState,
  type formType,
  type FormDataRaw,
  type FormErrors,
} from "../utils";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formObj, setFormObj] = useState<formType>(initialFormState);
  const [success, setSuccess] = useState<boolean>(false);

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

  function handleQueryChange(value: string) {
    setFormObj((prev) => ({
      ...prev,
      query: { value, isValid: ["support", "general"].includes(value) },
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: FormDataRaw = Object.fromEntries(formData.entries());

      // Override  value for controlled radio buttons
      data.query = formObj.query.value;

      // Update validation state
      const validationErrors = validateForm(data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setFormObj({
          fname: { value: data.fname || "", isValid: !validationErrors.fname },
          lname: { value: data.lname || "", isValid: !validationErrors.lname },
          email: { value: data.email || "", isValid: !validationErrors.email },
          query: { value: data.query || "", isValid: !validationErrors.query },
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
        query: { value: data.query || "", isValid: true },
        message: { value: data.message || "", isValid: true },
        consent: data.consent === "on",
      };
      setFormObj(processedData);
      console.log("Form submitted:", processedData, "", formObj);
      setSuccess(true);
    }
  }

  useEffect(() => {
    if (success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setFormObj(initialFormState);
      formRef.current?.reset();
    }
  }, [success]);

  return (
    <section className="bg-cust-White p-6 font-karla rounded-2xl md:w-1/2 ">
      <Toast visible={success} />
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
            <input
              className={`${inputClass} ${
                !errors.fname
                  ? "outline outline-cust-Grey-500"
                  : "outline outline-cust-Red"
              }`}
              type="text"
              id="fname"
              name="fname"
            />
            {errors.fname && <p className="text-cust-Red">{errors.fname}</p>}
          </div>
          <div className="flex flex-col gap-2 md:w-full">
            <label className="text-cust-Grey-900" htmlFor="lname">
              Last Name *
            </label>
            <input
              className={`${inputClass} ${
                !errors.lname
                  ? "outline outline-cust-Grey-500"
                  : "outline outline-cust-Red"
              }`}
              type="text"
              id="lname"
              name="lname"
            />
            {errors.lname && <p className="text-cust-Red">{errors.lname}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-cust-Grey-900" htmlFor="email">
            Email Address *
          </label>
          <input
            className={`${inputClass} ${
              !errors.email
                ? "outline outline-cust-Grey-500"
                : "outline outline-cust-Red"
            }`}
            type="email"
            id="email"
            name="email"
          />
          {errors.email && <p className="text-cust-Red">{errors.email}</p>}
        </div>

        {/* Query */}
        <div className="">
          <fieldset>
            <legend className="mb-4 text-cust-Grey-900">Query Type *</legend>
            <div className="flex flex-col gap-4 md:flex-row">
              <label
                htmlFor="general"
                className={`${queryInputClass} ${
                  formObj.query.value === "general"
                    ? "bg-cust-Green-200 outline-1 outline-cust-Green-600"
                    : "outline outline-cust-Grey-500"
                }`}
              >
                <input
                  type="radio"
                  id="general"
                  name="query"
                  value="general"
                  checked={formObj.query.value === "general"}
                  onChange={() => handleQueryChange("general")}
                  className="h-4 w-4 accent-cust-Green-600"
                />
                <span className="text-cust-Grey-900">General Request</span>
              </label>

              <label
                htmlFor="support"
                className={`${queryInputClass} ${
                  formObj.query.value === "support"
                    ? "bg-cust-Green-200 outline-1 outline-cust-Green-600"
                    : "outline outline-cust-Grey-500"
                }`}
              >
                <input
                  type="radio"
                  id="support"
                  name="query"
                  value="support"
                  checked={formObj.query.value === "support"}
                  onChange={() => handleQueryChange("support")}
                  className="h-4 w-4 accent-cust-Green-600"
                />
                <span className="text-cust-Grey-900">Support Request</span>
              </label>
            </div>
            {errors.query && <p className="text-cust-Red">{errors.query}</p>}
          </fieldset>
        </div>

        {/* Message */}
        <div className="flex flex-col ">
          <label className="mb-4 text-cust-Grey-900" htmlFor="message">
            Message *
          </label>
          <textarea
            className={`${inputClass} ${
              !errors.email
                ? "outline outline-cust-Grey-500"
                : "outline outline-cust-Red"
            } h-58 md:h-32`}
            name="message"
            id="message"
          ></textarea>
          {errors.message && <p className="text-cust-Red">{errors.message}</p>}
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
          {errors.consent && <p className="text-cust-Red">{errors.consent}</p>}
        </div>
        <button className="bg-cust-Green-600 p-4 text-cust-White font-bold rounded-xl hover:bg-cust-Grey-900 cursor-pointer">
          Submit
        </button>
      </form>
    </section>
  );
}
