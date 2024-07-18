import { useState, useEffect } from 'react';

const fetchProducts = async () => {
  // Fetch products from an API
  const response = await fetch('/api/products');
  return response.json();
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ priceRange: [0, 100], sort: 'price', limit: 10 });

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, [filter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, filter.limit).map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-xl">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
