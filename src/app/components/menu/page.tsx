import "../../globals.css";
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout() {
    return (
        <menu className="min-h-screen bg-background text-foreground font-sans">
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/">
                            <p className="text-white">Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/users">
                            <p className="text-white">Users</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin">
                            <p className="text-white">Admin</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <p className="text-white">Login</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </menu>
    );
}

