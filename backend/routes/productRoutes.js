import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, 
        updateProduct, createProductReview, getMyProducts, } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js' 

router.route('/').get(getProducts).post(protect, admin, createProduct) 
router.route('/myproducts').get(protect, admin, getMyProducts)
router.route('/:id/reviews').post(protect, createProductReview) 
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  
export default router 