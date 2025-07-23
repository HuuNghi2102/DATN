
import interfaceVoucher from "../types/voucher";
import { CreateVoucher } from "../types/voucher";

export const addVoucher = async (newVoucher: CreateVoucher): Promise<{ success: boolean, errors?: any }> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (accessToken && typeToken) {
      const parseaccessToken = JSON.parse(accessToken);
      const parsetypeToken = JSON.parse(typeToken);

      const payload = {
        codeVoucher: newVoucher.ma_giam_gia,
        typeVoucher: newVoucher.loai_giam_gia,
        valueRedution: newVoucher.gia_tri_giam,
        valueOrder: newVoucher.gia_tri_don_hang,
        dateStart: newVoucher.ngay_bat_dau,
        dateEnd: newVoucher.ngay_het_han,
      };

      const res = await fetch("https://huunghi.id.vn/api/voucher/addVoucher", {
        method: "POST",
        headers: {
          Authorization: `${parsetypeToken} ${parseaccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        return { success: false, errors: result.errors || {} };
      }

      return { success: true };
    } else {
      return { success: false, errors: { general: ["Thiếu token"] } };
    }
  } catch (error) {
    return { success: false, errors: { general: ["Lỗi kết nối server"] } };
  }
};

export const deleteVoucher = async (idVoucher: string | number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (accessToken && typeToken) {
      const parseaccessToken = JSON.parse(accessToken);
      const parsetypeToken = JSON.parse(typeToken);
      const res = await fetch(`https://huunghi.id.vn/api/voucher/deleteVoucher/${idVoucher}`, {
        method: "DELETE",
        headers: {
          "Authorization": `${parsetypeToken} ${parseaccessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        console.error("❌ Lỗi xoá voucher:", res.status, res.statusText, errorMsg);
        return false;
      }
      return true;
    } else {
      console.error("❌ Thiếu token trong localStorage");
      return false;
    }

  } catch (error) {
    console.error("❌ Lỗi khi gọi API xoá voucher:", error);
    return false;
  }
};

export const editVoucher = async (idVoucher: string | number, updatedVoucher: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (!accessToken || !typeToken) {
      throw { message: "Thiếu token xác thực", status: false };
    }

    const parseAccessToken = JSON.parse(accessToken);
    const parseTypeToken = JSON.parse(typeToken);
      const mappedVoucher = {
        codeVoucher: updatedVoucher.ma_giam_gia,
        typeVoucher: updatedVoucher.loai_giam_gia,
        valueRedution: updatedVoucher.gia_tri_giam,
        valueOrder: updatedVoucher.gia_tri_don_hang,
        dateStart: updatedVoucher.ngay_bat_dau,
        dateEnd: updatedVoucher.ngay_het_han,
        status: updatedVoucher.trang_thai,
      };
    const res = await fetch(`https://huunghi.id.vn/api/voucher/updateVoucher/${idVoucher}`, {
      method: "PUT",
      headers: {
        Authorization: `${parseTypeToken} ${parseAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedVoucher),
    });

    const data = await res.json();

      if (!res.ok) {
        return { success: false, errors: data.errors || {} };
      }

      return { success: true };
  } catch (error: any) {
    console.error("❌ Lỗi khi gọi editVoucher:", error);
    // Trả lỗi ra ngoài để component xử lý tiếp
    throw error;
  }
};
export const changeStatusVoucher = async (idVoucher: number | string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");
    if(accessToken && typeToken) {
      const parseAccessToken = JSON.parse(accessToken);
    const parseTypeToken = JSON.parse(typeToken);

    const res = await fetch(`https://huunghi.id.vn/api/voucher/changeStatusVoucher/${idVoucher}`, {
      method: "PATCH",
      headers: {
        "Authorization": `${parseTypeToken} ${parseAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("❌ Lỗi khi đổi trạng thái voucher:", res.status, res.statusText);
    }

    const result = await res.json();
    return result;
    }
      } catch (error) {
    console.error("❌ Lỗi khi gọi API changeStatusVoucher:", error);
  }
};





