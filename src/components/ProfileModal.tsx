import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Building2, Mail, Phone, MapPin, Calendar, Shield, User, FileText, Edit2, Save } from "lucide-react";
import { useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: "admin" | "empresa";
}

export function ProfileModal({ isOpen, onClose, userRole }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Datos del administrador
  const adminData = {
    nombre: "Carlos Mendoza Ruiz",
    email: "admin@lemonexport.com",
    rol: "Administrador General",
    telefono: "+51 987 654 321",
    departamento: "Gestión y Operaciones",
    fechaRegistro: "15 de Enero, 2024",
    permisos: ["Gestión de Contratos", "Gestión de Empresas", "Reportes SUNAT", "Configuración del Sistema"],
  };

  // Datos de la empresa
  const empresaData = {
    nombreEmpresa: "AgroExport SAC",
    ruc: "20123456789",
    representante: "María Elena Távara",
    email: "empresa@agroexport.com",
    telefono: "+51 973 123 456",
    direccion: "Av. Grau 456, Piura, Perú",
    sector: "Exportación de Cítricos",
    fechaRegistro: "20 de Marzo, 2024",
    certificaciones: ["GlobalGAP", "HACCP", "Orgánico UE"],
    contratos: 12,
  };

  const data = userRole === "admin" ? adminData : empresaData;
  const initials = userRole === "admin" ? "CM" : "AE";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Perfil de {userRole === "admin" ? "Administrador" : "Empresa"}</DialogTitle>
          <DialogDescription>
            Información y detalles de la cuenta
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar y Info Principal */}
          <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-[#0d5f5f] to-[#0a4848] rounded-xl">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-[#a3d94d] text-[#0d5f5f] text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white text-xl mb-1">
                    {userRole === "admin" ? data.nombre : empresaData.nombreEmpresa}
                  </h3>
                  <p className="text-[#c8e86f]">
                    {userRole === "admin" ? adminData.rol : empresaData.sector}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </>
                  )}
                </Button>
              </div>
              <Badge className="bg-[#a3d94d] text-[#0d5f5f] hover:bg-[#c8e86f]">
                {userRole === "admin" ? "Admin" : "Empresa Verificada"}
              </Badge>
            </div>
          </div>

          {userRole === "admin" ? (
            // Perfil de Administrador
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    Nombre Completo
                  </Label>
                  <Input
                    value={adminData.nombre}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico
                  </Label>
                  <Input
                    value={adminData.email}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  <Input
                    value={adminData.telefono}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    Departamento
                  </Label>
                  <Input
                    value={adminData.departamento}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    Rol
                  </Label>
                  <Input
                    value={adminData.rol}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Fecha de Registro
                  </Label>
                  <Input
                    value={adminData.fechaRegistro}
                    disabled
                    className="rounded-xl bg-muted"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Permisos y Accesos
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {adminData.permisos.map((permiso, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#a3d94d]"></div>
                      <span className="text-sm">{permiso}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Perfil de Empresa
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    Razón Social
                  </Label>
                  <Input
                    value={empresaData.nombreEmpresa}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    RUC
                  </Label>
                  <Input
                    value={empresaData.ruc}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    Representante Legal
                  </Label>
                  <Input
                    value={empresaData.representante}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico
                  </Label>
                  <Input
                    value={empresaData.email}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  <Input
                    value={empresaData.telefono}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Fecha de Registro
                  </Label>
                  <Input
                    value={empresaData.fechaRegistro}
                    disabled
                    className="rounded-xl bg-muted"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    Dirección
                  </Label>
                  <Input
                    value={empresaData.direccion}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Certificaciones
                  </Label>
                  <div className="space-y-2">
                    {empresaData.certificaciones.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Estadísticas</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-[#0d5f5f] rounded-xl text-center">
                      <p className="text-3xl text-white mb-1">{empresaData.contratos}</p>
                      <p className="text-xs text-[#c8e86f]">Contratos Totales</p>
                    </div>
                    <div className="p-4 bg-[#a3d94d] rounded-xl text-center">
                      <p className="text-3xl text-[#0d5f5f] mb-1">3</p>
                      <p className="text-xs text-[#0d5f5f]">Activos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
