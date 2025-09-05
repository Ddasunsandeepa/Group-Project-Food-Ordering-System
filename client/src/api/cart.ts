import axios from "axios";
import { CartItem } from "../types";

const API_BASE = `${import.meta.env.VITE_BASE_URL}/api/cart`;

// fetch items
export const fetchCartFromDB = async (userId: string): Promise<CartItem[]> => {
  try {
    const response = await axios.get(`${API_BASE}?userId=${userId}`);
    return response?.data || [];
  } catch (err) {
    console.error("Error fetching cart from DB:", err);
    return [];
  }
};

// Add item to cart
export const addItemToCart = async (item: CartItem): Promise<CartItem | null> => {
  try {
    const response = await axios.post(`${API_BASE}/add`, item);
    return response?.data || null;
  } catch (err) {
    console.error("Error adding item to DB:", err);
    return null;
  }
};

// Delete item from cart
export const removeItemFromCart = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response?.data?.success || false;
  } catch (err) {
    console.error("Error removing cart item:", err);
    return false;
  }
};


// Update a single cart item
export const updateCartItemInDB = async (
  id: string,
  item: CartItem
): Promise<CartItem | null> => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, item);
    return response.data || null;
  } catch (err) {
    console.error("Error updating cart item in DB:", err);
    return null;
  }
};

