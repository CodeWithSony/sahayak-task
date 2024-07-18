import { useState, useEffect } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: { "Content-Type": "application/json" },
    });
    setNewProduct({ name: "", price: 0 });
    fetchProducts();
  };

  const updateProduct = async (id, updatedProduct) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: { "Content-Type": "application/json" },
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };
  const fetchProducts = async (id) => {
    let res = await fetch(`/api/products`, {
      method: "GET",
    });

    let result = await res.json();

    console.log(result, `resultresultresultresult`);
    setProducts(result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
      <div>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          placeholder="Product Name"
          className="border p-2 mr-2 text-black"
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
          placeholder="Product Price"
          className="border p-2 mr-2 text-black"
        />
        <button onClick={createProduct} className="bg-blue-500 text-white p-2">
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <h2 className="text-xl">{product.name}</h2>
              <p>${product.price}</p>
              <button
                onClick={() =>
                  updateProduct(product._id, {
                    ...product,
                    price: product.price + 1,
                  })
                }
                className="bg-yellow-500 text-white p-2 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminProducts;
