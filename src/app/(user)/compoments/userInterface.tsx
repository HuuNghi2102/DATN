export default interface userInterface {
  id_user: number;
  ten_user: string;
  anh_dai_dien_user: string;
  email_user: string;
  email_verified_at: string;
  mat_khau_user: string;
  dia_chi_user: string;
  sdt_user: string;
  ma_otp: number;
  trang_thai: number;
  id_vai_tro: number;
  remember_token: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
export interface UserControlProps {
  currentUser: userInterface | null;
}
