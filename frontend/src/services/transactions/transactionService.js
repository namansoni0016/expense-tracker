import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//Get token
const token = getUserFromStorage();

//Add transaction
export const addTransactionAPI = async({ type, amount, category, date, description }) => {
    const response = await axios.post(`${BASE_URL}/transactions/add`, {
        type,
        amount,
        category,
        date,
        description
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return a promise
    return response.data;
}

//list transactions
export const listTransactionAPI = async({startDate, endDate, type, category}) => {
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
        params: {startDate, endDate, type, category},
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return a promise
    return response.data;
}

//fetch a transaction
export const fetchATransaction = async(transactionId) => {
    const transaction = await axios.get(`${BASE_URL}/transactions/update/${transactionId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return transaction.data;
}

//Update transaction
export const updateTransactionAPI = async({ type, amount, category, date, description, id }) => {
    const response = await axios.put(`${BASE_URL}/transactions/update/${id}`, {
        type,
        amount,
        category,
        date,
        description,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return a promise
    return response.data;
}

//delete transaction
export const deleteTransactionAPI = async(id) => {
    const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return a promise
    return response.data;
}