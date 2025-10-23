import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

export default function SignIn() {
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    
    script.onload = () => {
      try {
        const g = (window as any).google;
        if (g) {
          g.accounts.id.initialize({
            client_id: clientId,
            callback: (response: any) =>
              useAuthStore.getState().handleGoogleCredentialResponse(response),
          });

          g.accounts.id.renderButton(
            document.getElementById("googleBtn"),
            { theme: "outline", size: "large", shape: "pill" }
          );
        }
      } catch(error: any) {
        toast.error(error);
      };
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (    
    <Card>
      <div className="h-[400px] flex flex-col justify-between"> 
        <div>
          <h1 className="font-bold mb-16 self-start">Sign in</h1>

        </div>
        <div>
          <div id="googleBtn" className="mb-16"></div>
          <Link
              to="/login"
              className="
                  !text-white dark:!text-black
                  font-semibold transition
                  hover:!text-[#7e5bfc]
              "
              >
              Login with password
          </Link>
        </div>
      </div>
    </Card>
  );
}