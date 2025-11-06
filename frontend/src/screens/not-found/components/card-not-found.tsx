import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function CardNotFound({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 items-center">
          <form className="p-4 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start text-center gap-5">
                <Label className="text-left text-8xl font-bold">404</Label>
                <Label className="text-left text-2xl font-bold">Oops!</Label>
                <p className="text-left text-muted-foreground">
                  Página no encontrada. Por favor, verifica la URL o regresa a la página de inicio.
                </p>
              </div>

              <Link to="/" preload={false}>
                <Button className="w-full">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </form>
          <div className="relative hidden md:block rounded-lg px-4">
            <img
              src="/assets/not_found.png"
              alt="Image 404"
              width={200}
              height={400}
              className="h-full w-full rounded-lg dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
