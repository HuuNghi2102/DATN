import React, { Suspense } from "react";
import VNPayPaymentForm from "./component/pagePaymentVNPay";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <VNPayPaymentForm />
    </Suspense>
  );
}
