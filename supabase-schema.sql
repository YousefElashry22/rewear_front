-- 1. Create Tables

-- Products Table
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cart Table
CREATE TABLE public.cart (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id uuid REFERENCES public.products NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders Table
CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  total_price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order Items Table
CREATE TABLE public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders NOT NULL ON DELETE CASCADE,
  product_id uuid REFERENCES public.products NOT NULL,
  quantity integer NOT NULL,
  price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 2. Enable Row Level Security (RLS)

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;


-- 3. Create RLS Policies

-- PRODUCTS: public can read, but not modify
CREATE POLICY "Products are viewable by everyone."
  ON public.products FOR SELECT USING (true);


-- CART: Users can only see and modify their own cart
CREATE POLICY "Users can view their own cart."
  ON public.cart FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own cart."
  ON public.cart FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart."
  ON public.cart FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart."
  ON public.cart FOR DELETE USING (auth.uid() = user_id);


-- ORDERS: Users can view and insert their own orders
CREATE POLICY "Users can view their own orders."
  ON public.orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders."
  ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);


-- ORDER ITEMS: Users can view their own order items via orders
CREATE POLICY "Users can view their own order items."
  ON public.order_items FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items."
  ON public.order_items FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );


-- 4. Initial Seed Data (Optional)
INSERT INTO public.products (name, price, image, category) VALUES
  ('Oversized Black Hoodie', 45, 'https://www.pngarts.com/files/11/Black-Hoodie-PNG-Image-Background.png', 'Streetwear'),
  ('Cargo Tech Pants', 55, 'https://www.pngarts.com/files/11/Cargo-Pant-PNG-Image-Background.png', 'Streetwear'),
  ('Street Denim Jacket', 75, 'https://www.pngarts.com/files/10/Denim-Jacket-PNG-Photo.png', 'Streetwear'),
  ('Graphic T-Shirt', 25, 'https://www.pngarts.com/files/11/Black-T-Shirt-PNG-Image-Background.png', 'Streetwear'),
  ('High-Top Sneakers', 120, 'https://www.pngarts.com/files/3/High-Top-Sneakers-PNG-Transparent-Image.png', 'Streetwear'),
  ('Cashmere Sweater', 90, 'https://www.pngarts.com/files/11/Sweater-PNG-Free-Download.png', 'Formal'),
  ('Classic Trench Coat', 150, 'https://www.pngarts.com/files/3/Trench-Coat-PNG-Image-Background.png', 'Formal'),
  ('Oxford White Shirt', 40, 'https://www.pngarts.com/files/11/White-T-Shirt-PNG-Image-Background.png', 'Formal'),
  ('Navy Blazer', 180, 'https://www.pngarts.com/files/11/Blue-T-Shirt-PNG-Image-Background.png', 'Formal'),
  ('Leather Loafers', 110, 'https://www.pngarts.com/files/11/Loafers-PNG-Image-Transparent-Background.png', 'Formal'),
  ('Leather Belt', 30, 'https://www.pngarts.com/files/11/Belt-PNG-Image-Transparent-Background.png', 'Accessories'),
  ('Silver Tech Watch', 250, 'https://www.pngarts.com/files/11/Watch-PNG-Free-Download.png', 'Accessories'),
  ('Leather Wallet', 35, 'https://www.pngarts.com/files/11/Wallet-PNG-Image-Background.png', 'Accessories'),
  ('Aviator Sunglasses', 55, 'https://www.pngarts.com/files/11/Sunglasses-PNG-Transparent-Image.png', 'Accessories');
