import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMortgage,
  deleteMortgage,
  updateMortgageState,
} from "../reducers/mortgageReducer";

function AddContentForm() {
  const dispatch = useDispatch();

  //form data
  const [productName, setProductName] = useState("");
  const [marketValue, setMarketValue] = useState("");
  const [givenAmount, setGivenAmount] = useState("");
  // const [leftAmount, setLeftAmount] = useState("");
  const [issueDate, setIssueDate] = useState("");
  // const [lastPaid, setLastPaid] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageadded, setMortgageAdded] = useState(false);

  //enabe or disable button

  const addToList = () => {
    const data = {
      productName: productName,
      marketValue: marketValue,
      givenAmount: givenAmount,
      leftAmount: givenAmount,
      issueDate: issueDate,
      lastPaid: issueDate,
      interestRate: interestRate,
    };
    dispatch(updateMortgageState(data));
    setMortgageAdded(true);
  };

  return (
    <>
      <div className="col-12 col-md mb-4">
        <input
          type="text"
          id="productName"
          className="form-control"
          placeholder="Product Name"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          required
        />
      </div>
      <div className="row">
        <div className="col-6 col-md mb-4">
          <input
            type="number"
            id="marketValue"
            className="form-control"
            placeholder="Market Value"
            value={marketValue}
            onChange={(event) => setMarketValue(event.target.value)}
            required
          />
        </div>
        <div className="col-6 col-md mb-4">
          <input
            type="number"
            id="givenAmount"
            className="form-control"
            placeholder="Given Amount"
            value={givenAmount}
            onChange={(event) => setGivenAmount(event.target.value)}
            required
          />
        </div>
        {/* <div className="col-4 col-md mb-4">
          <input
            type="number"
            id="leftAmount"
            className="form-control"
            placeholder="Left Amount"
            value={leftAmount}
            onChange={(event) => setLeftAmount(event.target.value)}
            required
          />
        </div> */}
        </div>
        <div className="row">
        <div className="col col-md mb-4">
            Date of issue: 
          <input
            type="string"
            id="issueDate"
            className="form-control"
            placeholder="YYYY/MM/DD"
            value={issueDate}
            onChange={(event) => setIssueDate(event.target.value)}
            required
          />
        </div>
        {/* <div className="col-4 col-md mb-4">
            Date of last payment:
          <input
            type="string"
            id="lastPaid"
            className="form-control"
            placeholder="YYYY/MM/DD"
            value={lastPaid}
            onChange={(event) => setLastPaid(event.target.value)}
            required
          />
        </div> */}
        </div>
    
      <div className="row">
        <div className="col-12 col-md-4 mb-4">
          <input
            type="number"
            id="interestRate"
            className="form-control"
            placeholder="Daily interest Rate in %"
            value={interestRate}
            onChange={(event) => setInterestRate(event.target.value)}
            required
          />
        </div>
      </div>
      <div className="text-end pt-1">
        {mortgageadded ? (
          <>
            <button
              className="btn btn-sm btn-success"
              type="button"
              onClick={() => {
                addToList();
              }}
              disabled={true}
            >
              ADDED
            </button>
            <i className="row text-danger text-center">
              Please click on save changes to save the data
            </i>
          </>
        ) : (
          <button
            className="btn btn-sm btn-secondary"
            type="button"
            onClick={() => {
              addToList();
            }}
          >
            ADD
          </button>
        )}
      </div>
    </>
  );
}

export default AddContentForm;
