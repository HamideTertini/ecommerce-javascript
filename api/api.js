

// Render Products
function renderProducts(products, container) {
    container.innerHTML = ''; // Clear existing products
    if (!products.length) {
        container.innerHTML = '<p class="text-gray-500 text-center">No products found.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'border p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl transition cursor-pointer';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.className = 'w-full h-48 object-cover mb-4';

        const title = document.createElement('h3');
        title.textContent = product.title;
        title.className = 'text-lg font-bold text-center';


        const discountPrice = (product.price * 0.8).toFixed(2); // 20% zbritje
        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        price.className = 'text-center text-gray-900 mt-2';
       


        const discountedPriceElement = document.createElement('p');
          discountedPriceElement.textContent = `Discounted Price: $${discountPrice}`;
          discountedPriceElement.className = 'text-center text-red-500 mt-1';


        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.className = 'add-to-cart bg-gray-700 text-white px-4 py-2 mt-4 w-full rounded hover:bg-gray-900 transition';
        button.dataset.id = product.id;
        button.dataset.title = product.title;
        button.dataset.price = product.price;
        button.dataset.stock = product.rating.count;

        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productTitle = button.getAttribute('data-title');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const productStock = parseInt(button.getAttribute('data-stock'));

            addToCart({ id: productId, title: productTitle, price: productPrice, rating: { count: productStock } });
        });

        div.append(img, title, price,discountedPriceElement, button);
        fragment.appendChild(div);
    });

    container.appendChild(fragment);
}

// Fetch Products
export async function fetchProducts(container, page = 1, limit = 8) {
    container.innerHTML = '<p class="text-center text-gray-500">Loading products...</p>';

    try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const products = await response.json();

        // Paginate products
        const start = (page - 1) * limit;
        const displayedProducts = products.slice(start, start + limit);

        renderProducts(displayedProducts, container);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        container.innerHTML = '<p class="text-red-500 text-center">Failed to load products. Please try again later.</p>';
    }
}

// Add Product to Cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (product.rating.count <= 0) {
        alert('This product is out of stock!');
        return;
    }

    if (existingProduct) {
        if (existingProduct.quantity >= product.rating.count) {
            alert('No more stock available for this product!');
            return;
        }
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Update total price
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    localStorage.setItem('cartTotal', total);

    alert(`${product.title} has been added to the cart.`);
}

// Fetch Filtered Products
export async function fetchFilteredProducts(filters, container) {
    container.innerHTML = '<p class="text-center text-gray-500">Loading products...</p>';

    try {
        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.rating) queryParams.append('rating', filters.rating);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
        if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

        const response = await fetch(`https://fakestoreapi.com/products?${queryParams.toString()}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const products = await response.json();
        renderProducts(products, container);
    } catch (error) {
        console.error('Failed to fetch filtered products:', error);
        container.innerHTML = '<p class="text-red-500 text-center">Failed to load products. Please try again later.</p>';
    }
}

// Search Products
export async function searchProducts(query, container) {
    container.innerHTML = '<p class="text-center text-gray-500">Searching products...</p>';

    try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const products = await response.json();
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        renderProducts(filteredProducts, container);
    } catch (error) {
        console.error('Failed to search products:', error);
        container.innerHTML = '<p class="text-red-500 text-center">Failed to search products. Please try again later.</p>';
    }
}

// Fetch Paginated Products
export async function fetchPaginatedProducts(page = 1, limit = 8, filters, container) {
    container.innerHTML = '<p class="text-center text-gray-500">Loading products...</p>';

    try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let products = await response.json();

        // Apply filters
        if (filters) {
            if (filters.category) {
                products = products.filter(product => product.category === filters.category);
            }
            if (filters.rating) {
                products = products.filter(product => product.rating.rate >= filters.rating);
            }
        }

        // Paginate products
        const start = (page - 1) * limit;
        const displayedProducts = products.slice(start, start + limit);

        renderProducts(displayedProducts, container);
    } catch (error) {
        console.error('Failed to fetch paginated products:', error);
        container.innerHTML = '<p class="text-red-500 text-center">Failed to load products. Please try again later.</p>';
    }
}
