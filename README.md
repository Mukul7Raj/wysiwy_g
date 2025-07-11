
# 🧥 Outfit Builder – Drag-and-Drop Fashion App

A responsive, interactive outfit builder web app built using **Next.js**.  
Users can drag clothing items (tops, bottoms, shoes) from a panel onto a canvas, mix & match combinations, and add completed outfits to a shopping cart.

---

## 🚀 Features

- 🧲 **Drag-and-Drop Interface** powered by DnD Kit
- 🧍 **Canvas to Compose Outfits** with zone-based drop restrictions
- 👚 **Dynamic Clothing Panel** with categorized items (tops, bottoms, shoes)
- ➕ **Add to Cart** logic with outfit validation
- 🛒 **Cart Sidebar** to view all saved outfits with image previews
- ❌ **Remove Individual Outfits** from cart
- 🧼 **Responsive UI** for mobile and desktop
- 📭 **Empty Cart State** with centered illustration

---

## 📦 Installation

1. **cd outfitbuilder**

2. **Install dependencies**

```bash
npm install
# or
yarn
```

---

## ▶️ Running the App Locally

```bash
npm run dev
# or
yarn dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🛠 Additional Instructions

- Make sure to place any clothing images or icons in the `/public` directory if using custom images.
- The cart resets on refresh .
- This app is fully client-rendered using `'use client'` in all interactivity-driven files.
- Cart is scoped globally via React Context.

---

## ✅ Tech Stack

- **Next.js**
- **React**
- **DnD Kit** for drag-and-drop
- **TypeScript**
- **Custom CSS (inline styling) and tailwind**
