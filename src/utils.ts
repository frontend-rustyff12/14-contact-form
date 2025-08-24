export const inputClass =
  "outline outline-cust-Grey-500 rounded-lg p-3 focus:outline-1 focus:outline-cust-Green-600";

export const queryInputClass =
  "rounded-lg p-3 focus:outline-1 focus:outline-cust-Green-600";

type valueType = {
  value: string;
  isValid: boolean;
};

export type formType = {
  fname: valueType;
  lname: valueType;
  email: valueType;
  query: valueType;
  message: valueType;
  consent: boolean;
};

export interface FormDataRaw {
  fname?: string;
  lname?: string;
  email?: string;
  query?: string;
  message?: string;
  consent?: string;
}

export interface FormErrors {
  fname?: string;
  lname?: string;
  email?: string;
  query?: string;
  message?: string;
  consent?: string;
}
