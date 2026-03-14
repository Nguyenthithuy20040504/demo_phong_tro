'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { PageProgress } from '@/components/ui/page-progress';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

 /* useEffect(() => {
  console.log("session data:", session);
  console.log("status:", status);
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/dang-nhap');
      console.log("toang r ô cháu ạ");
      return;
    }
  }, [session, status, router]);*/

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      {/* Premium Clean Background */}
      <div className="fixed inset-0 bg-background transition-colors duration-300 -z-10" />
      
      <AppSidebar className="glass-panel border-r-0" />
      
      <SidebarInset className="overflow-hidden bg-transparent transition-all duration-300">
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/60 backdrop-blur-xl px-4 shadow-sm transition-all duration-300">
          <PageProgress />
          <SidebarTrigger className="-ml-1 text-foreground hover:bg-muted/50 transition-colors rounded-full" />
          <Separator orientation="vertical" className="h-6 bg-border" />
          <div className="flex-1">
            <DynamicBreadcrumb />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SessionProvider>
  );
}
