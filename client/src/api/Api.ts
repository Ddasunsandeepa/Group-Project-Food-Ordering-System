import axios, { AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Generic fetch function
export const fetchDataFromApi = async <T>(url: string): Promise<T | null> => {
  try {
    const { data }: AxiosResponse<T> = await axios.get(`${BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

// Use generic type for form data and response
export const postData = async <T, U = unknown>(
  url: string,
  formData: U
): Promise<T | null> => {
  try {
    // console.log("Sending this data:", formData);
    const { data }: AxiosResponse<T> = await axios.post(`${BASE_URL}${url}`, formData);
    return data;
  } catch (error) {
    console.error("Post error:", error);
    return null;
  }
};

export const editData = async <T, U = unknown>(
  url: string,
  updateData: U
): Promise<T | null> => {
  try {
    const { data }: AxiosResponse<T> = await axios.put(`${BASE_URL}${url}`, updateData);
    return data;
  } catch (error) {
    console.error("Put error:", error);
    return null;
  }
};

export const deleteData = async <T>(url: string): Promise<T | null> => {
  try {
    const { data }: AxiosResponse<T> = await axios.delete(`${BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("Delete error:", error);
    return null;
  }
};
