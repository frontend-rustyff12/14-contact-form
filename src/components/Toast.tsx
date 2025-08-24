type toastProps = {
  visible: boolean;
};
export default function Toast({ visible }: toastProps) {
  return (
    <section
      className={`bg-cust-Grey-900 p-6 flex flex-col gap-2 rounded-2xl text-cust-White md:w-1/3 absolute top-6 left-1/2 transform -translate-x-1/2 ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="flex gap-4 items-center">
        <img
          className="h-5 w-5 "
          src="/icon-success-check.svg"
          alt="Check mark icon"
        />
        <h2>Message Sent!</h2>
      </div>
      <p className="">
        Thanks for completing the form. We'll be in touch soon!
      </p>
    </section>
  );
}
