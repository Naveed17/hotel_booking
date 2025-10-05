"use client";
import { motion } from "framer-motion";
import { Book, Download, Code, Settings, Rocket, Shield, Globe, Zap, ArrowLeft, FileText, Database, Wrench, HelpCircle, Star, CheckCircle, XCircle, Hotel, Plane, MapPin, BarChart3, Mail, MessageCircle, Video } from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-6">
              Complete Documentation
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to setup, customize, and deploy TravelNext - Your Next.js 15 Travel Booking Platform
            </p>
          </motion.div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-400" />
              System Requirements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/20 rounded-xl p-4">
                <h4 className="font-bold text-white mb-2">Node.js</h4>
                <p className="text-white/70 text-sm">18.0 or higher</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4">
                <h4 className="font-bold text-white mb-2">Package Manager</h4>
                <p className="text-white/70 text-sm">npm 8.0+ or yarn/pnpm</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4">
                <h4 className="font-bold text-white mb-2">Browser</h4>
                <p className="text-white/70 text-sm">Chrome 90+, Firefox 88+, Safari 14+</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-blue-400" />
              Quick Start Guide
            </h2>
            <div className="bg-black/30 rounded-2xl p-6 mb-6">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {`# 1. Extract the downloaded files
unzip travelnext-platform.zip
cd travelnext-platform

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open in browser
http://localhost:3000`}
              </pre>
            </div>
            <p className="text-white/70">
              Get up and running in less than 5 minutes with our streamlined setup process.
            </p>
          </motion.div>

          {/* Project Structure */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-400" />
              Project Structure
            </h2>
            <div className="bg-black/30 rounded-2xl p-6">
              <pre className="text-cyan-400 text-sm overflow-x-auto">
                {`travelnext-platform/
├── 📁 src/
│   ├── 📁 app/                    # Next.js 15 App Router
│   │   ├── 📁 [lang]/            # Multi-language routing
│   │   │   ├── 📁 (main)/        # Main application pages
│   │   │   │   ├── 📁 hotels/    # Hotel booking pages
│   │   │   │   ├── 📁 flights/   # Flight booking pages
│   │   │   │   ├── 📁 tours/     # Tour package pages
│   │   │   │   └── page.tsx      # Home page
│   │   │   ├── 📁 (auth)/        # Authentication pages
│   │   │   └── 📁 (dashboard)/   # Role-based dashboards
│   │   └── 📁 api/               # API routes
│   ├── 📁 components/            # Reusable components
│   ├── 📁 context/              # React Context providers
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 lib/                  # Utility libraries
│   ├── 📁 dictionaries/         # i18n translations
│   └── 📁 styles/               # Global styles
├── 📁 public/                   # Static assets
└── 📄 Configuration files`}
              </pre>
            </div>
          </motion.div>

          {/* Environment Variables */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Wrench className="w-8 h-8 text-blue-400" />
              Environment Configuration
            </h2>
            <p className="text-white/70 mb-4">Create <code className="bg-black/30 px-2 py-1 rounded text-cyan-400">.env.local</code> file in the root directory:</p>
            <div className="bg-black/30 rounded-2xl p-6">
              <pre className="text-yellow-400 text-sm overflow-x-auto">
                {`# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="TravelNext"

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
SMTP_PASS=your-password`}
              </pre>
            </div>
          </motion.div>

          {/* Features Overview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Features Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Hotel className="w-6 h-6 text-orange-400" />
                  Hotel Booking System
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Advanced search and filtering</li>
                  <li>• Interactive maps (Leaflet)</li>
                  <li>• Room selection and booking</li>
                  <li>• Guest management</li>
                  <li>• Booking confirmation</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Plane className="w-6 h-6 text-blue-400" />
                  Flight Booking Module
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Flight search engine</li>
                  <li>• Multi-city support</li>
                  <li>• Passenger details</li>
                  <li>• Seat selection</li>
                  <li>• E-ticket generation</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-green-400" />
                  Tour Packages
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Package browsing</li>
                  <li>• Custom itineraries</li>
                  <li>• Group bookings</li>
                  <li>• Tour guide assignment</li>
                  <li>• Package customization</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  Dashboard System
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Customer Dashboard</li>
                  <li>• Agent Dashboard</li>
                  <li>• Admin Dashboard</li>
                  <li>• Super Admin Dashboard</li>
                  <li>• Role-based access control</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Customization Guide */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-400" />
              Customization Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Branding & Colors</h4>
                <div className="bg-black/30 rounded-xl p-4 mb-4">
                  <pre className="text-green-400 text-sm">
                    {`// Update Logo
// src/components/main/header.tsx
<h1 className="text-2xl font-black">
  Your Brand Name
</h1>`}
                  </pre>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <pre className="text-green-400 text-sm">
                    {`/* Change Colors */
/* src/css/app.css */
:root {
  --text-primary: #your-color;
  --color-travel-blue: #your-brand;
}`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Adding New Pages</h4>
                <div className="bg-black/30 rounded-xl p-4 mb-4">
                  <pre className="text-green-400 text-sm">
                    {`// Create Page Component
// src/app/[lang]/(main)/your-page/page.tsx
export default function YourPage() {
  return <div>Your content</div>;
}`}
                  </pre>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <pre className="text-green-400 text-sm">
                    {`// Add Navigation
// src/components/main/header.tsx
<Link href="/your-page">
  Your Page
</Link>`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* API Integration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-400" />
              API Integration
            </h2>
            <p className="text-white/70 mb-6">Current mock APIs are located in <code className="bg-black/30 px-2 py-1 rounded text-cyan-400">src/app/api/mock/</code></p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-white mb-3">Mock API Structure</h4>
                <div className="bg-black/30 rounded-xl p-4">
                  <pre className="text-cyan-400 text-sm">
                    {`api/mock/
├── auth/          # Authentication
├── hotels/        # Hotel data
├── flights/       # Flight search
├── tours/         # Tour packages
├── countries/     # Location data
└── newsletter/    # Email subscription`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3">Replace with Real API</h4>
                <div className="bg-black/30 rounded-xl p-4">
                  <pre className="text-green-400 text-sm">
                    {`// Update API Base URL
// src/lib/api-client.ts
const API_BASE_URL = 
  'https://your-api.com/api';

// Modify API Calls
const fetchHotels = async () => {
  const response = await fetch(
    \`\${API_BASE_URL}/hotels\`
  );
  return response.json();
};`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deployment */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-blue-400" />
              Deployment Options
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/20 rounded-xl p-6">
                <h4 className="font-bold text-white mb-3">Vercel (Recommended)</h4>
                <div className="bg-black/30 rounded p-3 mb-3">
                  <pre className="text-green-400 text-xs">
                    {`npm i -g vercel
vercel --prod`}
                  </pre>
                </div>
                <p className="text-white/70 text-sm">Easiest deployment with automatic optimizations</p>
              </div>
              <div className="bg-black/20 rounded-xl p-6">
                <h4 className="font-bold text-white mb-3">Docker</h4>
                <div className="bg-black/30 rounded p-3 mb-3">
                  <pre className="text-green-400 text-xs">
                    {`docker build -t app .
docker run -p 3000:3000 app`}
                  </pre>
                </div>
                <p className="text-white/70 text-sm">Containerized deployment for any platform</p>
              </div>
              <div className="bg-black/20 rounded-xl p-6">
                <h4 className="font-bold text-white mb-3">Manual</h4>
                <div className="bg-black/30 rounded p-3 mb-3">
                  <pre className="text-green-400 text-xs">
                    {`npm run build
npm start`}
                  </pre>
                </div>
                <p className="text-white/70 text-sm">Traditional server deployment</p>
              </div>
            </div>
          </motion.div>

          {/* Support Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-400" />
              Support & Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">What's Included</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Installation assistance
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Configuration help
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Bug fixes
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    6 months of updates
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Not Included</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-white/70">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Custom feature development
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Third-party integration
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Server setup/hosting
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Design changes
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Performance & Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-gradient-to-r bg-black/20 rounded-3xl p-12 mb-12"
          >
            <div className="relative z-10">
              <Zap className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-8 text-center">Performance & Optimization</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Built-in Optimizations</h4>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      Next.js 15 App Router with automatic code splitting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      Image optimization with next/image
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      Lazy loading for components and routes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      Server-side rendering for SEO
                    </li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Lighthouse Score</span>
                      <span className="text-green-300 font-bold">95+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">First Load JS</span>
                      <span className="text-green-300 font-bold">&lt; 250kb</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Core Web Vitals</span>
                      <span className="text-green-300 font-bold">Excellent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Mobile Performance</span>
                      <span className="text-green-300 font-bold">Optimized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Need Additional Help?</h3>
            <p className="text-white/70 mb-6">
              Our support team is here to help you get the most out of TopTier Travel platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@toptiertravel.com
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Live Chat Support
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <Video className="w-4 h-4" />
                Video Tutorials
              </button>
            </div>
            <p className="text-white/60 text-sm mt-6">
              Response time: 24-48 hours • Include error messages and steps to reproduce
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}