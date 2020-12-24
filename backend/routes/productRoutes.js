import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, 
        updateProduct, createProductReview, getMyWaitlistProducts,
        getDispatchReadyProducts, dispatchProduct, getDispatchedProducts} 
        from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js' 

router.route('/').get(getProducts).post(protect, admin, createProduct) 
router.route('/mywaitlistproducts').get(protect, admin, getMyWaitlistProducts)
router.route('/dispatchready').get(protect, admin, getDispatchReadyProducts)
router.route('/dispatched').get(protect, admin, getDispatchedProducts)
router.route('/dispatchProduct/:id').put(protect, admin, dispatchProduct)
router.route('/:id/reviews').post(protect, createProductReview) 
router
  .route('/:id') 
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  
export default router 