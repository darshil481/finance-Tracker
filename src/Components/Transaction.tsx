import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

interface TransactionData {
  birthday: string;
  month: string;
  transaction: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  notes: string;
  recipe: string;
}
interface UserDetails {
  e: string;
  p: string;
}

const Transaction = ({ details }: { details: UserDetails }) => {
  // const { details, setDetails } = useContext(UserContext);
   const {e, p } = details;

  console.log("email", e, p);
  const data = JSON.parse(localStorage.getItem(e + p) || "{}");
  const [recordPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [record, setRecord] = useState<TransactionData[]>([]);
  const [npage, setNPage] = useState(0);
  const [flag, setFlag] = useState(0);
  function set(i: number) {
    setFlag(i);
  }
  useEffect(() => {
    // Calculate number of pages needed
    if (data && Array.isArray(data)) {
      setNPage(Math.ceil(data.length / recordPerPage));
    } else {
      setNPage(0);
    }
    // if(flag == 0){
    //   let sortedData = [...data].sort((a, b) => a.amount - b.amount);
    //   console.log("asc", sortedData);
    //   setRecord(sortedData);
    // }else{
    //   let sortedData = [...data].sort((a, b) => b.amount - a.amount);
    //   console.log("des",sortedData)
    //   setRecord(sortedData);
    // }

    // Calculate the first and last index for the current page
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;

    // Update the record state with the data for the current page
    if (Array.isArray(data) && data.length > 0) {
      if (flag == 0) {
        let sortedData = [...data].sort((a, b) => a.amount - b.amount);
        setRecord(sortedData.slice(firstIndex, lastIndex));
        // setRecord(sortedData);
      } else {
        let sortedData = [...data].sort((a, b) => b.amount - a.amount);
        setRecord(sortedData.slice(firstIndex, lastIndex));
      }
    } else {
      setRecord([]);
    }
  }, [flag, currentPage, recordPerPage]);

  let numbers = [...Array(npage).keys()].map((i) => i + 1);
  function prePage() {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(n: number) {
    setCurrentPage(n);
  }

  function nextPage() {
    if (currentPage <= npage - 1) {
      setCurrentPage(currentPage + 1);
    }
  }
  // function decending() {
  //   let sortedData = [...record].sort((a, b) => b.amount - a.amount);
  //   setRecord(sortedData);
  // }

  // function ascending() {
  //   let sortedData = [...record].sort((a, b) => a.amount - b.amount);
  //   setRecord(sortedData);
  // }

  return (
    <div>
      <div className="my-3 d-flex justify-content-center align-item-center border rounded-5">
        <h3>Transaction List</h3>{" "}
      </div>
      <table className="table table-striped my-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Month </th>
            <th>Transaction</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>
              Amount{" "}
              <span onClick={() => set(0)}>
                <button>ace</button>
              </span>
              <span onClick={() => set(1)}>
                <button>dec</button>
              </span>
            </th>
            <th>Notes</th>
            <th>Recipe</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {record.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.birthday}</td>
              <td>{item.month}</td>
              <td>{item.transaction} </td>
              <td>{item.fromAccount}</td>
              <td>{item.toAccount}</td>
              <td>{item.amount}</td>
              <td>{item.notes}</td>
              <td>{item.recipe}</td>
              <td className="text-success">Edit</td>
              <td className="text-danger">Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <Link to="#" className="page-link" onClick={prePage}>
              Prev
            </Link>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage == n ? "active" : ""}`}
              key={i}
            >
              <Link to="#" className="page-link" onClick={() => changePage(n)}>
                {n}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link to="#" className="page-link" onClick={nextPage}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Transaction;
