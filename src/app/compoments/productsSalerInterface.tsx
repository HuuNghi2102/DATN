export default interface productsSalerInterface{
    id_san_pham: number;
    ten_san_pham: string;
    images:ProducSalerImage[];
    duong_dan: string;
    gia_chua_giam: number;
    pham_tram_giam:number;
    gia_da_giam:number;
    mo_ta_san_pham:string;
    kiem_tra_san_pham_dac_biet:number;
    trang_thai:number;
    id_loai_san_pham:number;
    created_at:string;
    updated_at:string;
    deleted_at:string;
    variant_orders_count:number;
}
export interface ProducSalerImage {
    id_anh_san_pham: number;
    link_anh: string;
    kiem_tra_san_pham_dac_biet: number;
    id_san_pham: number;
    created_at: string;
    updated_at: string;
}