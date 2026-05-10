const API_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}

export async function fetchProductsByCategory(category) {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export function getImageUrl(product, index = 0) {
  const imageIds = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
  const id = imageIds[(product.id + index) % imageIds.length];
  return `https://picsum.photos/id/${id}/400/300`;
}