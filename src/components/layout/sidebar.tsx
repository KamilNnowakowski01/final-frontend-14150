import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      <SidebarContent />
    </aside>
  );
}
