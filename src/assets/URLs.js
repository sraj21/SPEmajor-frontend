export const baseURL = "http://localhost:9192";

export const addCustomerURL = `${baseURL}/customer/register_customer`;
export const fetchCustomersURL = `${baseURL}/customer/get_customers`;
export const deleteCustomerURL = `${baseURL}/customer/delete_customer`;

export const addMortgageURL = `${baseURL}/mortgage/register_mortgage`;
export const fetchMortgageURL = `${baseURL}/mortgage/get_mortgages`;
export const deleteMortgageURL = `${baseURL}/mortgage/delete_mortgage`;

export const addPaymentURL = `${baseURL}/payment/register_payment`;
export const fetchPaymentURL = `${baseURL}/payment/get_payments`;

export const fetchTotalDueURL = `${baseURL}/payment/see_total_due`;