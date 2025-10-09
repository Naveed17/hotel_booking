'use client'
import { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallDialog() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isIOSStandalone = (window.navigator as any).standalone === true
      const isInWebAppiOS = window.matchMedia('(display-mode: fullscreen)').matches
      const isInstalled = isStandalone || isIOSStandalone || isInWebAppiOS
      
      console.log('Install check:', { isStandalone, isIOSStandalone, isInWebAppiOS, isInstalled })
      
      if (isInstalled) {
        console.log('App is installed, hiding dialog')
        setShowDialog(false)
        return true
      }
      return false
    }

    if (checkInstalled()) {
      return // Don't show dialog if already installed
    }

    // Listen for display mode changes
    const standaloneQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = () => {
      if (checkInstalled()) {
        setShowDialog(false)
      }
    }
    
    standaloneQuery.addEventListener('change', handleDisplayModeChange)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      const dismissed = localStorage.getItem('pwa-install-dismissed')
      if (!dismissed) {
        setShowDialog(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Only show fallback dialog if no PWA prompt after 3 seconds
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      // Double check not installed before showing
      const stillNotInstalled = !window.matchMedia('(display-mode: standalone)').matches &&
        !(window.navigator as any).standalone
      if (!dismissed && !deferredPrompt && stillNotInstalled) {
        setShowDialog(true)
      }
    }, 10000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      standaloneQuery.removeEventListener('change', handleDisplayModeChange)
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true)
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        // Always close dialog and mark as dismissed regardless of outcome
        setIsInstalling(false)
        setShowDialog(false)
        localStorage.setItem('pwa-install-dismissed', 'true')

      } catch (error) {
        console.error('Install error:', error)
        setIsInstalling(false)
        setShowDialog(false)
        localStorage.setItem('pwa-install-dismissed', 'true')
      }
      setDeferredPrompt(null)
    } else {
      // Fallback for browsers without PWA support
      alert('To install: Open browser menu → "Install TravelNext" or "Add to Home Screen"')
      setShowDialog(false)
      localStorage.setItem('pwa-install-dismissed', 'true')
    }
  }

  const handleDismiss = () => {
    setShowDialog(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showDialog) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Install TravelNext
          </h3>

          <p className="text-gray-600 mb-6">
            Get the full app experience with offline access and faster loading times.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Not Now
            </button>
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isInstalling ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isInstalling ? 'Installing...' : 'Install'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}