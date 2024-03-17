import HeaderUser from "./HeaderUser"

export default function Header() {
    return (
        <header className="h-16 bg-secondary text-white">
            <nav className="flex flex-row items-center justify-around h-full">
                <ul className="li">Nostr P2P Marketplace</ul>
                <ul className="li">Products</ul>
                <ul className="li">Products</ul>
                <ul className="li">Products</ul>
                <ul className="li">Products</ul>
                <ul className="li">Products</ul>
                <ul className="li">
                    <HeaderUser />
                </ul>
            </nav>
        </header>
    )
}
