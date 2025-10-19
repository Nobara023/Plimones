import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { 
  CheckCircle, 
  FileText, 
  Building2, 
  Package, 
  Ship, 
  FileCheck,
  ChevronRight,
  X
} from "lucide-react";
import { DUAModule } from "./DUAModule";
import { IncotermsSelector } from "./IncotermsSelector";

interface NewContractWizardProps {
  onClose: () => void;
}

export function NewContractWizard({ onClose }: NewContractWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    comprador: "",
    pais: "",
    cantidad: "",
    precio: "",
    incoterm: "",
    puerto: "",
    fechaEmbarque: "",
    descripcion: ""
  });

  const steps = [
    { number: 1, title: "Información Básica", icon: FileText },
    { number: 2, title: "Detalles de Exportación", icon: Package },
    { number: 3, title: "Términos y Condiciones", icon: FileCheck },
    { number: 4, title: "Módulo DUA", icon: Ship }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Stepper Lateral */}
      <div className="lg:col-span-1">
        <Card className="border-none shadow-lg sticky top-6">
          <CardHeader>
            <CardTitle>Progreso</CardTitle>
            <CardDescription>Paso {currentStep} de {steps.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    step.number === currentStep
                      ? "bg-[#a3d94d] text-[#0d5f5f]"
                      : step.number < currentStep
                      ? "bg-green-50 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.number === currentStep
                      ? "bg-[#0d5f5f] text-white"
                      : step.number < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}>
                    {step.number < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario Principal */}
      <div className="lg:col-span-3">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Nuevo Contrato de Exportación</CardTitle>
                <CardDescription>Complete la información requerida</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Step 1: Información Básica */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="comprador">Comprador</Label>
                    <Input
                      id="comprador"
                      placeholder="Nombre de la empresa compradora"
                      value={formData.comprador}
                      onChange={(e) => handleInputChange("comprador", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pais">País de Destino</Label>
                    <Select onValueChange={(value) => handleInputChange("pais", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Seleccione país" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">Estados Unidos</SelectItem>
                        <SelectItem value="spain">España</SelectItem>
                        <SelectItem value="uk">Reino Unido</SelectItem>
                        <SelectItem value="netherlands">Países Bajos</SelectItem>
                        <SelectItem value="germany">Alemania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción del Producto</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Limones Piuranos - Variedad Sutil..."
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="rounded-xl min-h-24"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Detalles de Exportación */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cantidad">Cantidad (Toneladas)</Label>
                    <Input
                      id="cantidad"
                      type="number"
                      placeholder="0.00"
                      value={formData.cantidad}
                      onChange={(e) => handleInputChange("cantidad", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio Total (USD)</Label>
                    <Input
                      id="precio"
                      type="number"
                      placeholder="0.00"
                      value={formData.precio}
                      onChange={(e) => handleInputChange("precio", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Selector de Incoterms con descripciones */}
                <IncotermsSelector 
                  value={formData.incoterm}
                  onChange={(value) => handleInputChange("incoterm", value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="puerto">Puerto de Embarque</Label>
                    <Select onValueChange={(value) => handleInputChange("puerto", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Seleccione puerto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="callao">Puerto del Callao</SelectItem>
                        <SelectItem value="paita">Puerto de Paita</SelectItem>
                        <SelectItem value="matarani">Puerto de Matarani</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaEmbarque">Fecha Estimada de Embarque</Label>
                    <Input
                      id="fechaEmbarque"
                      type="date"
                      value={formData.fechaEmbarque}
                      onChange={(e) => handleInputChange("fechaEmbarque", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Términos y Condiciones */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#a3d94d]/10 to-[#0d5f5f]/10 p-6 rounded-xl border-2 border-dashed border-[#a3d94d]">
                  <div className="flex items-start gap-3 mb-4">
                    <FileCheck className="w-6 h-6 text-[#0d5f5f] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-2">Resumen del Contrato</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Comprador:</strong> {formData.comprador || "No especificado"}</p>
                        <p><strong>Destino:</strong> {formData.pais || "No especificado"}</p>
                        <p><strong>Cantidad:</strong> {formData.cantidad || "0"} toneladas</p>
                        <p><strong>Valor:</strong> ${formData.precio || "0"} USD</p>
                        <p><strong>Incoterm:</strong> {formData.incoterm || "No especificado"}</p>
                        <p><strong>Puerto:</strong> {formData.puerto || "No especificado"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Cláusulas y Condiciones</Label>
                  <div className="space-y-3">
                    {[
                      "El producto debe cumplir con las normas fitosanitarias internacionales",
                      "Empaque en cajas de cartón corrugado de 4.5 kg",
                      "Temperatura de conservación entre 10-13°C durante el transporte",
                      "Pago 50% anticipo, 50% contra documentos de embarque",
                      "Certificación orgánica y de origen requerida"
                    ].map((clause, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{clause}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Módulo DUA */}
            {currentStep === 4 && (
              <DUAModule contractData={formData} />
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="rounded-xl"
              >
                Anterior
              </Button>
              <div className="flex items-center gap-2">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`w-2 h-2 rounded-full transition-all ${
                      step.number === currentStep
                        ? "bg-[#0d5f5f] w-8"
                        : step.number < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="bg-[#0d5f5f] hover:bg-[#0a4848] rounded-xl">
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={onClose} className="bg-[#a3d94d] text-[#0d5f5f] hover:bg-[#c8e86f] rounded-xl">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
