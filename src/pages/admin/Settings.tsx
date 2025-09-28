import { Outlet } from "react-router";

export default function AdminSettings() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">System Settings</h1>
            <p>Configure your system settings here.</p>
            <main className="flex-1 p-6 bg-gray-50">
                <Outlet /> {/* Nested routes will render here */}
            </main>
        </div>
    );
}
