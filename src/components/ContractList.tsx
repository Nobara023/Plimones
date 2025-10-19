import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  Eye, 
  Search, 
  FileText, 
  Package, 
  Calendar,
  DollarSign,
  MapPin,
  Ship,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface ContractListProps {
  userRole: "admin" | "empresa";
}

export function ContractList({ userRole }: ContractListProps) {
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const contracts = [
    {
      id: "CT-2025-001",
      comprador: "FreshCitrus USA Inc.",
      pais: "Estados Unidos",
      cantidad: "15.5",
      valor: "45,000",
      puerto: "Paita",
      fecha: "2025-10-15",
      estado: "aprobado",
      incoterm: "FOB"
    },
    {
      id: "CT-2025-002",
      comprador: "European Fruits Ltd.",
      pais: "España",
      cantidad: "22.0",
      valor: "68,500",
      puerto: "Callao",
      fecha: "2025-10-20",
      estado: "proceso",
      incoterm: "CIF"
    },
    {
      id: "CT-2025-003",
      comprador: "Global Trade Partners",
      pais: "Países Bajos",
      cantidad: "18.3",
      valor: "52,000",
      puerto: "Paita",
      fecha: "2025-10-25",
      estado: "pendiente",
      incoterm: "FOB"
    }
  ];

  const filteredContracts = contracts.filter(contract =>
    contract.comprador.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return "bg-green-100 text-green-700 border-green-200";
      case "proceso":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pendiente":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return <CheckCircle className="w-4 h-4" />;
      case "proceso":
        return <Clock className="w-4 h-4" />;
      case "pendiente":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contratos de Exportación</CardTitle>
              <CardDescription>
                {userRole === "admin" 
                  ? "Todos los contratos registrados en el sistema"
                  : "Sus contratos de exportación de limones"}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredContracts.length} contratos
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por comprador o ID de contrato..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {/* Table */}
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID Contrato</TableHead>
                  <TableHead>Comprador</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{contract.comprador}</TableCell>
                    <TableCell>{contract.pais}</TableCell>
                    <TableCell>{contract.cantidad} Ton</TableCell>
                    <TableCell>${contract.valor}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(contract.estado)} flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(contract.estado)}
                        {contract.estado.charAt(0).toUpperCase() + contract.estado.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedContract(contract)}
                        className="rounded-lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No se encontraron contratos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Detail Modal */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-3xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#0d5f5f]" />
              Detalle del Contrato {selectedContract?.id}
            </DialogTitle>
            <DialogDescription>
              Información completa del contrato de exportación
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <div className="space-y-6 mt-4">
              {/* Status */}
              <div className={`p-4 rounded-xl ${getStatusColor(selectedContract.estado)}`}>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedContract.estado)}
                  <span className="font-medium">
                    Estado: {selectedContract.estado.charAt(0).toUpperCase() + selectedContract.estado.slice(1)}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <Building2 className="w-5 h-5 text-[#0d5f5f] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Comprador</p>
                    <p className="font-medium">{selectedContract.comprador}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <MapPin className="w-5 h-5 text-[#0d5f5f] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">País de Destino</p>
                    <p className="font-medium">{selectedContract.pais}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <Package className="w-5 h-5 text-[#0d5f5f] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cantidad</p>
                    <p className="font-medium">{selectedContract.cantidad} Toneladas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <DollarSign className="w-5 h-5 text-[#0d5f5f] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Valor FOB</p>
                    <p className="font-medium">${selectedContract.valor} USD</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <Ship className="w-5 h-5 text-[#0d5f5f] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Puerto de Embarque</p>
                    <p className="font-medium">{selectedContract.puerto}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                  <Calendar className="w-5 h-5 text-[#0d5f5f] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Embarque</p>
                    <p className="font-medium">{selectedContract.fecha}</p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions Accordion */}
              <div>
                <h4 className="font-medium mb-3">Términos y Condiciones</h4>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="item-1" className="border rounded-xl px-4">
                    <AccordionTrigger className="hover:no-underline">
                      Condiciones de Calidad
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Los limones deben cumplir con las normas de calidad internacional, sin daños físicos, 
                      con calibre uniforme y color característico de la variedad Sutil piurana.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-xl px-4">
                    <AccordionTrigger className="hover:no-underline">
                      Condiciones de Embalaje
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Cajas de cartón corrugado de 4.5 kg, con papel seda y ventilación adecuada. 
                      Paletización según estándares internacionales.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border rounded-xl px-4">
                    <AccordionTrigger className="hover:no-underline">
                      Condiciones de Pago
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      50% de anticipo mediante transferencia bancaria, 50% contra presentación de 
                      documentos de embarque (Bill of Lading, factura comercial, certificados).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border rounded-xl px-4">
                    <AccordionTrigger className="hover:no-underline">
                      Certificaciones Requeridas
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Certificado fitosanitario SENASA, certificado de origen, análisis de residuos de 
                      pesticidas, certificación orgánica si aplica.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Missing import
import { Building2 } from "lucide-react";
