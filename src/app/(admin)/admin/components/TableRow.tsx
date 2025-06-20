import React from 'react';
import { FaPencilAlt, FaTrash, FaCircle } from 'react-icons/fa';

interface Product {
  id: string;
  img: string;
  name: string;
  price: string;
  inventory: {
    color: string;
    size: string;
    quantity: number;
  }[];
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface TableRowProps {
  product: Product;
}

const TableRow: React.FC<TableRowProps> = ({ product }) => {
  const getColorStyle = (color: string) => {
    switch (color) {
      case 'red':
        return '#ef4444';
      case 'blue':
        return '#3b82f6';
      case 'black':
        return '#111827';
      case 'white':
        return '#ffffff';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'Còn hàng';
      case 'low-stock':
        return 'Sắp hết';
      case 'out-of-stock':
        return 'Hết hàng';
      default:
        return status;
    }
  };

  const getColorText = (color: string) => {
    switch (color) {
      case 'red':
        return 'Đỏ';
      case 'blue':
        return 'Xanh dương';
      case 'black':
        return 'Đen';
      case 'white':
        return 'Trắng';
      default:
        return color;
    }
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      <td className="px-4 py-4 text-sm text-gray-700 align-middle">
        {product.id}
      </td>
      
      <td className="px-4 py-4 align-middle">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-900">{product.name}</span>
        </div>
      </td>
      
      <td className="px-4 py-4 text-sm text-gray-700 align-middle">
        {product.price}
      </td>
      
      <td className="px-4 py-4 align-middle">
        <div className="flex flex-wrap gap-2">
          {product.inventory.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center bg-gray-50 rounded-full px-3 py-1 text-xs"
            >
              <FaCircle
                className="mr-1.5 flex-shrink-0"
                style={{
                  color: getColorStyle(item.color),
                  ...(item.color === 'white' && {
                    border: '1px solid #d1d5db',
                    boxSizing: 'border-box'
                  })
                }}
                size={10}
              />
              <span className="whitespace-nowrap">
                {getColorText(item.color)} - {item.size}: {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </td>
      
      <td className="px-4 py-4 align-middle">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.status === 'in-stock'
              ? 'bg-green-100 text-green-800'
              : product.status === 'low-stock'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {getStatusText(product.status)}
        </span>
      </td>
      
      <td className="px-4 py-4 align-middle">
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Edit"
          >
            <FaPencilAlt size={14} />
          </button>
          <button
            className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;