import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAdminUser } from "@/contexts/AdminUserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { login } = useAdminUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.status) {
        login({
          id: data.admin.id,
          name: data.admin.name,
          email: data.admin.email,
          permissions: data.admin.permissions,
          isSuper: data.admin.isSuper,
          token: data.token,
        });
        setSuccessMsg(`Welcome Back ${data.admin.name}`);

        // Redirect after 300ms
        setTimeout(() => {
          navigate("/");
        }, 300);
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Server error:", err);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-semibold text-lg">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <img
                src="/chrome-512x512.png"
                alt="Logo"
                className="size-10 object-contain"
              />
            </div>
            TasteNest
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <form
            className={cn("flex flex-col gap-6 w-full max-w-xs")}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Admin Portal</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Sign in with your admin credentials to manage the system
              </p>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 text-sm rounded-md"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your admin password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 text-sm rounded-md"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="border border-red-300 rounded-md p-3">
                  <p className="text-red-300 text-sm font-light">{error}</p>
                </div>
              )}

              {/* Success login Message */}
              {successMsg && (
                <div className="border border-green-200 rounded-md p-3">
                  <p className="text-green-200 text-sm font-light">{successMsg}</p>
                </div>
              )}

              <Button type="submit" className="w-full">
                Login as Admin
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
        />
      </div>
    </div>
  );
}
