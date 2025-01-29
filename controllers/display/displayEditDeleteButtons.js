document.addEventListener('DOMContentLoaded', function () {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            showEditDeleteOptions(card);
        });

        card.addEventListener('mouseleave', function () {
            hideEditDeleteOptions(card);
        });

        // Long press for mobile
        card.addEventListener('touchstart', function (e) {
            let pressTimer = setTimeout(() => {
                showEditDeleteOptions(card);
            }, 1000); // 1 second long press

            card.addEventListener('touchend', function () {
                clearTimeout(pressTimer); // Reset on touch end
            });
        });
    });
});

function showEditDeleteOptions(card) {
    // Create edit and delete buttons and append them to the card
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
        const productId = card.dataset.id; // Assuming you store an id for each product
        openEditForm(productId);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
        const productId = card.dataset.id;
        deleteProduct(productId);
        card.remove(); // Remove the card from the DOM
    });

    card.appendChild(editButton);
    card.appendChild(deleteButton);
}

function hideEditDeleteOptions(card) {
    const editButton = card.querySelector('.edit-button');
    const deleteButton = card.querySelector('.delete-button');
    
    if (editButton && deleteButton) {
        card.removeChild(editButton);
        card.removeChild(deleteButton);
    }
}
