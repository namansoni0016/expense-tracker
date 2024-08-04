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
export const listTransactionAPI = async() => {
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //Return a promise
    return response.data;
}