import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, LogIn } from "lucide-react";

import { apiService } from "../../lib/api";
import type { RegisterRequest } from "../../lib/types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useAuthStore } from "../store/useAuthStore";

export default function Register() {
    const { register } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const req: RegisterRequest = { name: name, email: email, password: password }

        try {
            await register(req);
            setEmail("");
            setPassword("");
            setName("");
            window.location.href = "/";
        } catch (err: any) {
            if (err.message === 'Bad Request') {
                toast.error("All fields are required");
            } else if (err.message === 'Unprocessable Content') {
                toast.error("Check the fields and try again.")
            } else toast.error("Failed to register. Try again.");
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
                <h1 className="font-bold mb-4 self-start">Register</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4"
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="
                            w-full px-4 py-2 rounded-lg
                            border border-[#1b1b3a]/30 dark:border-[#1b1b3a]/20
                            bg-[#DEFEF7]
                            text-black
                            placeholder:text-gray-500
                            focus:border-[#7b5cf0] focus:ring-2 focus:ring-[#7b5cf0]/30
                            outline-none transition
                        "
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="
                            w-full px-4 py-2 rounded-lg
                            border border-[#1b1b3a]/30 dark:border-[#1b1b3a]/20
                            bg-[#DEFEF7]
                            text-black
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
                            border border-[#1b1b3a]/30 dark:border-[#1b1b3a]/20
                            bg-[#DEFEF7]
                            text-black
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
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
                <div className="w-full">
                    <p className="font-bold">Already have an account? </p>
                    <Link
                        to="/login"
                        className="
                            !text-white dark:!text-black
                            font-semibold transition
                            hover:!text-[#7e5bfc]
                        "
                        >
                        Login
                    </Link>
                </div>
            </div>
        </Card>
    );
}