const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const getAuthToken = () => localStorage.getItem('rewear_token');

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: { ...headers, ...options.headers }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Network request failed');
  }
  return data;
};

// ─── AUTHENTICATION ────────────────────────────────────────────────────────────

export const signUpUser = async (email, password) => {
  return await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
};

export const signInUser = async (email, password) => {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  // The backend returns { token, user }
  localStorage.setItem('rewear_token', data.token);
  localStorage.setItem('rewear_user', JSON.stringify(data.user));
  return data;
};

export const signOutUser = async () => {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch (e) {
    console.warn("Logout request failed or user already logged out", e);
  }
  localStorage.removeItem('rewear_token');
  localStorage.removeItem('rewear_user');
};

export const getCurrentUser = async () => {
  const token = getAuthToken();
  const userString = localStorage.getItem('rewear_user');
  if (!token || !userString) {
    throw new Error('Not authenticated');
  }
  return JSON.parse(userString);
};

// ─── PRODUCTS ──────────────────────────────────────────────────────────────────

export const getProducts = async (category = 'All') => {
  let url = '/products';
  if (category && category !== 'All') {
    url += `?category=${encodeURIComponent(category.toLowerCase())}`;
  }
  return await request(url);
};

export const getProductById = async (id) => {
  return await request(`/products/${id}`);
};

// ─── CART ──────────────────────────────────────────────────────────────────────

export const getCartItems = async () => {
  return await request('/cart');
};

export const addToCart = async (userId, productId, quantity = 1) => {
  return await request('/cart', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId, quantity })
  });
};

export const updateCartQuantity = async (cartId, quantity) => {
  return await request(`/cart/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity })
  });
};

export const removeFromCart = async (cartId) => {
  return await request(`/cart/${cartId}`, {
    method: 'DELETE'
  });
};

export const clearCart = async (userId) => {
  return await request('/cart', {
    method: 'DELETE'
  });
};

// ─── ORDERS ────────────────────────────────────────────────────────────────────

export const checkoutCart = async (userId, cartItems) => {
  // Backend expects { customer_email, items: [{product_id, quantity, price}] }
  // We can grab user's email from localStorage
  const userString = localStorage.getItem('rewear_user');
  const user = userString ? JSON.parse(userString) : { email: 'unknown@example.com' };

  const items = cartItems.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price
  }));

  const orderData = await request('/orders', {
    method: 'POST',
    body: JSON.stringify({ customer_email: user.email, items })
  });
  
  // Clear cart after checkout
  await clearCart(userId);
  return orderData;
};

export const getUserOrders = async () => {
  return await request('/orders');
};
