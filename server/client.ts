import axios from "axios";

export const url = process.env.API_ENDPOINT;

export const client = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});