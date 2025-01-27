document.addEventListener('DOMContentLoaded', function () {
    const addProductButton = document.getElementById('addProductButton');
    
    // Handle the "Add Product" button click event
    addProductButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the link from navigating

        // Create the form dynamically
        const addProductDiv = document.querySelector('.addProduct');
        addProductDiv.innerHTML = `
            <h2>Add a New Product</h2>
            <form id="productForm" class="product-form">
                <div class="form-group">
                    <label for="category">Product Category:</label>
                    <input type="text" id="category" name="category" required />
                </div>
                <div class="form-group">
                    <label for="productName">Product Name:</label>
                    <input type="text" id="productName" name="productName" required />
                </div>
                <div class="form-group">
                    <label for="productDescription">Product Description:</label>
                    <textarea id="productDescription" name="productDescription" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="productImages">Product Images:</label>
                    <input type="file" id="productImages" name="productImages" accept="image/*" multiple required />
                </div>
                <div class="form-group">
                    <label for="price">Product Price:</label>
                    <input type="number" id="price" name="price" required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            <div id="formFeedback"></div>
        `;
        
        // Handle form submission
        const form = document.getElementById('productForm');
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload

            // Get the form values
            const category = document.getElementById('category').value;
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const price = document.getElementById('price').value;
            const images = document.getElementById('productImages').files;

            // Display feedback below the form
            const feedbackDiv = document.getElementById('formFeedback');
            feedbackDiv.innerHTML = `
                <h3>Product Added:</h3>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Name:</strong> ${productName}</p>
                <p><strong>Description:</strong> ${productDescription}</p>
                <p><strong>Price:</strong> $${price}</p>
                <p><strong>Images:</strong></p>
                <div class="image-preview">
                    ${Array.from(images).map(img => `<img src="${URL.createObjectURL(img)}" alt="Product Image" class="product-image" />`).join('')}
                </div>
            `;
            
            // Clear the form
            form.reset();
        });
    });
});

// Toggle menu visibility (optional)
function toggleMenu() {
    const menu = document.querySelector('.rightMenu');
    menu.classList.toggle('active');
}
