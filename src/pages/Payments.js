import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddPaymentForm from "../components/AddPaymentForm";
import { addPaymentURL, fetchPaymentURL } from "../assets/URLs";
import { updatePaymentState } from "../reducers/paymentReducer";
import { updatePaymentListState } from "../reducers/paymentListReducer";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from '../components/PaymentInvoice';
import swal from "sweetalert";

const Payments = () => {
  const dispatch = useDispatch();
  //   const [name, setName] = useState("");
  const payment = useSelector((state) => state.payment.value);
  const [mid, setMid] = useState("");
    const paymentList = useSelector((state) => state.paymentList.value);
  const [query, setQuery] = useState("");


  const fileName = "Invoice.pdf";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addPayment = async () => {
    console.log("adding Payment", payment);
    const request = new Request(`${addPaymentURL}/${mid}`, {
      method: "POST",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      },
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: token,
      //     "ngrok-skip-browser-warning": "69420",
      //   },
    });
    await fetch(request)
      .then((res) => {
        console.log(res);
        swal("Success", "added payment successfully", "success");
        fetchPaymentList();
      })
      .catch((err) => console.log(err));

    handleClose();
    dispatch(updatePaymentState([]));
  };

    useEffect(() => {
      fetchPaymentList();
    }, []);

    async function fetchPaymentList() {
      await axios
        .get(`${fetchPaymentURL}`)
        .then((response) => {
          console.log("My Payments", response.data);
          dispatch(updatePaymentListState(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Payment</Modal.Title>
        </Modal.Header>
        <form className="p-3">
          <input
            type="text"
            id="mid"
            className="form-control"
            placeholder="Enter Mortgage ID"
            value={mid}
            onChange={(event) => setMid(event.target.value)}
            required
          />
        </form>
        <Modal.Body>
          <form className="">
            <AddPaymentForm />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPayment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Header />
      <div
        className="container-fluid mt-3"
        style={{ overflow: "auto", height: "80%" }}
      >
        <div className="row justify-content-center">
          {/* <div className="col-3">
            <input
              className="search__input "
              type="text"
              placeholder="Search Payment ID"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div> */}

          <button
            className="btn btn-sm btn-secondary col-3 m-5"
            onClick={handleShow}
          >
            Add Payment
          </button>
        </div>
        
        <div className="row m-3 align-items-center">
          {paymentList
            // ?.filter((paym) => {
            //   if (query === "") {
            //     return paym;
            //   } else if (
            //     paym.id===query
            //   ) {
            //     return paym;
            //   } 
            // })
            .map((paym, index) => (
              <div key={index}>
                <Accordion>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      <div
                        key={paym?.id}
                        className="col-12 row align-items-center justify-content-between p-2 my-2"
                      >
                        <div className="col-12 row align-items-center justify-content-between p-2 my-2">
                        <div className="col-2">
                          Payment id: {" "}
                            <b>{paym?.pid}</b>
                          </div>
                          <div className="col-3">
                            Amount:
                            <b>{paym?.amount}</b>
                          </div>
                          <div className="col-3">
                          Date of payment: {" "}
                            <b>{paym?.date}</b>
                          </div>
                          <div className="col-2"><div className='download-link'>
        <PDFDownloadLink
          document={<PdfDocument mort={paym} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </div></div>
                        
                        </div>
                        
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row justify-content-center">
                      <div className="col mt-2 justify-content-around">
                          <div>Customer Name:{" "}</div>
                          <b>
                            {paym?.customerFirstName}{" "}{paym?.customerLastName}
                          </b>
                        </div>
                        
                        <div className="col mt-2 justify-content-center">
                          <div>Product Name:{" "}</div>
                          <b>
                            {paym?.productName}{" "}
                          </b>
                        </div>
                        <div className="col mt-2 justify-content-center">
                          <div>Mortgage ID:{" "}</div>
                          <b>
                            {paym?.mid}{" "}
                          </b>
                        </div>
                        <div className="col-md-2 col-sm-6 col-12 mt-2 justify-content-center">
                          Amount Lent:{" "}
                          <b>
                            Rs.
                            {paym?.givenAmount}{" "}
                          </b>
                        </div>

                        <div className="col-md-2 col-sm-6 col-12 mt-2 justify-content-center">
                          Amount Left:{" "}
                          <b>
                            Rs.
                            {paym?.leftAmount}{" "}
                          </b>
                        </div>
                        <div className="col-md-2 col-sm-6 col-12 mt-2 justify-content-center">
                          Rate of Interest:{" "}
                          <b>
                      
                            {paym?.interestRate}{"%"}
                          </b>
                        </div>
                      </div>
                      
                        
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Payments;
