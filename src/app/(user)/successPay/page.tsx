import React, { Suspense } from "react";
import PaymentSuccess from "./component/PaymentSuccess";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang xử lý đăng nhập bằng Google...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
