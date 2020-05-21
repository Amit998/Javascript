import { Router } from "https://deno.land/x/oak/mod.ts";

import { getProducts,getProduct,AddProducts,UpdateProducts,DeleteProducts } from './controlers/products.ts'


const router =new Router()

router.get('/api/v1/products',getProducts);

router.get('/api/v1/product/:id',getProduct);
router.post('/api/v1/product/:id',AddProducts);
router.put('/api/v1/products/:id',UpdateProducts);
router.delete('/api/v1/products/:id',DeleteProducts);

export default router