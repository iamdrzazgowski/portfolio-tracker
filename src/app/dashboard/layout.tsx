import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
