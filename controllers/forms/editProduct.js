function openEditForm(productId) {
    const storedData = JSON.parse(localStorage.getItem('products')) || [];
    const product = storedData.find(p => p.id === productId);

    if (product) {
        // Fill the form with existing product data
        const addProductDiv = document.querySelector('.addProduct');
        addProductDiv.style.display = 'block';

        addProductDiv.innerHTML = `
            <h2>Edit Product</h2>
            <form id="editProductForm" class="product-form">
                <div class="form-group">
                    <label for="category">Product Category:</label>
                    <input type="text" id="category" name="category" value="${product.category}" required />
                </div>
                <div class="form-group">
                    <label for="productName">Product Name:</label>
                    <input type="text" id="productName" name="productName" value="${product.name}" required />
                </div>
                <div class="form-group">
                    <label for="productDescription">Product Description:</label>
                    <textarea id="productDescription" name="productDescription" rows="4" required>${product.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="productImages">Product Images (comma-separated URLs):</label>
                    <input type="text" id="productImages" name="productImages" value="${product.images.join(', ')}" required />
                </div>
                <div class="form-group">
                    <label for="price">Product Price:</label>
                    <input type="number" id="price" name="price" value="${product.price}" required />
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <div id="formFeedback"></div>
        `;

        const form = document.getElementById('editProductForm');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get updated values
            const category = document.getElementById('category').value;
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const price = document.getElementById('price').value;
            const imageUrls = document.getElementById('productImages').value.split(',').map(url => url.trim());

            // Update product data
            product.category = category;
            product.name = productName;
            product.description = productDescription;
            product.price = parseFloat(price);
            product.images = imageUrls;

            // Save updated product back to localStorage
            const updatedData = storedData.map(p => p.id === productId ? product : p);
            localStorage.setItem('products', JSON.stringify(updatedData));

            // Provide feedback
            const feedbackDiv = document.getElementById('formFeedback');
            feedbackDiv.innerHTML = `
                <h3>Product Updated:</h3>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Name:</strong> ${productName}</p>
                <p><strong>Description:</strong> ${productDescription}</p>
                <p><strong>Price:</strong> $${price}</p>
                <p><strong>Images:</strong></p>
                <div class="image-preview">
                    ${product.images.map(img => `<img src="${img}" alt="Product Image" class="product-image" />`).join('')}
                </div>
            `;
        });
    }
}
