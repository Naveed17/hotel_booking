# 📚 TopTier Travel - CodeCanyon Documentation

**Complete Setup and Customization Guide for Next.js 15 Travel Booking Platform**

---

## 📋 Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Project Structure](#project-structure)
3. [Configuration](#configuration)
4. [Features Overview](#features-overview)
5. [Customization Guide](#customization-guide)
6. [API Integration](#api-integration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [Support](#support)

---

## 🚀 Installation & Setup

### System Requirements
- **Node.js**: 18.0 or higher
- **npm**: 8.0 or higher (or yarn/pnpm)
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+

### Quick Start

```bash
# 1. Extract the downloaded files
unzip toptier-travel-platform.zip
cd toptier-travel-platform

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open in browser
http://localhost:3000
```

### Environment Variables

Create `.env.local` file in the root directory:

```env
# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="TopTier Travel"

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication (Optional - for production)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Database (Optional - for production)
DATABASE_URL=your-database-url-here

# Email Service (Optional)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

---

## 🏗️ Project Structure

```
toptier-travel-platform/
├── 📁 src/
│   ├── 📁 app/                    # Next.js 15 App Router
│   │   ├── 📁 [lang]/            # Multi-language routing
│   │   │   ├── 📁 (main)/        # Main application pages
│   │   │   │   ├── 📁 hotels/    # Hotel booking pages
│   │   │   │   ├── 📁 flights/   # Flight booking pages
│   │   │   │   ├── 📁 tours/     # Tour package pages
│   │   │   │   ├── 📁 showcase/  # Landing page
│   │   │   │   └── page.tsx      # Home page
│   │   │   ├── 📁 (auth)/        # Authentication pages
│   │   │   └── 📁 (dashboard)/   # Role-based dashboards
│   │   └── 📁 api/               # API routes
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 main/             # Public components
│   │   ├── 📁 dashboard/        # Dashboard components
│   │   ├── 📁 auth/             # Auth components
│   │   └── 📁 core/             # Core UI components
│   ├── 📁 context/              # React Context providers
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 lib/                  # Utility libraries
│   ├── 📁 dictionaries/         # i18n translations
│   └── 📁 styles/               # Global styles
├── 📁 public/                   # Static assets
└── 📄 Configuration files
```

---

## ⚙️ Configuration

### Tailwind CSS Customization

Edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Your brand colors
        "primary-text": "#112D4E",
        "travel-blue": {
          DEFAULT: "#163C8C",
          50: "#E5ECFF",
          500: "#163C8C",
          900: "#060C1C",
        },
        // Add your custom colors
      },
    },
  },
} satisfies Config;
```

### Multi-Language Setup

Configure languages in `next-intl.ts`:

```typescript
export const locales = ["en", "ar", "fr", "es"] as const;
export const defaultLocale = "en" as const;
```

Add translations in `src/dictionaries/[lang]/`:

```json
// src/dictionaries/en/en.json
{
  "navigation": {
    "home": "Home",
    "hotels": "Hotels",
    "flights": "Flights",
    "tours": "Tours"
  },
  "common": {
    "search": "Search",
    "book_now": "Book Now",
    "view_details": "View Details"
  }
}
```

---

## 🌟 Features Overview

### 🏨 Hotel Booking System
- **Location**: `src/app/[lang]/(main)/hotels/`
- **Components**: `src/components/main/components/modules/hotels/`
- **Features**:
  - Advanced search and filtering
  - Interactive maps (Leaflet)
  - Room selection and booking
  - Guest management
  - Booking confirmation

### ✈️ Flight Booking Module
- **Location**: `src/app/[lang]/(main)/flights/`
- **Components**: `src/components/main/components/modules/flights/`
- **Features**:
  - Flight search engine
  - Multi-city support
  - Passenger details
  - Seat selection
  - E-ticket generation

### 🗺️ Tour Packages
- **Location**: `src/app/[lang]/(main)/tours/`
- **Components**: `src/components/main/components/modules/tours/`
- **Features**:
  - Package browsing
  - Custom itineraries
  - Group bookings
  - Tour guide assignment

### 📊 Dashboard System
- **Location**: `src/app/[lang]/(dashboard)/`
- **Components**: `src/components/dashboard/`
- **Roles**:
  - **Customer**: Booking history, profile management
  - **Agent**: Client management, commissions
  - **Admin**: User management, content control
  - **Super Admin**: Full system access

---

## 🎨 Customization Guide

### Branding & Colors

1. **Update Logo**:
   ```tsx
   // src/components/main/header.tsx
   <h1 className="text-2xl font-black">
     Your Brand Name
   </h1>
   ```

2. **Change Color Scheme**:
   ```css
   /* src/css/app.css */
   :root {
     --text-primary: #your-color;
     --color-travel-blue: #your-brand-color;
   }
   ```

3. **Update Favicon**:
   - Replace files in `public/` directory
   - Update `src/app/manifest.ts`

### Adding New Pages

1. **Create Page Component**:
   ```tsx
   // src/app/[lang]/(main)/your-page/page.tsx
   export default function YourPage() {
     return <div>Your content</div>;
   }
   ```

2. **Add Navigation**:
   ```tsx
   // src/components/main/header.tsx
   <Link href="/your-page">Your Page</Link>
   ```

### Custom Components

1. **Create Component**:
   ```tsx
   // src/components/core/your-component.tsx
   export default function YourComponent() {
     return <div>Your component</div>;
   }
   ```

2. **Export Component**:
   ```tsx
   // src/components/core/index.ts
   export { default as YourComponent } from './your-component';
   ```

---

## 🔌 API Integration

### Mock API Structure

Current mock APIs are located in `src/app/api/mock/`:

```
api/mock/
├── auth/          # Authentication endpoints
├── hotels/        # Hotel data and booking
├── flights/       # Flight search and booking
├── tours/         # Tour packages
├── countries/     # Location data
└── newsletter/    # Email subscription
```

### Replacing Mock APIs

1. **Update API Base URL**:
   ```typescript
   // src/lib/api-client.ts
   const API_BASE_URL = 'https://your-api.com/api';
   ```

2. **Modify API Calls**:
   ```typescript
   // Example: src/hooks/use-hotels.ts
   const fetchHotels = async () => {
     const response = await fetch(`${API_BASE_URL}/hotels`);
     return response.json();
   };
   ```

### Authentication Integration

1. **JWT Setup**:
   ```typescript
   // src/lib/auth.ts
   export const setAuthToken = (token: string) => {
     localStorage.setItem('auth_token', token);
   };
   ```

2. **Protected Routes**:
   ```tsx
   // src/components/auth/protected-route.tsx
   export default function ProtectedRoute({ children }) {
     const { user } = useUser();
     if (!user) return <LoginPage />;
     return children;
   }
   ```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Environment Variables**:
   - Add production environment variables in Vercel dashboard

### Docker Deployment

1. **Build Docker Image**:
   ```bash
   docker build -t toptier-travel .
   ```

2. **Run Container**:
   ```bash
   docker run -p 3000:3000 toptier-travel
   ```

### Manual Deployment

1. **Build Application**:
   ```bash
   npm run build
   ```

2. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### 2. **TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### 3. **Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build:css
```

#### 4. **i18n Issues**
- Ensure all translation keys exist in all language files
- Check `next-intl.ts` configuration

### Performance Optimization

1. **Image Optimization**:
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/your-image.jpg"
     alt="Description"
     width={800}
     height={600}
     priority // For above-the-fold images
   />
   ```

2. **Code Splitting**:
   ```tsx
   import dynamic from 'next/dynamic';
   
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>
   });
   ```

---

## 📞 Support

### Documentation Resources
- **Next.js 15**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **React Hook Form**: https://react-hook-form.com/

### Getting Help

1. **Check Documentation**: Review this guide thoroughly
2. **Search Issues**: Look for similar problems in the codebase
3. **Contact Support**: 
   - Email: support@toptiertravel.com
   - Response time: 24-48 hours
   - Include error messages and steps to reproduce

### What's Included in Support

✅ **Installation assistance**
✅ **Configuration help**
✅ **Bug fixes**
✅ **Minor customization guidance**
✅ **6 months of updates**

❌ **Custom feature development**
❌ **Third-party integration**
❌ **Server setup/hosting**
❌ **Design changes**

---

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- ✅ Complete Next.js 15 travel booking platform
- ✅ Multi-language support (7 languages)
- ✅ Role-based dashboard system
- ✅ Hotel, Flight, and Tour booking modules
- ✅ Responsive design with Tailwind CSS
- ✅ Authentication system
- ✅ Mock API integration
- ✅ SEO optimization

---

## 📄 License

This project is licensed under the **Envato Market License**.

### Regular License
- Use in single end product
- End product cannot be sold or distributed
- Cannot be used in multiple projects

### Extended License
- Use in multiple end products
- End product can be sold
- Can be used in client projects

For detailed license terms, visit: https://codecanyon.net/licenses

---

## 🙏 Credits

- **Next.js Team** - React framework
- **Tailwind Labs** - CSS framework
- **Framer** - Motion library
- **Lucide** - Icon library
- **Radix UI** - Component primitives
- **Leaflet** - Map library

---

**Thank you for choosing TopTier Travel! 🚀**

*For the latest updates and announcements, follow us on social media and check your CodeCanyon downloads regularly.*