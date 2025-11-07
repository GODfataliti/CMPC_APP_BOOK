import { Link, useNavigate } from "@tanstack/react-router"
import { Eye, EyeClosed } from "lucide-react"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import type { ChangeEvent,  FormEvent } from "react"
import type { ResponseLogin } from "@/services/auth/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatRut } from '@/utils'
import { Badge } from "@/components/ui/badge"
import { login } from '@/services/auth/login'
import { VITE_VERSION } from '@/config'
import { sessionStore, userStore } from "@/stores"


interface Props {
  className?: string;
}

export function LoginForm(props: Props) {
  // 1. Variables
  const { className } = props;
  const [rut, setRut] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [active, setActive] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loadUser } = userStore();
  const { loadSession } = sessionStore();

  const navigate = useNavigate()

  // 2. Ciclo de vida.
  useEffect(() => {
    const validations = [
      rut !== null,
      rut !== undefined,
      rut !== "",

      pass !== null,
      pass !== undefined,
      pass !== "",
    ];

    if (validations.includes(false)) {
      setActive(false);
      return;
    } else {
      setActive(true);
    }

    // Cleaner
    return () => { };
  }, [rut, pass]);

  // 3. Metodos.
  const onInputRut = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    formatRut(target);
  }

  const onChangeRut = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const cleanRUT = value.replace(/[^\dKk-]/g, "");
    setRut(cleanRUT);
  }

  const onLogin = async () => {
    setLoading(true);

    await login(rut, pass)
      .then((res: ResponseLogin) => {
        toast.success('Inicio de sesión exitoso');
        const { data } = res;

        loadSession(data.token, data.RUT);
        loadUser(data);
        // -- Redirigir al dashboard.
        navigate({
          to: '/dashboard',
        })
      })
      .catch((err: Error) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false))

  }

  // 4. Render.
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">CMPC BOOKS</h1>
                <p className="text-muted-foreground text-balance">
                  Ingreso administradores
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">RUT</Label>
                <Input
                  id="RUT"
                  type="text"
                  placeholder="Ej: 12345678-9"
                  autoComplete="username"
                  onInput={onInputRut}
                  onChange={onChangeRut}
                  maxLength={12}
                  minLength={2}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    // to="/forgot-pass"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*********"
                    security="true"
                    autoComplete="new-password"
                    onChange={(e) => setPass(e.target.value)}
                    maxLength={32}
                    minLength={4}
                    required>
                  </Input>
                  <span
                    className="text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </span>
                </div>
              </div>
              <Button className="w-full" onClick={onLogin} disabled={!active || loading}>
                Ingresar
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/assets/banner_login.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="absolute bottom-2 right-2 ">
              <Badge variant="secondary">{VITE_VERSION ?? 'v1.2025.11.10.1'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
