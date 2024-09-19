import { Router } from "express";
import upload from "../middlewares/fileUpload.js";
import { createProduct, getProducts } from "../controllers/productController.js";


export const productRouter = Router();


productRouter.post('/products', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.error('File upload error:', err);
            return res.status(400).json({
                success: false,
                message: 'File upload failed',
                error: err.message
            });
        }
        next(); // Proceed to createProduct if no error
    });
}, createProduct);

productRouter.get('/products', getProducts);
// productRouter.get('/products/:id', getProduct);
// productRouter.put('/products/:id', updateProduct);
// productRouter.delete('/products/:id', deleteProduct);


