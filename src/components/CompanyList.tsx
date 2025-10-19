import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  Clock
} from "lucide-react";

export function CompanyList() {
  const [searchQuery, setSearchQuery] = useState("");

  const companies = [
    {
      id: 1,
      nombre: "AgroExport SAC",
      ruc: "20123456789",
      ciudad: "Piura",
      telefono: "+51 073 123456",
      email: "contacto@agroexport.pe",
      contratos: 8,
      estado: "activo"
    },
    {
      id: 2,
      nombre: "Limones del Norte EIRL",
      ruc: "20234567890",
      ciudad: "Sullana",
      telefono: "+51 073 234567",
      email: "ventas@limonesdelnorte.pe",
      contratos: 5,
      estado: "activo"
    },
    {
      id: 3,
      nombre: "CitrusExport Peru SAC",
      ruc: "20345678901",
      ciudad: "Piura",
      telefono: "+51 073 345678",
      email: "info@citrusexport.pe",
      contratos: 12,
      estado: "activo"
    },
    {
      id: 4,
      nombre: "Valle Verde Export",
      ruc: "20456789012",
      ciudad: "Tambogrande",
      telefono: "+51 073 456789",
      email: "export@valleverde.pe",
      contratos: 3,
      estado: "pendiente"
    },
    {
      id: 5,
      nombre: "FreshLemon International",
      ruc: "20567890123",
      ciudad: "Piura",
      telefono: "+51 073 567890",
      email: "sales@freshlemon.pe",
      contratos: 6,
      estado: "activo"
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.ruc.includes(searchQuery)
  );

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Empresas Exportadoras</CardTitle>
            <CardDescription>
              Gestión de empresas registradas en el sistema
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {filteredCompanies.length} empresas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o RUC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 bg-[#0d5f5f]">
                    <AvatarFallback className="bg-[#0d5f5f] text-white">
                      {company.nombre.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium truncate">{company.nombre}</h4>
                      <Badge 
                        variant="outline" 
                        className={`${
                          company.estado === "activo" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        } flex items-center gap-1`}
                      >
                        {company.estado === "activo" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {company.estado.charAt(0).toUpperCase() + company.estado.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">RUC: {company.ruc}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {company.ciudad}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {company.telefono}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {company.email}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Contratos</p>
                        <p className="text-lg font-semibold text-[#0d5f5f]">{company.contratos}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No se encontraron empresas</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
