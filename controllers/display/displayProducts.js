import { getProducts } from '../utils/getProductAvailable.js';

document.addEventListener('DOMContentLoaded', function () {
    const storedData = getProducts();

    if (storedData) {
        const data = JSON.parse(storedData);
        console.log("Parsed Data:", data);

        const categoryContainer = document.querySelector('.category-container');
        const fragment = document.createDocumentFragment();
        const categories = {};

        data.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = [];
            }
            categories[product.category].push(product);
        });

        Object.entries(categories).forEach(([category, products]) => {
            const categoryTitle = document.createElement('div');
            categoryTitle.classList.add('category-title');
            categoryTitle.innerText = category;
            fragment.appendChild(categoryTitle);

            const productCardsContainer = document.createElement('div');
            productCardsContainer.classList.add('product-cards');

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                // Left side - Images with slideshow effect
                const imgScroll = document.createElement('div');
                imgScroll.classList.add('img-scroll');

                // Check if product has images and map through them
                if (product.images && Array.isArray(product.images)) {
                    product.images.forEach((imgUrl, index) => {
                        const slide = document.createElement('div');
                        slide.classList.add('mySlides', 'fade');
                        const numberText = document.createElement('div');
                        numberText.classList.add('numbertext');
                        numberText.innerText = `${index + 1} / ${product.images.length}`;
                        slide.appendChild(numberText);

                        const imgElement = document.createElement('img');
                        imgElement.src = imgUrl;
                        imgElement.alt = `Product image ${index + 1}`;
                        imgElement.style.width = "100%"; // Full width of container
                        slide.appendChild(imgElement);

                        imgScroll.appendChild(slide);
                    });
                }

                // Right side - Product name, price, description
                const productDetails = document.createElement('div');
                productDetails.classList.add('product-details');

                const productName = document.createElement('div');
                productName.classList.add('product-name');
                productName.innerHTML = `<h3>${product.name}</h3>`;

                const productPrice = document.createElement('div');
                productPrice.classList.add('product-price');
                productPrice.innerHTML = `<h3>$${product.price}</h3>`;

                const productDesc = document.createElement('div');
                productDesc.classList.add('product-desc');
                productDesc.innerText = product.description;

                productDetails.appendChild(productName);
                productDetails.appendChild(productPrice);
                productDetails.appendChild(productDesc);

                productCard.appendChild(imgScroll);
                productCard.appendChild(productDetails);
                productCardsContainer.appendChild(productCard);

                // Adding hover effect to start slideshow
                let slideIndex = 0;
                let isHovering = false;
                let slideshowInterval;

                function startSlideshow() {
                    const slides = imgScroll.getElementsByClassName('mySlides');
                    const numSlides = slides.length;

                    function updateSlides() {
                        Array.from(slides).forEach(slide => slide.style.display = "none");
                        slideIndex++;
                        if (slideIndex > numSlides) { slideIndex = 1; } // Loop back to the first slide
                        slides[slideIndex - 1].style.display = "block";
                    }

                    slideshowInterval = setInterval(updateSlides, 2000); // Change image every 2 seconds
                    updateSlides(); // Start showing the first image initially
                    isHovering = true;
                }

                function stopSlideshow() {
                    clearInterval(slideshowInterval); // Stop the interval
                    isHovering = false;
                }

                imgScroll.addEventListener('mouseenter', () => {
                    if (!isHovering) {
                        startSlideshow(); // Start slideshow if not already started
                    }
                });

                imgScroll.addEventListener('mouseleave', () => {
                    stopSlideshow(); // Stop slideshow when hover ends
                });

                // Initially display the first image (without hovering)
                const slides = imgScroll.getElementsByClassName('mySlides');
                slides[0].style.display = "block"; // Ensure the first image is displayed initially

            });

            fragment.appendChild(productCardsContainer);
        });

        categoryContainer.appendChild(fragment);

    } else {
        console.log("No products found in localStorage.");
    }
});
