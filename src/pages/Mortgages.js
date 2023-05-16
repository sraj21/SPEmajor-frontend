import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddMortgageForm from "../components/AddMortgageForm";
import { addMortgageURL, fetchMortgageURL, deleteMortgageURL, fetchTotalDueURL } from "../assets/URLs";
import { updateMortgageState } from "../reducers/mortgageReducer";
import { updateMortgageListState } from "../reducers/mortgageListReducer";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from '../components/MortgageInvoice';
import swal from "sweetalert";
import Swal from 'sweetalert2'

const Mortgages = () => {
  const dispatch = useDispatch();
  //   const [name, setName] = useState("");
  const mortgage = useSelector((state) => state.mortgage.value);
  const [cid, setCid] = useState("");
  const mortgageList = useSelector((state) => state.mortgageList.value);
  const [query, setQuery] = useState("");
  // const [date, setDate] = useState("");
  // const [dateAdded, setDateAdded] = useState(false); //clicked

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fileName = "Invoice.pdf";


const handleFetchAllDues = async(id) => {
  const { value: date } = await Swal.fire({
    title: 'Enter date of final payment',
    input: 'text',
    inputPlaceholder: 'YYYY-MM-DD'
  })
  if (date) {
    fetchTotalDue(id, date);
    // Swal.fire(`Total due: ${fetchTotalDue(id, date)}`)
  }
}

const fetchTotalDue = async (id, date) => {
  console.log("fetching total due", date);
  const request = new Request(`${fetchTotalDueURL}/${id}`, {
    method: "POST",
    body: JSON.stringify({"date": date}),
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
      // console.log(res.json());
      
      res.json().then((value) => { console.log(value);
        Swal.fire("Total due amount: Rs. "+value.toString()); });
    })
    .catch((err) => console.log(err));

  // handleClose();
  // dispatch(updateMortgageState([]));
};

  const addMortgage = async () => {
    console.log("adding Mortgage", mortgage);
    const request = new Request(`${addMortgageURL}/${cid}`, {
      method: "POST",
      body: JSON.stringify(mortgage),
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
        swal("Success", "added mortgage successfully", "success");
      })
      .catch((err) => console.log(err));

    handleClose();
    dispatch(updateMortgageState([]));
  };
  useEffect(() => {
    fetchMortgageList();
  }, []);
  const deleteMortgage = async (mid) => {
    console.log("deleting Mortgage", mortgage);
    const request = new Request(`${deleteMortgageURL}/${mid}`, {
      method: "DELETE",
      body: JSON.stringify(mortgage),
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
        swal("Deleted", "deleted Mortgage successfully", "success");
        fetchMortgageList();
      })
      .catch((err) => console.log(err));
  }
// const downloadInvoice = async (mort) => {
//   const data = {
//     documentTitle: "MORTGAGE INVOICE", //Defaults to INVOICE
    
//     currency: "INR",
//     // taxNotation: "vat", //or gst
//     marginTop: 25,
//     marginRight: 25,
//     marginLeft: 25,
//     marginBottom: 25,
//     // logo: "link to show on your invoice",
//     sender: {
//       company: "Sohane Jewlery",
//       address: "C/60 Damoh Naka",
//       zip: "482001",
//       city: "Jabalpur",
//       country: "India",
//     },
//     client: {
//       company: `Customer Name: ${mort.customerFirstName} ${mort.customerLastName}`,
//       address: `Customer ID: ${mort.mid}`,
//       zip: "",
//       // city: `Issue Date: ${mort.issueDate}`,
//       // country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
//       //   "en-US"
//       // )}`,
//     },
//     invoiceNumber: `${mort.cid}`,
//     invoiceDate: `${mort.issueDate}`,
//     products: [
//       {
//         quantity: `${mort.marketValue}`,
//         description: `${mort.productName}`,
//         tax: `${mort.interestRate}`,
//         price: `${mort.givenAmount}`,
//       },
//     ],
//     bottomNotice:
//       "add message",
//   };

//   const result = await easyinvoice.createInvoice(data);
//   easyinvoice.download(`mortgage_${mort.cid}_invoice.pdf`, result.pdf);
// };

  async function fetchMortgageList() {
    await axios
      .get(`${fetchMortgageURL}`)
      .then((response) => {
        console.log("My Mortgages", response.data);
        dispatch(updateMortgageListState(response.data));
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
          <Modal.Title>Add New Mortgage</Modal.Title>
        </Modal.Header>
        <form className="p-3">
          <input
            type="text"
            id="cid"
            className="form-control"
            placeholder="Enter Customer ID"
            value={cid}
            onChange={(event) => setCid(event.target.value)}
            required
          />
        </form>
        <Modal.Body>
          <form className="">
            <AddMortgageForm />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addMortgage}>
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
          <div className="col-3 m-5">
            <input
              className="search__input "
              type="text"
              placeholder="Search Mortgage"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <button
            className="btn btn-sm btn-secondary col-3 m-5"
            onClick={handleShow}
          >
            Add Mortgage
          </button>
        </div>

        <div className="row m-3 align-items-center">
          {mortgageList
            ?.filter((mort) => {
              if (query === "") {
                return mort;
              } else if (
                mort.productName.toLowerCase().includes(query.toLowerCase())
              ) {
                return mort;
              } 
            })
            .map((mort, index) => (
              <div key={index}>
                <Accordion>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      <div
                        key={mort?.cid}
                        className="col-12 row align-items-center justify-content-between p-2 my-2"
                      >
                        <div className="col-12 row align-items-center justify-content-between p-2 my-2">
                          <div className="col-2">
                            <div className="col">Product Name:</div>
                            <b>{mort?.productName}</b>
                          </div>
                          <div className="col-2">
                          Mortgage id: {" "}
                            <b>{mort?.cid}</b>
                          </div>
                          <div className="col-2">
                            <div className="col">Customer Name:</div>
                            <b>
                              {mort?.customerFirstName} {mort?.customerLastName}
                            </b>
                          </div>
                          <div className="col-2">
                            Customer id: {" "}
                            <b>{mort?.mid}</b>
                          </div>
                          <div className="col-sm-1">
                          <Button variant="danger" onClick={() => {
                          deleteMortgage(mort.cid);
                        }}>
                            
            Delete Mortgage
          </Button>
          </div>
          <div className="col-sm-1">
                          {/* <button
          className="btn btn-success mx-2"
          onClick={() => downloadInvoice(mort)}
        >PRINT 
   </button> */}
   {/* <PDFViewer width={800} height={500} showToolbar={false}>
        <PdfDocument mort={mort} />
      </PDFViewer> */}
      <div className='download-link'>
        <PDFDownloadLink
          document={<PdfDocument mort={mort} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </div>
              </div>
                          
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                      <div className="col-10">
                      <div className="row justify-content-center">
                        <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                          Market Value:{" "}
                          <b>
                            Rs.
                            {mort?.marketValue}{" "}
                          </b>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                          Amount Lent:{" "}
                          <b>
                            Rs.
                            {mort?.givenAmount}{" "}
                          </b>
                        </div>

                        <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                          Amount Left:{" "}
                          <b>
                            Rs.
                            {mort?.leftAmount}{" "}
                          </b>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                        <div>Date of issue:{" "}</div>
                          <b>
                      
                            {mort?.issueDate}{" "}
                          </b>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                          <div>Date of last payment:{" "}</div>
                          <b>
                      
                            {mort?.lastPaid}{" "}
                          </b>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                          <div>Daily Rate of Interest:{" "}</div>
                          <b>
                      
                            {mort?.interestRate}{"%"}
                          </b>
                        </div>
                        
                      </div>
                      </div>
                      <div className="col-2">
                      
          <button
            className="btn btn-secondary m-3"
            onClick={() => {
              handleFetchAllDues(mort.cid);
            }}
          >
            Fetch total due
          </button>
                      
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
export default Mortgages;
