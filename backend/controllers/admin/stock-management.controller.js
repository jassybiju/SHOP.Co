import { ProductVariant } from "../../models/product_variants.model.js";
import { getAllProductsStockService } from "../../services/admin/stock-management.service.js";

export const getAllProductsStockController = async (req, res, next) => {
    try {

        const query = req.query
        const stockRes = await getAllProductsStockService(query)

        // const simplifedProduct = products.map(x => {
        //     const product = x.product_id
        //     return {
        //         ...x,
        //         name : product.name,
        //         images : cloudinary.url(product.images[0]?.url, {secure : true}),
        //         price  : product.price,
        //         discount : product.discount,
        //         category_name : product.category_id.name
        //     }
        // })

        return res.status(200).json({data : stockRes , message : "Products with stock recieved successfully", status : "success"})
    } catch (error) {
        next(error);
    }
};

export const restokeProductController = async(req, res, next) => {
    try {
        const {id : variant_id} = req.params
        const {quantity } = req.body
        if(quantity <1) throw new Error("Quantity should be greater than 1")
        const variant = await ProductVariant.findById(variant_id)
        if(!variant) throw new Error("Invalid Variant")

        variant.stock = variant.stock + Number(quantity)
        await variant.save()

        return res.status(200).json({message : "Variant Restoked Successfully", data : variant , status : 'success'})
    } catch (error) {
        next(error)
    }
}