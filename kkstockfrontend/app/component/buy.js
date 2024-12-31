'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { buyProduct } from '../../store/transactionSlice';

export default function BuyComponent() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.inventory);
  const [formData, setFormData] = useState({ productId: '', quantity: 0 });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(buyProduct({ id: formData.productId, quantity: parseInt(formData.quantity, 10) }));
    setFormData({ productId: '', quantity: 0 });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buy Items</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Buy
        </button>
      </form>
    </div>
  );
}
