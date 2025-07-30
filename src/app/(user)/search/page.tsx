import React, { Suspense } from "react";
import EcommerceSearchPage from "./component/EcommerceSearchPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang xử lý đăng nhập bằng Google...</div>}>
      <EcommerceSearchPage />
    </Suspense>
  );
}
