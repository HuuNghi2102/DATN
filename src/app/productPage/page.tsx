'use client'
import React from "react"
import { useState } from "react";

const productPage = () => {
  const [count, setCount] = useState(0); // khởi tạo count = 0

  return (
    <div className="mt-40">
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}
export default productPage;