// Funksion për të marrë email-in e përdoruesit të kyçur
function getLoggedInUserEmail() {
    const loggedinUser = JSON.parse(localStorage.getItem('loggedinUser'));
    if (loggedinUser && loggedinUser.isloggedin) {
        return loggedinUser.email;
    }
    console.error('No logged-in user found.');
    return null;
}

// Merr kartën e përdoruesit të kyçur
export function getCart() {
    const email = getLoggedInUserEmail();
    if (!email) {
        return []; // Nuk ka përdorues të kyçur, kthe një listë bosh
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    return cart[email] || [];
}

// Ruaj kartën e përdoruesit të kyçur
export function saveCart(cartItems) {
    const email = getLoggedInUserEmail();
    if (!email) {
        console.error('Cannot save cart: No logged-in user.');
        return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[email] = cartItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}
