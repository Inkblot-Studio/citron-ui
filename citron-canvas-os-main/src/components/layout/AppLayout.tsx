import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { CanvasProvider } from "../ai/CanvasContext";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <CanvasProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto hide-scrollbar" data-tour="canvas">
            {children}
          </div>
        </main>
      </div>
    </CanvasProvider>
  );
}
