export function doesProductExist()
{
    const storedData = JSON.parse(localStorage.getItem('products'));

    if(storedData && Object.keys(storedData).length>0)
    {
        return true;
    }
    else 
    {
       return  false;
    }
}