import { Product } from '../types.ts';

import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import router from '../routes.ts';

let products: Product[] =[
    {
        id:"1",
        name:"Product One",
        description: "This Is Product One",
        price: 29.99,
    },
    {
        id:"2",
        name:"Product two",
        description: "This Is Product two",
        price: 29.99,
    },
    {
        id:"3",
        name:"Product Three",
        description: "This Is Product Three",
        price: 29.99,
    },
    {
        id:"4",
        name:"Product Four",
        description: "This Is Product Four",
        price: 29.99,
    },
];

// Description Get All The Product

const getProducts=({response}:{response:any}) =>{
        response.body={
            success: true,
            data:products
        }
    }

// Description Get Single Product
// GET /api/v1/products/id


const getProduct=({  params, response}:{ params:{id:string} ,response:any}) =>{ 
    const product:Product | undefined = products.find(p=> p.id === params.id) 

    if(product){
        response.status = 200
        response.body={
            success:true,
            data:product
        }
    }else{
        response.status = 404

        response.body={
            success:false,
            msg : 'No product Found'
        }

    }

}

const AddProducts= async ({response,request}:{response:any,request:any}) =>{ 

    const body = await request.body()

    if(!request.hasBody){
        response.status =400
        response.body={
            success:false,
            msg:'No Data'
        }

    }else{
        const product:Product = body.value
        product.id=v4.generate()
        products.push(product)
        response.status=201
        response.body={
            success:true,
            data:product
        }

    }
     
}

const UpdateProducts= async({params,request,response}:{ params:{id:string},request:any, response:any}) =>{ 

    const product:Product | undefined = products.find(p=> p.id === params.id) 

    if(product){
        const body = await request.body()

        const UpdateDataa : {name?: string; description?:string; price?:number } =body.value

        products = products.map(p => p.id === params.id ? { ...p, ...UpdateDataa }:p)

        response.status=200
        response.body={
            success:true,
            data:products
        }

    }else{
        response.status = 404

        response.body={
            success:false,
            msg : 'No product Found'
        }

    }
    
}

const DeleteProducts=({params,response}:{params:{id:string},response:any}) =>{  
    products = products.filter(p => p.id !== params.id)
    response.body={
        success:true,
        msg:'products removed'
    }
}

export { getProducts,getProduct,AddProducts,UpdateProducts,DeleteProducts }
