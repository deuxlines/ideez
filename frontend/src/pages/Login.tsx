import { useState } from "react";
import toast from "react-hot-toast";
import { LogIn, ArrowLeft } from "lucide-react";

import type { LoginRequest } from "../../lib/types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useAuthStore } from "../store/useAuthStore";


export default function Login() {
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const req: LoginRequest = { email: email, password: password }

        try {
            await login(req);
            setEmail("");
            setPassword("");
            window.location.href = "/";
        } catch (err: any) {
            if (err.message === 'Unauthorized') {
                toast.error("Wrong email or password.");
            } else toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <div className="h-[400px] flex flex-col justify-between">
                <Link
                    to="/sign-in"
                    className="text-[#7e5bfc] hover:opacity-80"
                >
                    <ArrowLeft size={30} color="#7e5bfc"/>
                </Link>
                <h1 className="font-bold mb-4 self-start">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4"
                >
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="
                            w-full px-4 py-2 rounded-lg
                            text-black
                            border border-[#1b1b3a]/30 dark:border-[#1b1b3a]/20
                            bg-[#DEFEF7]
                            text-blac
                            placeholder:text-gray-500
                            focus:border-[#7b5cf0] focus:ring-2 focus:ring-[#7b5cf0]/30
                            outline-none transition
                        "
                    />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="
                            w-full px-4 py-2 rounded-lg
                            text-black
                            border border-[#1b1b3a]/30 dark:border-[#1b1b3a]/20
                            bg-[#DEFEF7]
                            text-blac
                            placeholder:text-gray-500
                            focus:border-[#7b5cf0] focus:ring-2 focus:ring-[#7b5cf0]/30
                            outline-none transition
                        "
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            flex items-center justify-center gap-2
                            bg-gradient-to-r from-[#7e5bfc] to-[#9745c3]
                            text-white
                            font-semibold
                            py-2.5 px-4
                            rounded-lg
                            shadow-md
                            hover:opacity-90
                            transition
                            disabled:opacity-50
                        "
                    >
                        <LogIn size={20} />
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="w-full">
                    <p className="font-bold">Don't have an account? </p>
                    <Link
                        to="/register"
                        className="
                            !text-white dark:!text-black
                            font-semibold transition
                            hover:!text-[#7e5bfc]
                        "
                        >
                        Register
                    </Link>
                </div>
            </div>
        </Card>
    );
}