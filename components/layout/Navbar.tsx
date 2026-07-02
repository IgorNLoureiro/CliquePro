import Link from "next/link";

export function Navbar() {
    return (
        <nav className="shadow-md text-black p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        CliquePro
                    </Link>
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar;