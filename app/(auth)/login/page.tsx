import FormLogin from "@/components/auth/form-login";

export default async function Login({ searchParams }: {
    searchParams?: Promise<{ redirect_url?: string }>
}) {
    const params = (await searchParams)?.redirect_url;
    let redirectUrl;
    if (!params) {
        redirectUrl = "/";
    } else {
        redirectUrl = `/${params}`;
    }

    return (
        <div className="p-6 space-y-4 bg-white w-[400px]">
            <h1 className="text-xl font-bold text-gray-900 flex justify-center">Sign in to your account</h1>

            {params === "OAuthAccountNotLinked" && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    <span className="font-medium">Account already use by other provider</span>
                </div>
            )}

            <FormLogin redirect_url={redirectUrl} />
        </div>
    )
}