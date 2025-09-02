import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-x-hidden font-inter">
      {/* Enhanced Background with Mesh Gradient */}
      <div className="fixed inset-0 bg-mesh pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {children}
    </main>
  );
}
