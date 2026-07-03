# II STRIPS - Premium Luxury Streetwear E-commerce

> **Strength is in Silence. Discipline is in Choice. Legacy is Earned.**

## 🎯 Overview

II STRIPS is a premium luxury streetwear e-commerce platform built with cutting-edge web technologies. This is a full-stack, production-ready platform featuring a luxury minimalist design aesthetic.

### Key Features

- **🛍️ Complete E-commerce**: Shop, cart, wishlist, checkout, and order management
- **📱 Responsive Design**: Mobile-first luxury design with Tailwind CSS
- **✨ Animations**: Smooth, elegant animations with Framer Motion
- **🎨 Design System**: Luxury color palette with custom typography
- **🔐 Admin Dashboard**: Complete management for products, orders, subscribers, and messages
- **📧 Newsletter**: Built-in email subscription system
- **💬 Contact Management**: Receive and manage customer inquiries
- **📦 State Management**: Zustand for cart and wishlist
- **🔍 Product Discovery**: Filtering by category and size

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **Zustand** - Lightweight state management
- **Next/Image** - Optimized image rendering

### Backend
- **API Routes** - Next.js API endpoints
- **Mock Database** - In-memory storage for development

### Tools & Libraries
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## 📁 Project Structure

```
strips-ecommerce/
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── (public)/
│   │   ├── shop/                 # Shop page
│   │   ├── product/[id]/         # Product detail
│   │   ├── cart/                 # Shopping cart
│   │   ├── checkout/             # Checkout flow
│   │   ├── wishlist/             # Wishlist
│   │   ├── about/                # Brand story
│   │   ├── lookbook/             # Visual lookbook
│   │   └── contact/              # Contact form
│   └── admin/
│       ├── page.tsx              # Dashboard
│       ├── products/             # Product management
│       ├── orders/               # Order management
│       ├── newsletter/           # Subscriber management
│       └── contact/              # Message management
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer with links
│   ├── ProductCard.tsx           # Product grid card
│   ├── SizeSelector.tsx          # Size picker
│   ├── QuantityStepper.tsx       # Qty control
│   └── Accordion.tsx             # Collapsible sections
├── lib/
│   ├── types.ts                  # TypeScript types
│   ├── store.ts                  # Zustand stores
│   ├── api.ts                    # API functions
│   ├── utils.ts                  # Utility helpers
│   ├── constants.ts              # Constants
│   └── hooks.ts                  # Custom hooks
├── globals.css                   # Global styles
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
└── package.json                  # Dependencies
```

## 🎨 Design Philosophy

### Color Palette
- **Luxury Black** - `#0a0a0a` (Primary)
- **Luxury White** - `#f5f5f2` (Secondary)
- **Luxury Silver** - `#c9ccd1` (Accent)

### Typography
- **Display Font** - Cormorant Garamond (Serif)
- **Body Font** - Jost (Sans-serif)

### Animations
- Fade Up on scroll
- Smooth hover effects
- Staggered list animations
- Page transitions

## 🔧 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cxyde05/strips-ecommerce.git
cd strips-ecommerce

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📱 Pages & Routes

### Public Pages
- `/` - Home page with hero and featured products
- `/shop` - Full product catalog with filters
- `/product/[id]` - Individual product detail
- `/cart` - Shopping cart view
- `/checkout` - Checkout form
- `/order-confirmation/[id]` - Order confirmation
- `/wishlist` - Saved items
- `/about` - Brand story and values
- `/lookbook` - Visual portfolio
- `/contact` - Contact form

### Admin Pages
- `/admin` - Dashboard overview
- `/admin/products` - Manage products (CRUD)
- `/admin/orders` - Manage orders and status
- `/admin/newsletter` - View subscribers
- `/admin/contact` - View contact messages

## 🛒 Features in Detail

### Product Management
- Browse products by category
- Filter by size availability
- Add to cart with size and quantity
- Add to wishlist
- View related products
- Stock management per size

### Shopping Cart
- Persistent storage (localStorage)
- Quantity adjustment
- Size selection
- Remove items
- Real-time totals

### Checkout
- Shipping address form
- Payment method selection
- Order confirmation
- Email validation

### Admin Features
- Add/Edit/Delete products
- Track orders and update status
- View newsletter subscribers
- Read customer messages
- Dashboard analytics

## 🔐 Data Management

### State Management (Zustand)
```typescript
// Cart Store
const { items, addItem, removeItem, updateQuantity } = useCartStore();

// Wishlist Store
const { items, addItem, removeItem, isWishlisted } = useWishlistStore();
```

### Local Storage
- Cart persists across sessions
- Wishlist persists across sessions

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM
- `next` - React framework
- `framer-motion` - Animations
- `zustand` - State management
- `axios` - HTTP client
- `clsx` - Utility for classnames

### Development
- `typescript` - Type safety
- `tailwindcss` - Styling
- `postcss` - CSS processing
- `autoprefixer` - Vendor prefixes

## 🎯 Best Practices

- ✅ Type-safe development with TypeScript
- ✅ Component-based architecture
- ✅ Responsive mobile-first design
- ✅ Performance optimized (Next.js Image)
- ✅ Accessibility considerations
- ✅ Clean, maintainable code
- ✅ Luxury minimalist aesthetics

## 🚀 Deployment

Deployable on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Self-hosted Node.js

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

## 📞 Support

For questions or support:
- Email: support@iistrips.com
- Contact form: /contact

## 📄 License

Proprietary - © 2024 II STRIPS. All rights reserved.

## 👨‍💻 Developer

**Built with precision and purpose by cxyde05**

---

**II STRIPS**: Where strength is in silence, discipline is in choice, and legacy is earned.
