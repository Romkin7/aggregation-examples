import { Router } from 'express';
import Product from '../models/product.model.mjs';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        return res.render('products', { products });
    } catch (error) {
        req.flash('error', JSON.stringify(error));
        return res.redirect('/');
    }
});

router.get('/products/statistics', async (req, res) => {
    try {
        const occuranciesByName = await Product.aggregate([
            {
                $group: {
                    _id: { name: '$name' },
                    totalCount: { $sum: 1 },
                    sum: { $sum: '$price' },
                },
            },
            {
                $sort: { totalCount: -1, sum: -1 },
            },
        ]);
        return res.render('statistics', { occuranciesByName });
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
        console.log('Creating new product', req.body);
        const product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.avatar = 'https://random.imagecdn.app/500/500';
        const newProduct = await product.save();
        console.dir(product);
        console.dir(newProduct);
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
