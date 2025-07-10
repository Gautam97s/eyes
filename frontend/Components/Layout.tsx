import { Sidebar } from "./ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex h-screen grow flex-col overflow-auto p-6">
                <div className="w-full max-w-screen-xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}