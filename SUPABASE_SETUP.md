# Суpabase Setup Guide

## 1️⃣ Создай аккаунт и проект на Supabase

1. Перейди на https://supabase.com
2. Нажми "Start your project"
3. Создай новый проект:
   - **Project name**: bars-shop
   - **Database password**: Запомни или сохрани в безопасном месте
   - **Region**: Выбери ближайший к тебе

## 2️⃣ Создай таблицы

В SQL Editor (левое меню) запусти этот SQL код:

```sql
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

-- Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies (для простоты разрешим все)
CREATE POLICY "Allow all" ON categories FOR ALL USING (true);
CREATE POLICY "Allow all" ON products FOR ALL USING (true);
CREATE POLICY "Allow all" ON orders FOR ALL USING (true);
```

## 3️⃣ Установи Supabase клиент

```bash
npm install @supabase/supabase-js
```

## 4️⃣ Получи credentials

В Settings → API → Project URL и anon key - скопируй эти значения

## 5️⃣ Создай файл конфигурации

```bash
# Создай .env.local в корне проекта
touch .env.local
```

Добавь туда:
```
VITE_SUPABASE_URL=твой_url
VITE_SUPABASE_ANON_KEY=твой_key
```

## 6️⃣ Ready! 🎉

Админка будет доступна по адресу: http://localhost:5173/admin
