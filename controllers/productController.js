import { Product } from "../models/product.js";


export const createProduct = async (req, res) => {
    try {
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded or incorrect file format'
            });
        }

        const product = await Product.create({
            ...req.body,
            image: req.file.path,
        })
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: product

        })
    } catch (error) {
        console.log("Error in creating product", error);
        res.status(400).json({ success: false, message: error.message })

    }

};

export const getProducts = async (req, res) => {
    try {
        const { filter = "{}" } = req.query;

    const allProducts = await Product.find(JSON.parse(filter))

    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products: allProducts
    })
    } catch (error) {

    }

};

// export const getProduct = async (req, res) => {};
// export const updateProduct = async (req, res) => {};
// export const deleteProduct = async (req, res) => {};