export default interface interfaceVoucher {
  id_ma_giam_gia: number;
  ma_giam_gia: string;
  loai_giam_gia: string;
  gia_tri_giam: number;
  gia_tri_don_hang: number;
  ngay_bat_dau: string;
  ngay_het_han: string;
  trang_thai: number;
  created_at: string;
  updated_at: string;
  order_count: number | null;
  deleted_at?: string | null;
}
export interface CreateVoucher {
  ma_giam_gia: string;
  loai_giam_gia: string;
  gia_tri_giam: number;
  gia_tri_don_hang: number;
  ngay_bat_dau: string;
  ngay_het_han: string;
  trang_thai: number;
}
