import React from 'react';

interface InventoryItemProps {
  onRemove: () => void;
  isLast: boolean;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ onRemove, isLast }) => {
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
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
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