import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/layout/BottomNav';
import FloatingActions from '@/components/layout/FloatingActions';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import InstallBanner from '@/components/layout/InstallBanner';
import TopBar from '@/components/layout/TopBar';
import CallFab from '@/components/layout/CallFab';


/** Frame shared by every route: top bar, header, routed content, footer and the mobile app chrome. */
export default function AppShell() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="app-shell" id="top">
      <TopBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <CallFab />
      <BottomNav />
      <InstallBanner />
    </div>
  );
}
