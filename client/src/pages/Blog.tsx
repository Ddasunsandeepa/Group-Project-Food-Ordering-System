import { fetchCartFromDB } from "@/api/cart";
import React, { useEffect, useState } from "react";
import { CartItem } from "@/types";

export default function Blog() {
  const [data, setData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching.....cart....")
      try {
        const cartData = await fetchCartFromDB("6859515c7e9a38910b5b3200");
        setData(cartData);
        console.log(cartData)
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Blog</h1>
      
      {/* Big image to enable scroll */}
      <img
        src="https://picsum.photos/1200/1600"
        alt="Placeholder"
        className="w-full rounded-lg shadow-md"
      />

      {/* Extra content to simulate scrolling */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading cart data...</p>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div key={item.productId + item.size} className="p-2 border rounded">
              <p className="font-semibold">{item.productTitle}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No cart items found.</p>
          
        )}
      </div>
    </div>
  );
}
