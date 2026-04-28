import { Router } from 'express';
import { ProductService } from '../services/productService.js';
import { productToDTO } from '../dao/dtos/productDTO.js';
import { uploader } from '../utils/multerUtil.js';
import passport from '../utils/passportUtil.js';
import { authorizeRoles } from '../middlewares/authorize.js';

const router = Router();

router.get('/', async (req, res) => {
    const result = await ProductService.getAllProducts(req.query);
    const docs = (result.docs || []).map(productToDTO);
    res.send({
        status: 'success',
        payload: { ...result, docs }
    });
});

router.get('/:pid', async (req, res) => {
    try {
        const result = await ProductService.getProductById(req.params.pid);
        res.send({
            status: 'success',
            payload: productToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/',
    passport.authenticate('current', { session: false }),
    authorizeRoles('admin'),
    uploader.array('thumbnails', 3),
    async (req, res) => {
    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.path);
        });
    }
    try {
        const result = await ProductService.createProduct(req.body);
        res.send({
            status: 'success',
            payload: productToDTO(result)
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:pid',
    passport.authenticate('current', { session: false }),
    authorizeRoles('admin'),
    uploader.array('thumbnails', 3),
    async (req, res) => {
    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }
    try {
        const result = await ProductService.updateProduct(req.params.pid, req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.delete('/:pid',
    passport.authenticate('current', { session: false }),
    authorizeRoles('admin'),
    async (req, res) => {
    try {
        const result = await ProductService.deleteProduct(req.params.pid);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;