import React, { Suspense } from "react";
import OrderDetail from "./component/OrderDetail";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang xử lý đăng nhập bằng Google...</div>}>
      <OrderDetail />
    </Suspense>
  );
}
