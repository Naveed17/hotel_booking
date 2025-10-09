# TravelNext - Next Generation Travel Booking Platform

A modern travel booking platform built with **Next.js 15**, **Tailwind CSS**, and **App Router**.  
TravelNext includes hotel, flight, and tour booking modules, role-based dashboards, multi-language support, and SEO-ready pages.

---

## 🚀 Features

- 🌍 Multi-language support (i18n) with `[lang]` routes
- 🏨 Hotel, ✈️ Flight, and 🗺️ Tour booking modules
- 🔑 Authentication system (Login, Signup, Forgot Password)
- 📊 Role-based dashboards (Customer, Agent, Admin, Super Admin)
- 🛠️ Mock APIs for Hotels, Flights, Tours, Locations, and Auth
- ⚡ SEO-ready (Metadata, Sitemap, Robots.txt, Manifest)
- 🎨 Responsive UI (Tailwind CSS, Framer Motion, Lucide icons)
- 🗂️ Context providers for state management

---

## 🛠️ Project Structure

```
app/
 ┣ (main)/          → Frontend pages (home, hotels, flights, tours)
 ┣ (auth)/          → Auth pages (login, signup, forgot password)
 ┣ (dashboard)/     → Role-based dashboards
 ┣ api/             → Mock APIs (auth, hotels, tours, dictionary)
 ┣ components/      → Reusable UI components
 ┣ context/         → Global state (dashboard, filters)
 ┣ lib/             → Utility functions
 ┣ public/          → Static assets
 ┗ styles/          → Global styles
```

---

## 📊 Dashboards

- **Customer Dashboard** – Manage bookings and profile
- **Agent Dashboard** – Manage travel packages
- **Admin Dashboard** – Platform settings and user management
- **Super Admin Dashboard** – Full access to all modules

---

## 🔧 Customization

- Update colors in `tailwind.config.js`
- Replace mock APIs with your own backend (`/api/*`)
- Extend i18n dictionaries for more languages

---

## 📞 Support

For support, please contact:  
**Your Name / Company**  
📧 naveed07786@gmail.com  
🌐 https://hotel-booking-alpha-murex.vercel.app/
