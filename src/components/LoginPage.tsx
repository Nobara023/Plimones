import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Citrus, Lock, Mail } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de login - admin o empresa
    const role = email.includes("admin") ? "admin" : "empresa";
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d5f5f] via-[#0a4848] to-[#073939] p-4">
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 ">
            <img src="/logo-1.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-white mb-2">Limones Piuranos</h1>
          <p className="text-[#c8e86f]">Sistema de Gestión de Exportaciones</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-2xl border-none">
          <CardHeader className="space-y-1">
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingrese sus credenciales para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full rounded-xl bg-[#0d5f5f] hover:bg-[#0a4848]">
                Ingresar
              </Button>

              <div className="text-center">
                <button type="button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ¿Olvidó su contraseña?
                </button>
              </div>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Credenciales de prueba:</p>
              <p className="text-xs">Admin: admin@lemon.com</p>
              <p className="text-xs">Empresa: empresa@export.com</p>
              <br></br>
              <p className="text-xs text-muted-foreground mb-2">INGRESE CUALQUIER CONTRASEÑA PARA INICIAR SESIÓN</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-4 text-sm text-white/70">
          Limones Piuranos © 2025
        </p>
      </div>
    </div>
  );
}
