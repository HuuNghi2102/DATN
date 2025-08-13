import React, { useEffect, useState } from 'react';
import sizeInterface from '../components/interface/sizeInterface';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

interface InventoryItemProps {
  onRemove: () => void;
  isLast: boolean;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ onRemove, isLast }) => {
  const router = useRouter();
  const [listSize,setListSize] = useState<sizeInterface[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const fetchListSize = async () => {
    const accessTokenLocal = localStorage.getItem('accessToken');
    const typeTokenLocal = localStorage.getItem('typeToken');
    const userLocal = localStorage.getItem('user');
    
    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1) {
        setIsLoading(true);
        try {
          const resSizes = await fetch(`https://huunghi.id.vn/api/size/listSize`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
            }
          });
          
          if (resSizes) {
            const result = await resSizes.json();
            const listSize = result.data;
            setListSize(listSize);
          } else {
            toast.error('Lấy sản phẩm không thành công');
            setListSize([]);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          setListSize([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push('/user/userprofile');
      }
    } else {
      router.push('/login');
    }
  }

  useEffect(()=>{
    fetchListSize();
  },[]);

  return (
    <div className="inventory-item bg-gray-100 p-4 rounded border border-dashed border-gray-300 mb-4 relative">
      <div className="inventory-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="form-label block text-sm font-medium text-gray-700 mb-1">Màu sắc</label>
          <input type="text" className='form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm' />
        </div>
        
        <div className="form-group">
          <label className="form-label block text-sm font-medium text-gray-700 mb-1">Kích thước</label>
          <select className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm">
            <option value="">Chọn size</option>
            {listSize?.map((e,i)=>(
              <option key={i} value={e.id_kich_thuoc}>{e.ten_kich_thuoc}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
          <input 
            type="number" 
            className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm" 
            placeholder="0" 
            min="0" 
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;