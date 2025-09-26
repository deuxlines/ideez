import { useEffect } from "react";
import { apiService } from "../../lib/api";
import Card from "../components/Card";

export default function Login() {
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const g = (window as any).google;
      if (g) {
        g.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) =>
            apiService.handleGoogleCredentialResponse(response),
        });

        g.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          { theme: "outline", size: "large" }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Card>
      <h1 className="font-bold mb-16 self-start">Login</h1>
      <div id="googleBtn" className=""></div>
    </Card>
  );
}

