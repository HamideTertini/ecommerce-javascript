export function getOrders(userEmail) {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    return allOrders.filter(order => order.email === userEmail);
}
