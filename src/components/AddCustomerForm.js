import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCustomer,
  deleteCustomer,
  updateCustomerState,
} from "../reducers/customerReducer";

function AddContentForm() {
  const dispatch = useDispatch();

  //form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //   const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [customeradded, setCustomerAdded] = useState(false);

  //enabe or disable button

  const addToList = () => {
    const data = {
      firstname: firstName,
      lastname: lastName,
      //   gender: gender,
      //   age: age,
      email: email,
      address: address,
      contact: phone,
    };
    dispatch(updateCustomerState(data));
    setCustomerAdded(true);
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md mb-4">
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md mb-4">
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        {/* <div className="col-12 col-md mb-4">
          <select
            className="form-select"
            aria-label="select aritcle type"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option defaultValue={gender}>Male</option>
            <option value="female">Female</option>
          </select>
        </div> */}
        
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <input
            type="text"
            id="address"
            className="form-control"
            placeholder="Enter Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>
        <div className="row">
          <div className="col-6 mb-4">
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="col-6 mb-4">
          <input
            type="text"
            id="phone"
            className="form-control"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        </div>
        <div className="text-end pt-1">
          {customeradded ? (
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
      </div>
    </>
  );
}

export default AddContentForm;
