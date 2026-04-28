import { ProductRepository } from '../dao/productRepository.js';

const productRepository = new ProductRepository();

export const ProductService = {
    getAllProducts: async (params) => {
        return await productRepository.getAllProducts(params);
    },
    getProductById: async (pid) => {
        return await productRepository.getProductByID(pid);
    },
    createProduct: async (product) => {
        return await productRepository.createProduct(product);
    },
    updateProduct: async (pid, productUpdate) => {
        return await productRepository.updateProduct(pid, productUpdate);
    },
    deleteProduct: async (pid) => {
        return await productRepository.deleteProduct(pid);
    },
};
