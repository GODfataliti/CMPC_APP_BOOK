import { Link, useNavigate } from "@tanstack/react-router"
import { Eye, EyeClosed } from "lucide-react"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import type { ResponseLogin } from "@/services/auth/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { login } from "@/services/auth/login"
import { VITE_VERSION } from "@/config"
import { sessionStore, userStore } from "@/stores"

interface Props {
  className?: string;
}

export function LoginForm(props: Props) {
  const { className } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loadUser } = userStore();
  const { loadSession } = sessionStore();
  const navigate = useNavigate();

  // --- Valida el formulario dinámicamente
  useEffect(() => {
    const isValid =
      email.trim() !== "" &&
      password.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // simple email regex
    setActive(isValid);
  }, [email, password]);

  // --- Lógica de login
  const onLogin = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    try {
      const res: ResponseLogin = await login(email, password);
      
      const { user, token } = res;
      loadSession(token, user?.email);
      loadUser(user);
      
      toast.success("Inicio de sesión exitoso");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // --- Render
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">CMPC BOOKS</h1>
                <p className="text-muted-foreground text-balance">
                  Ingreso de administradores
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ej: admin@cmpcbooks.cl"
                  autoComplete="username"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    to="/login"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*********"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={64}
                    minLength={4}
                    required
                  />
                  <span
                    className="text-muted-foreground cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                type="submit"
                onClick={onLogin}
                disabled={!active || loading}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
            </div>
          </form>

          {/* Imagen lateral */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/assets/banner_login.png"
              alt="Imagen de login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary">
                {VITE_VERSION ?? "v1.2025.11.10.1"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
