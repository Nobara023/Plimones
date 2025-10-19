import { useState } from "react";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Ship, Warehouse, Anchor, TrendingUp, Package, Truck, CheckCircle } from "lucide-react";

interface IncotermsSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const incotermsData = [
  {
    code: "EXW",
    name: "Ex Works",
    description: "El vendedor/exportador se ocupa del embalaje de la mercancía y lo pone a disposición del comprador en sus propios almacenes. El comprador/importador, es quien asume todos los gastos y responsabilidades desde que la mercancía cruza almacén, antes de cargarla.",
    icon: Warehouse,
    color: "bg-amber-500",
    vendedorResponsability: "Mínima",
    compradorResponsability: "Máxima",
    responsibilities: [
      "Vendedor: Embalar mercancía y ponerla a disposición en almacén",
      "Comprador: Todos los costos desde almacén hasta destino",
      "Comprador: Gestión de carga, transporte y trámites aduaneros"
    ]
  },
  {
    code: "FAS",
    name: "Free Alongside Ship",
    description: "El vendedor entrega la mercancía en el muelle de carga del puerto de origen y asume los gastos hasta la entrega, así como los trámites aduaneros de exportación. El comprador gestiona la carga a bordo, estiba, flete y demás gastos hasta entrega en destino, incluido el despacho de importación.",
    icon: Anchor,
    color: "bg-blue-500",
    vendedorResponsability: "Baja",
    compradorResponsability: "Alta",
    responsibilities: [
      "Vendedor: Entrega en muelle + trámites de exportación",
      "Comprador: Carga a bordo + flete + seguro",
      "Comprador: Descarga y trámites de importación"
    ]
  },
  {
    code: "FOB",
    name: "Free On Board",
    description: "El vendedor asume los gastos hasta la subida a bordo de la mercancía, momento en el que transmite también los riesgos, así como el despacho de exportación y gastos en origen. También se encarga de contratar el transporte si bien este corre por cuenta del comprador. El comprador se encarga de los costes del flete, descarga, trámites de importación y entrega en destino.",
    icon: Ship,
    color: "bg-cyan-500",
    vendedorResponsability: "Media-Baja",
    compradorResponsability: "Media-Alta",
    responsibilities: [
      "Vendedor: Carga a bordo + despacho de exportación",
      "Comprador: Flete marítimo + seguro",
      "Comprador: Descarga + trámites de importación + entrega"
    ]
  },
  {
    code: "CFR",
    name: "Cost and Freight",
    description: "El vendedor se encarga de todos los costes, incluido el transporte principal, hasta que la mercancía llegue al puerto de destino. Sin embargo, el riesgo se transfiere al comprador una vez que la mercancía está a bordo del buque.",
    icon: TrendingUp,
    color: "bg-indigo-500",
    vendedorResponsability: "Media",
    compradorResponsability: "Media",
    responsibilities: [
      "Vendedor: Carga + flete hasta puerto destino",
      "Comprador: Seguro de la mercancía",
      "Comprador: Descarga + trámites de importación"
    ]
  },
  {
    code: "CIF",
    name: "Cost Insurance Freight",
    description: "El vendedor asume todos los costes hasta que la mercancía llegue al puerto de destino, incluidos el transporte y el seguro. El riesgo se transfiere al comprador cuando la mercancía está a bordo del buque.",
    icon: Package,
    color: "bg-purple-500",
    vendedorResponsability: "Media-Alta",
    compradorResponsability: "Media-Baja",
    responsibilities: [
      "Vendedor: Carga + flete + seguro hasta destino",
      "Comprador: Descarga en puerto destino",
      "Comprador: Trámites de importación + transporte local"
    ]
  },
  {
    code: "DAP",
    name: "Delivered At Place",
    description: "El vendedor asume todos los costes y riesgos hasta entregar la mercancía en el lugar acordado en el país de destino, lista para ser descargada. El comprador se encarga de la descarga y los trámites de importación.",
    icon: Truck,
    color: "bg-green-500",
    vendedorResponsability: "Alta",
    compradorResponsability: "Baja",
    responsibilities: [
      "Vendedor: Todos los costes hasta lugar de destino",
      "Comprador: Descarga de la mercancía",
      "Comprador: Trámites de importación"
    ]
  },
  {
    code: "DDP",
    name: "Delivered Duty Paid",
    description: "El vendedor asume la máxima responsabilidad, entregando la mercancía en el lugar acordado en el país de destino, con todos los costes pagados, incluidos los trámites de importación. El comprador solo recibe la mercancía.",
    icon: CheckCircle,
    color: "bg-emerald-500",
    vendedorResponsability: "Máxima",
    compradorResponsability: "Mínima",
    responsibilities: [
      "Vendedor: Todos los costes hasta destino final",
      "Vendedor: Trámites de exportación e importación",
      "Comprador: Solo recepción de mercancía"
    ]
  }
];

export function IncotermsSelector({ value, onChange }: IncotermsSelectorProps) {
  const [selectedIncoterm, setSelectedIncoterm] = useState<string>(value);

  const handleSelect = (code: string) => {
    setSelectedIncoterm(code);
    onChange(code);
  };

  const selectedData = incotermsData.find(i => i.code === selectedIncoterm);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Seleccione el Incoterm</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {incotermsData.map((incoterm) => {
            const Icon = incoterm.icon;
            const isSelected = selectedIncoterm === incoterm.code;
            return (
              <button
                key={incoterm.code}
                type="button"
                onClick={() => handleSelect(incoterm.code)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-[#0d5f5f] bg-[#0d5f5f] text-white shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-[#a3d94d] hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-white/20" : incoterm.color
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-white"}`} />
                  </div>
                  <span className="text-xs font-medium">{incoterm.code}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Información del Incoterm seleccionado */}
      {selectedData && (
        <Card className="border-2 border-[#a3d94d] bg-gradient-to-br from-white to-green-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedData.color}`}>
                <selectedData.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  {selectedData.code} - {selectedData.name}
                </CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                    Vendedor: {selectedData.vendedorResponsability}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                    Comprador: {selectedData.compradorResponsability}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-[#0d5f5f]">Descripción</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedData.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-[#0d5f5f]">Responsabilidades</h4>
              <div className="space-y-2">
                {selectedData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3d94d] mt-2 flex-shrink-0"></div>
                    <p className="text-sm flex-1">{resp}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d5f5f]/5 p-4 rounded-lg border-l-4 border-[#0d5f5f]">
              <p className="text-xs text-[#0d5f5f] font-medium">
                💡 El punto de transferencia de riesgo es clave para determinar quién asume la responsabilidad en caso de daños o pérdida de la mercancía.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
