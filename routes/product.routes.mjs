import { Router } from 'express';
import Product from '../models/product.model.mjs';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        console.log(products);
        return res.render('products', { products });
    } catch (error) {
        req.flash('error', JSON.stringify(error));
        return res.redirect('/');
    }
});

router.get('/products/new', (req, res) => {
    return res.render('newProduct');
});

router.post('/products', async (req, res) => {
    try {
        const product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.avatar = 'https://random.imagecdn.app/500/500';
        const newProduct = await product.save();
        req.flash(
            'success',
            `Success, product ${newProduct.name} was successfully created!`,
        );
        return res.redirect('/products/new');
    } catch (error) {
        req.flash('error', JSON.stringify(error));
        return res.redirect('/products/new');
    }
});

export default router;
