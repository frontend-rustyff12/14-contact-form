import { inputClass } from "./utils";
export default function Form() {
  return (
    <section className="bg-cust-White p-6 font-karla rounded-2xl md:w-1/2 ">
      <h1 className="text-3xl font-bold text-cust-Grey-900">Contact Us</h1>
      <form className="grid grid-cols-1 gap-7 mt-6">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 ">
          <div className="flex flex-col gap-2 md:w-full">
            <label className="text-cust-Grey-900" htmlFor="fname">
              First Name *
            </label>
            <input className={inputClass} type="text" id="fname" name="fname" />
            <p className="hidden">This field is required</p>
          </div>
          <div className="flex flex-col gap-2 md:w-full">
            <label className="text-cust-Grey-900" htmlFor="lname">
              Last Name *
            </label>
            <input className={inputClass} type="text" id="lname" name="lname" />
            <p className="hidden">This field is required</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-cust-Grey-900" htmlFor="email">
            Email Address *
          </label>
          <input className={inputClass} type="email" id="email" name="email" />
          <p className="hidden">Please enter a valid email address</p>
        </div>
        <div className="">
          <fieldset>
            <legend className="mb-4 text-cust-Grey-900">Query Type *</legend>
            <div className="flex flex-col gap-4 md:flex-row">
              <div
                className={`${inputClass} flex items-center gap-4 md:w-full`}
              >
                <input
                  className="h-4 w-4 "
                  type="radio"
                  id="general"
                  value="general"
                />
                <label className="text-cust-Grey-900" htmlFor="general">
                  General Enquiry
                </label>
              </div>
              <div
                className={`${inputClass} flex items-center gap-4 md:w-full`}
              >
                <input
                  className="h-4 w-4 "
                  type="radio"
                  id="support"
                  value="support"
                />
                <label className="text-cust-Grey-900" htmlFor="support">
                  Support Request
                </label>
              </div>
            </div>

            <p className="hidden">Please select a query type</p>
          </fieldset>
        </div>
        <div className="flex flex-col ">
          <label className="mb-4 text-cust-Grey-900" htmlFor="message">
            Message *
          </label>
          <textarea
            className={`${inputClass} h-58 md:h-32`}
            name="message"
            id="message"
          ></textarea>
          <p className="hidden">This field is required</p>
        </div>
        <div className="flex gap-4">
          <input
            className="scale-125"
            type="checkbox"
            id="consent"
            name="consent"
          />

          <label className="text-cust-Grey-900" htmlFor="consent">
            I consent to being contacted by the team
          </label>
          <p className="hidden">
            To submit this form, please consent to being contacted
          </p>
        </div>
        <button className="bg-cust-Green-600 p-4 text-cust-White font-bold rounded-xl hover:bg-cust-Grey-900 cursor-pointer">
          Submit
        </button>
      </form>
    </section>
  );
}
