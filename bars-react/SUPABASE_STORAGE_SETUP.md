# Настройка Storage в Supabase

## 1️⃣ Создай Storage bucket

1. Откройте https://supabase.com/dashboard
2. Перейдите в свой проект
3. В левом меню найдите **Storage**
4. Нажмите **+ New bucket**
5. Назовите его `product-images`
6. Включите **Public bucket** (чтобы фото были доступны всем)
7. Нажмите **Create bucket**

## 2️⃣ Установи права доступа (Policies)

В меню **Storage** → `product-images` → **Policies**:

Добавь эту policy:

```sql
CREATE POLICY "Allow all uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow all deletes" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images');
```

Или в Supabase UI:
- Нажми **New Policy**
- **Policy name**: Allow all
- **Operation**: All (SELECT, INSERT, UPDATE, DELETE)
- **Target roles**: authenticated, anon
- **Using expression**: `bucket_id = 'product-images'`
- **With check expression**: `bucket_id = 'product-images'`

## 3️⃣ Ready! ✅

Теперь в админке можешь загружать фото товаров!
