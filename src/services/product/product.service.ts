import type { Product } from "../../store/product/product.slice";
import * as productApi from '../../api/product/product.api';


export const fetchAllProductsService = async ({
  search,
  minPrice,
  maxPrice,
  sellerId
}: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
}): Promise<Product[]> => {
  return await productApi.fetchAllProductsApi({
    search,
    minPrice,
    maxPrice,
    sellerId
  });
};

export const fetchProductsByUserService = async (): Promise<Product[]> => {
  return await productApi.fetchProductsByUserApi();
};

export const createNewProductService = async (product: Partial<Product>): Promise<Product> => {
  try {
    return await productApi.createNewProductApi(product);
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};
