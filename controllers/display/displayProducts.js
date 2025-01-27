import { getProducts } from '../utils/getProductAvailable.js';

document.addEventListener('DOMContentLoaded', function () {
    const productCardContainer = document.querySelector('.productCard');
    
    // Fetch data from getProducts
    const productData = getProducts(); 

    // Log the entire data to verify the structure
    console.log('Product Data:', productData);

    // Get the category name (assuming the first key is the category, e.g., "Electronics")
    const categoryName = Object.keys(productData)[0];

    // Log the category name and its associated data
    console.log(`Category Name: ${categoryName}`);
    console.log(`Category Data:`, productData[categoryName]);

    // Check if the category exists and is an array
    if (productData && Array.isArray(productData[categoryName])) {
        // Iterate through each product in the category
        productData[categoryName].forEach(product => {
            // Create a product card element
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Product Name
            const productName = document.createElement('h4');
            productName.textContent = product.name;
            productCard.appendChild(productName);

            // Product Description
            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productCard.appendChild(productDescription);

            // Product Price
            const productPrice = document.createElement('p');
            productPrice.textContent = `$${product.price}`;
            productCard.appendChild(productPrice);

            // Product Images
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('product-images');
            
            product.images.forEach(imageSrc => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `${product.name} image`;
                img.classList.add('product-image');
                imageContainer.appendChild(img);
            });

            productCard.appendChild(imageContainer);
            productCardContainer.appendChild(productCard);
        });
    } else {
        console.log(`No valid products found in the ${categoryName} category, or the category is not an array.`);
    }
});
