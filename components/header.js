export default function Header() {
    const user = JSON.parse(localStorage.getItem('loggedinuser') || '{}');

    return `
        <header class="bg-gray-800 text-white py-4 shadow-md">
            <div class="container mx-auto flex items-center justify-between">
                <h1 class="text-4xl font-extrabold tracking-wide">
                    DailyCart
                </h1>
                <nav>
                    <ul class="flex gap-8 text-lg font-medium">
                        <li>
                            <a href="index.html" class="hover:text-gray-800 transition duration-300">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="shop.html" class="hover:text-gray-800 transition duration-300">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href="cart.html" class="hover:text-gray-800 transition duration-300">
                                Cart
                            </a>
                        </li>
                        ${user.isloggedin ? `
                            <li>
                                <a href="dashboard.html" class="hover:text-gray-800 transition duration-300">Dashboard</a>
                            </li>
                            <li>
                                <button id="logout" class="hover:text-gray-800 transition duration-300">
                                    Logout
                                </button>
                            </li>
                        ` : `
                            <li>
                                <a href="login.html" class="hover:text-gray-800 transition duration-300">
                                    Login
                                </a>
                            </li>
                            <li>
                                <a href="register.html" class="hover:text-gray-800 transition duration-300">
                                    Register
                                </a>
                            </li>
                        `}
                    </ul>
                </nav>
            </div>
        </header>
    `;
}
