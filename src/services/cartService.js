import { CartRepository } from '../dao/cartRepository.js';
import { ProductRepository } from '../dao/productRepository.js';
import { TicketRepository } from '../dao/ticketRepository.js';

const productRepository = new ProductRepository();
const cartRepository = new CartRepository(productRepository);
const ticketRepository = new TicketRepository();

export const CartService = {
    getCartById: async (cid) => {
        return await cartRepository.getProductsFromCartByID(cid);
    },
    createCart: async () => {
        return await cartRepository.createCart();
    },
    addProductToCart: async (cid, pid) => {
        return await cartRepository.addProductByID(cid, pid);
    },
    deleteProductFromCart: async (cid, pid) => {
        return await cartRepository.deleteProductByID(cid, pid);
    },
};
