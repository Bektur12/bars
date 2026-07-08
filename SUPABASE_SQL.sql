-- Таблица категорий
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Таблица товаров
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id BIGINT REFERENCES categories(id),
  image_url VARCHAR(500),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Таблица заказов
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  items JSONB,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Включаем Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Создаем policies (для демонстрации разрешим все)
CREATE POLICY "Enable all for all users" ON categories
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for all users" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for all users" ON orders
  FOR ALL USING (true) WITH CHECK (true);
