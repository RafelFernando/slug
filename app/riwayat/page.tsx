import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation";

export default async function Riwayat() {
    const session = await auth()

    if (!session) {
        redirect("/login?redirect_url=riwayat");
    }
    return (
        <div>
            <h1>Halaman Riwayat Pembelian</h1>
            <h1>Riwayat Pesanan {session?.user.name}</h1>
        </div>
    )
}