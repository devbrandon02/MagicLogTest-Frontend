import type { Product } from "../../store/product/product.slice";

export const fetchAllProductsApi = async (filters?: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
}): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (filters?.sellerId) {
    params.append("sellerId", filters.sellerId);
  } else {
    if (filters?.search) params.append("search", filters.search);
    if (filters?.minPrice !== undefined) params.append("minPrice", String(filters.minPrice));
    if (filters?.maxPrice !== undefined) params.append("maxPrice", String(filters.maxPrice));
  }

  const queryString = params.toString();
  const url = `${import.meta.env.VITE_API_URL}/products/all${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('No se pudo obtener los productos');
  return res.json();
};



export const fetchProductsByUserApi = async (): Promise<Product[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!res.ok) throw new Error('No se pudo obtener los productos del usuario');
  return await res.json();
};

export const createNewProductApi = async (product: Partial<Product>): Promise<Product> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('No se pudo crear el producto');
  return await res.json();
};
