import React, { useContext } from "react";
import { monthYear, transactionType, fromAccount } from "../Data/Data";
import { Formik, useFormik } from "formik";
import { dashBoardSchema } from "../Schema";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
interface formdata {
  birthday: string;
  month: string;
  transaction: string;
  fromAccount: string;
  toAccount: string;
  amount: number | string;
  notes: string;
  recipe: string;
}
const initialValues: formdata = {
  birthday: "",
  month: "",
  transaction: "",
  fromAccount: "",
  toAccount: "",
  amount: "",
  notes: "",
  recipe: "",
};

const DashBoard = () => {
  const { details, setDetails } = useContext(UserContext);
  const { e, p } = details;
  const { values, errors, resetForm, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: dashBoardSchema,
      onSubmit: (values, { resetForm }) => {
        const existingData = JSON.parse(localStorage.getItem(e + p) || "[]");

        const newData = {
          birthday: values.birthday,
          month: values.month,
          transaction: values.transaction,
          fromAccount: values.fromAccount,
          toAccount: values.toAccount,
          amount: values.amount,
          notes: values.notes,
          recipe: values.recipe,
        };

        // If existingData is an array, push newData to it
        if (Array.isArray(existingData)) {
          existingData.push(newData);
        } else {
          // If existingData is not an array (null or undefined), create a new array with newData
          localStorage.setItem(e + p, JSON.stringify([newData]));
        }

        // Save the updated data to localStorage
        localStorage.setItem(e + p, JSON.stringify(existingData));
        console.log(localStorage.getItem(e + p));

        // Reset the form to empty values after successful submission
        resetForm();
      },
    });
  return (
    <div>
      <div className=" mt-3 d-flex justify-content-end w-75">
        <Link to={"/transactions"} className="btn btn-danger ">
          Transactions
        </Link>
      </div>
      <form className="my-2" onSubmit={handleSubmit}>
        <div className=" rounded-5 my-0 mx-auto mt- w-50 justify-content-center align-items-center bg-light  border border-secondary text-dark">
          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <div className="mx-3">
              <label htmlFor="birthday">Date:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                onChange={handleChange}
                value={values.birthday}
              ></input>
              {errors.birthday && touched.birthday ? (
                <p className="text-danger">{errors.birthday}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="month">Month Year:</label>
              <select
                name="month"
                id="month"
                onChange={handleChange}
                value={values.month}
              >
                {monthYear.map((m) => (
                  <option key={m.id} value={m.label}>
                    {m.label}
                  </option>
                ))}
              </select>
              {errors.month && touched.month ? (
                <p className="text-danger">{errors.month}</p>
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <label htmlFor="transaction">Transaction Type:</label>
            <select
              name="transaction"
              id="transaction"
              className="btn btn-secondary dropdown-toggle dropdown-toggle-split bg-light text-secondary  "
              onChange={handleChange}
              value={values.transaction}
            >
              <option key="0" value=""></option>
              {transactionType.map((t) => (
                <option key={t.id} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.transaction && touched.transaction ? (
              <p className="text-danger">{errors.transaction}</p>
            ) : null}
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <div className="mx-3">
              <label htmlFor="fromAccount">From Account:</label>
              <select
                name="fromAccount"
                id="fromAccount"
                onChange={handleChange}
                value={values.fromAccount}
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split bg-light text-secondary  "
              >
                <option key="0" value=""></option>
                {fromAccount.map((t) => {
                  if (t.label !== values.toAccount) {
                    return (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>
              {errors.fromAccount && touched.fromAccount ? (
                <p className="text-danger">{errors.fromAccount}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="toAccount">To Account:</label>
              <select
                name="toAccount"
                id="toAccount"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split bg-light text-secondary"
                onChange={handleChange}
                value={values.toAccount}
              >
                <option key="0" value=""></option>
                {fromAccount.map((t) => {
                  if (t.label !== values.fromAccount) {
                    return (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>
              {errors.toAccount && touched.toAccount ? (
                <p className="text-danger">{errors.toAccount}</p>
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <div className="mx-5">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="w-50 rounded-2 border"
                onChange={handleChange}
                value={values.amount}
              ></input>
              {errors.amount && touched.amount ? (
                <p className="text-danger">{errors.amount}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="recipe">Recipe:</label>
              <input
                type="file"
                name="recipe"
                accept="image/gif, image/jpeg, image/png"
                className="w-50 rounded-2 border"
                onChange={handleChange}
                value={values.recipe}
              />
              {errors.recipe && touched.recipe ? (
                <p className="text-danger">{errors.recipe}</p>
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <label htmlFor="recipe">Notes:</label>
            <textarea
              id="w3review"
              name="notes"
              className="rounded-2 border "
              onChange={handleChange}
              value={values.notes}
            />
            {errors.notes && touched.notes ? (
              <p className="text-danger">{errors.notes}</p>
            ) : null}
          </div>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <button type="submit" className="rounded-2 border">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashBoard;
