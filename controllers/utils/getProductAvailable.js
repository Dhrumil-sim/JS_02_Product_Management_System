import {doesProductExist} from './checkProductAvailable.js';


export function getProducts(){
if(doesProductExist)
{
    const data = localStorage.getItem('products');


    return data;
}
else 
{
        return {};
}
}