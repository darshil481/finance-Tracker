import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string().email().required("Entern valid Email"),
  pass: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter valid password"),
});
export const RegisterSchema = Yup.object({
  name:Yup.string().required().min(2, "Password must be at least 6 characters"),
  email: Yup.string().email().required("Entern valid Email"),
  pass: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter valid password"),
  cpass:Yup.string().required().oneOf([Yup.ref('pass'),null],"password are not match !!")
});
export const dashBoardSchema = Yup.object({
  birthday: Yup.string().required("require !!"),
  month: Yup.string().required("require !!"),
  transaction: Yup.string().required("require !!"),
  fromAccount: Yup.string().required("require !!"),
  toAccount: Yup.string().required("require !!"),
  amount: Yup.string().required("require !!"),
  notes: Yup.string().required("require !!"),
  recipe: Yup.string().required("require !!")
});