'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../../store/productSlice';
import Navbar from '../component/navbar';
import Header from '../component/header';
import CreateProductBox from '../component/createproductbox';

export default function Inventory() {
  const dispatch = useDispatch();
  const { products = [], status, error } = useSelector((state) => state.inventory); // Default value for products

  const [showCreateBox, setShowCreateBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', quantity: '', price: '' });

  // Fetch products on initial render
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Handle deleting a product
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  // Handle editing a product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setEditFormData({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    });
    setShowEditBox(true);
  };

  // Handle edit form changes
  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Submit the edit form
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: currentProduct._id, updates: editFormData }));
    setShowEditBox(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Inventory</h1>
            <button
              onClick={() => setShowCreateBox(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
            >
              <span className="mr-2 text-xl">+</span> New Product
            </button>
          </div>

          {/* Table or Loading/Error Messages */}
          {status === 'loading' && <p>Loading products...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {status === 'succeeded' && products.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Items</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}> {/* Use `_id` if available */}
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">ETB {product.price}</td>
                    <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available. Add a new product to get started!</p>
          )}
        </div>
      </div>

      {/* Create Product Modal */}
      {showCreateBox && <CreateProductBox onClose={() => setShowCreateBox(false)} />}

      {/* Edit Product Modal */}
      {showEditBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editFormData.quantity}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditBox(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
