import { Router } from 'express';
import { cartToDTO } from '../dao/dtos/cartDTO.js';
import { CartService } from '../services/cartService.js';
import passport from '../utils/passportUtil.js';


const router = Router();



router.get('/:cid', async (req, res) => {
    try {
        const result = await CartService.getCartById(req.params.cid);
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const result = await CartService.createCart();
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const result = await CartService.addProductToCart(req.params.cid, req.params.pid);
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});


router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const result = await CartService.deleteProductFromCart(req.params.cid, req.params.pid);
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:cid', async (req, res) => {

    try {
        const result = await CartService.updateAllProducts(req.params.cid, req.body.products)
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {

    try {
        const result = await CartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity)
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.delete('/:cid', async (req, res) => {

    try {
        const result = await CartService.deleteAllProducts(req.params.cid)
        res.send({
            status: 'success',
            payload: cartToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/:cid/purchase', passport.authenticate('current', { session: false }), async (req, res) => {
    try {
        const purchaserEmail = req.user?.email || req.user?.username || 'unknown@unknown';
        const result = await CartService.purchaseCart(req.params.cid, purchaserEmail, ProductService, TicketRepository);
        if (result.status === 'error') {
            return res.status(400).send({ status: 'error', message: result.message });
        }

        res.send({ status: 'success', payload: { ticket: result.ticket, notPurchased: result.notPurchased } });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

export default router;