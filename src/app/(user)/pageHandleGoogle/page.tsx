import React, { Suspense } from "react";
import ClientPageHandleGoogle from "./component/pageHandleGoogle";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang xử lý đăng nhập bằng Google...</div>}>
      <ClientPageHandleGoogle />
    </Suspense>
  );
}
