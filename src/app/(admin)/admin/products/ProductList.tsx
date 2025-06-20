'use client';

import React from 'react';
import TableRow from '../components/TableRow';

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

const ProductList = () => {
  const products: Product[] = [
    {
      id: '#SP001',
      img: 'https://bizweb.dktcdn.net/100/415/697/products/nta101-wvs9s70f-1-97bx-hinh-mat-sau-0.jpg?v=1701332415287',
        name: 'Áo thun nam cổ tròn',
      price: '250.000đ',
      inventory: [
        { color: 'red', size: 'S', quantity: 12 },
        { color: 'red', size: 'M', quantity: 8 },
        { color: 'blue', size: 'S', quantity: 5 }
      ],
      status: 'in-stock'
    },
    // Thêm các sản phẩm khác...
  ];
  
  return (
    <div className="card bg-white rounded-lg shadow overflow-hidden">
      <div className="card-header px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-container overflow-x-auto rounded shadow-sm bg-white">
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">Mã SP</th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">Tên sản phẩm</th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">Giá</th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">Tồn kho</th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">Trạng thái</th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <TableRow key={index} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;