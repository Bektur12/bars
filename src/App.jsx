import { useState, useEffect } from 'react'
import './styles.css'
import TagBar from './components/TagBar'
import Header from './components/Header'
import Hero from './components/Hero'
import ClawDivider from './components/ClawDivider'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import Story from './components/Story'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Toast from './components/Toast'
import Admin from './admin/Admin'
import { supabase } from './lib/supabase'
import bars1 from './assets/bars1.jpg'
import bars2 from './assets/bars2.jpg'
import bars3 from './assets/bars3.jpg'
import bars4 from './assets/bars4.jpg'

const DEFAULT_PRODUCTS = [
  { id: 'l1', cat: 'lookbook', name: 'Коллекция SS26 #1', icon: 'tee', image: bars1, price: 7990 },
  { id: 'l2', cat: 'lookbook', name: 'Коллекция SS26 #2', icon: 'tee', image: bars2, price: 8490 },
  { id: 'l3', cat: 'lookbook', name: 'Коллекция SS26 #3', icon: 'tee', image: bars3, price: 9290 },
  { id: 'l4', cat: 'lookbook', name: 'Коллекция SS26 #4', icon: 'tee', image: bars4, price: 10000 },
  { id: 'p1', cat: 'polo', name: 'Поло BARŚ Rust', icon: 'polo', price: 3490 },
]

const WHATSAPP_NUMBER = '996995466200'

export default function App() {
  // Простой роутер для админки
  if (window.location.pathname.startsWith('/admin')) {
    return <Admin />
  }

  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bars_cart')
    return saved ? JSON.parse(saved) : {}
  })

  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  // Загружаем товары из Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          // Преобразуем Supabase товары в нужный формат
          const formattedProducts = data.map(p => ({
            id: `p${p.id}`,
            cat: p.name?.toLowerCase().includes('очк') ? 'glasses' :
                 p.name?.toLowerCase().includes('поло') ? 'polo' :
                 p.name?.toLowerCase().includes('худ') ? 'hoodie' : 'lookbook',
            name: p.name,
            description: p.description,
            price: parseFloat(p.price),
            image: p.image_url,
            image_url: p.image_url,
            bg: '#171a22',
            icon: 'tee',
            in_stock: p.in_stock,
          }))
          setProducts(formattedProducts)
        }
      } catch (error) {
        console.error('Error loading products:', error)
        // Если ошибка, используем default товары
      }
    }

    fetchProducts()

    // Обновляем товары каждые 30 секунд
    const interval = setInterval(fetchProducts, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    localStorage.setItem('bars_cart', JSON.stringify(cart))
  }, [cart])

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  const showToast = (msg) => {
    setToast({ show: true, message: msg })
    setTimeout(() => setToast({ show: false, message: '' }), 2200)
  }

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    showToast('Добавлено в корзину')
    setCartOpen(true)
  }

  const changeQty = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta
      if (newQty <= 0) {
        const newCart = { ...prev }
        delete newCart[id]
        return newCart
      }
      return { ...prev, [id]: newQty }
    })
  }

  const removeItem = (id) => {
    setCart(prev => {
      const newCart = { ...prev }
      delete newCart[id]
      return newCart
    })
  }

  const checkout = () => {
    if (Object.keys(cart).length === 0) {
      showToast('Корзина пуста')
      return
    }

    let message = 'Здравствуйте! Я бы хотел оформить заказ:\n\n'
    let total = 0

    Object.entries(cart).forEach(([id, qty]) => {
      const product = products.find(p => p.id === id)
      if (product) {
        const price = product.price * qty
        const formatted = price.toLocaleString('ru-RU')
        message += `• ${product.name} × ${qty} = ${formatted} с\n`
        total += price
      }
    })

    const formatted = total.toLocaleString('ru-RU')
    message += `\n📊 Итого: ${formatted} с\n`
    message += `\n✅ BARŚ SS26 - создано для амбициозных`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    showToast('Переход в WhatsApp...')

    setCart({})
    setTimeout(() => setCartOpen(false), 1500)
  }

  return (
    <>
      <TagBar />
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ClawDivider />
      <Categories />
      <ProductGrid products={products} onAddToCart={addToCart} />
      <ClawDivider />
      <Story />
      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        products={products}
        onChangeQty={changeQty}
        onRemoveItem={removeItem}
        onCheckout={checkout}
      />

      <Toast show={toast.show} message={toast.message} />
    </>
  )
}

