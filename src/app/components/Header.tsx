import Link from "next/link"
import HeaderUser from "./HeaderUser"

export default function Header() {
    return (
        <header className="h-16 bg-secondary text-white">
            <nav className="flex flex-row items-center justify-around h-full">
                <ul className="flex flex-row items-center justify-around w-full">
                    <li>
                        {/* TODO: Replace with logo (to be created) */}
                        <Link href="/">Nostr P2P Marketplace</Link>
                    </li>
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                    <li>
                        <HeaderUser />
                    </li>
                </ul>
            </nav>
        </header>
    )
}
