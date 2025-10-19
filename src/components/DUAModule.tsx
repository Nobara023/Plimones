"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { FileText, Upload, CheckCircle, AlertCircle, Send, Download, Shield, Clock } from "lucide-react"
import { toast } from "sonner"

interface DUAModuleProps {
  contractData: any
}

export function DUAModule({ contractData }: DUAModuleProps) {
  const [duaStatus, setDuaStatus] = useState<"draft" | "validating" | "approved">("draft")
  const [showSunatModal, setShowSunatModal] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleValidateSunat = () => {
    setShowSunatModal(true)
    setDuaStatus("validating")

    // Simulación de validación SUNAT
    setTimeout(() => {
      setDuaStatus("approved")
      toast.success("DUA validado exitosamente por SUNAT")
      setShowSunatModal(false)
    }, 3000)
  }

  const handleOpenUploadModal = (documentName: string) => {
    setSelectedDocument(documentName)
    setSelectedFile(null)
    setUploadModalOpen(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        toast.success("Archivo PDF seleccionado correctamente")
      } else {
        toast.error("Solo se permiten archivos PDF")
        event.target.value = ""
      }
    }
  }

  const handleUploadFile = () => {
    if (selectedFile) {
      toast.success(`${selectedDocument} subido exitosamente`)
      setUploadModalOpen(false)
      setSelectedFile(null)
      setSelectedDocument("")
    } else {
      toast.error("Por favor seleccione un archivo PDF")
    }
  }

  const duaSections = [
    {
      id: "section1",
      title: "1. Datos del Exportador",
      fields: [
        { label: "RUC", value: "20123456789", required: true },
        { label: "Razón Social", value: "AgroExport SAC", required: true },
        { label: "Dirección", value: "Av. Grau 123, Piura", required: true },
        { label: "Teléfono", value: "+51 073 123456", required: false },
      ],
    },
    {
      id: "section2",
      title: "2. Datos del Importador",
      fields: [
        { label: "Nombre/Razón Social", value: contractData.comprador || "", required: true },
        { label: "País", value: contractData.pais || "", required: true },
        { label: "Dirección", value: "123 Main Street", required: true },
      ],
    },
    {
      id: "section3",
      title: "3. Datos de la Mercancía",
      fields: [
        { label: "Descripción", value: contractData.descripcion || "Limones frescos", required: true },
        { label: "Cantidad", value: `${contractData.cantidad || "0"} Ton`, required: true },
        { label: "Valor FOB", value: `$${contractData.precio || "0"}`, required: true },
        { label: "Partida Arancelaria", value: "0805.50.20.00", required: true },
      ],
    },
    {
      id: "section4",
      title: "4. Datos del Transporte",
      fields: [
        { label: "Puerto de Embarque", value: contractData.puerto || "", required: true },
        { label: "Fecha de Embarque", value: contractData.fechaEmbarque || "", required: true },
        { label: "Incoterm", value: contractData.incoterm || "", required: true },
        { label: "Tipo de Transporte", value: "Marítimo", required: true },
      ],
    },
  ]

  const documents = [
    { name: "Factura Comercial", status: "uploaded", icon: FileText },
    { name: "Packing List", status: "uploaded", icon: FileText },
    { name: "Certificado Fitosanitario", status: "uploaded", icon: Shield },
    { name: "Certificado de Origen", status: "pending", icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div
        className={`p-4 rounded-xl flex items-center gap-3 ${
          duaStatus === "approved"
            ? "bg-green-50 border-2 border-green-200"
            : duaStatus === "validating"
              ? "bg-blue-50 border-2 border-blue-200"
              : "bg-yellow-50 border-2 border-yellow-200"
        }`}
      >
        {duaStatus === "approved" ? (
          <CheckCircle className="w-6 h-6 text-green-600" />
        ) : duaStatus === "validating" ? (
          <Clock className="w-6 h-6 text-blue-600 animate-spin" />
        ) : (
          <AlertCircle className="w-6 h-6 text-yellow-600" />
        )}
        <div className="flex-1">
          <p className="font-medium">
            {duaStatus === "approved"
              ? "DUA Validado por SUNAT"
              : duaStatus === "validating"
                ? "Validando con SUNAT..."
                : "Borrador - Pendiente de Validación"}
          </p>
          <p className="text-sm text-muted-foreground">
            {duaStatus === "approved"
              ? "Número de DUA: 123-2025-10-001234"
              : duaStatus === "validating"
                ? "Conectando con sistema SUNAT..."
                : "Complete los datos y valide con SUNAT"}
          </p>
        </div>
        {duaStatus === "approved" && <Badge className="bg-green-600 text-white">Aprobado</Badge>}
      </div>

      {/* DUA Form Sections */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Declaración Única de Aduanas (DUA)
          </CardTitle>
          <CardDescription>Complete la información requerida por SUNAT</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {duaSections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-xl px-4 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0d5f5f] text-white rounded-full flex items-center justify-center text-sm">
                      {section.id.replace("section", "")}
                    </div>
                    <span className="font-medium">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map((field, idx) => (
                      <div key={idx} className="space-y-2">
                        <Label className="flex items-center gap-1">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                          defaultValue={field.value}
                          className="rounded-xl"
                          placeholder={`Ingrese ${field.label.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Documentos Adjuntos</CardTitle>
          <CardDescription>Documentos requeridos para la exportación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${doc.status === "uploaded" ? "bg-green-100" : "bg-gray-100"}`}>
                    <doc.icon className={`w-5 h-5 ${doc.status === "uploaded" ? "text-green-600" : "text-gray-600"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.status === "uploaded" ? "Subido" : "Pendiente"}
                    </p>
                  </div>
                </div>
                {doc.status === "uploaded" ? (
                  <Button size="sm" variant="ghost" className="rounded-lg">
                    <Download className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg bg-transparent"
                    onClick={() => handleOpenUploadModal(doc.name)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SUNAT Integration */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#0d5f5f] to-[#0a4848] rounded-xl">
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium">Validación SUNAT</h4>
            <p className="text-sm text-white/80">Enviar DUA al sistema de aduanas</p>
          </div>
        </div>
        <Button
          onClick={handleValidateSunat}
          disabled={duaStatus === "approved"}
          className="bg-[#a3d94d] text-[#0d5f5f] hover:bg-[#c8e86f] rounded-xl"
        >
          {duaStatus === "approved" ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Validado
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Validar con SUNAT
            </>
          )}
        </Button>
      </div>

      {/* SUNAT Validation Modal */}
      <Dialog open={showSunatModal} onOpenChange={setShowSunatModal}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#0d5f5f]" />
              Validación SUNAT
            </DialogTitle>
            <DialogDescription>Conectando con el sistema de aduanas...</DialogDescription>
          </DialogHeader>
          <div className="py-8 space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600 animate-spin" />
              <p className="text-sm">Verificando datos del exportador...</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600 animate-spin" />
              <p className="text-sm">Validando partida arancelaria...</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600 animate-spin" />
              <p className="text-sm">Confirmando documentos...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Document Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-6 h-6 text-[#0d5f5f]" />
              Subir Documento
            </DialogTitle>
            <DialogDescription>
              Seleccione un archivo PDF para: <span className="font-medium">{selectedDocument}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-upload" className="text-sm font-medium">
                Archivo PDF
              </Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0d5f5f] file:text-white hover:file:bg-[#0a4848]"
              />
              <p className="text-xs text-muted-foreground">Solo se permiten archivos en formato PDF (máximo 10MB)</p>
            </div>

            {selectedFile && (
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in-50">
                <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-green-900 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-green-700">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setUploadModalOpen(false)
                setSelectedFile(null)
              }}
              className="rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUploadFile}
              disabled={!selectedFile}
              className="bg-[#0d5f5f] text-white hover:bg-[#0a4848] rounded-xl disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Subir Archivo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
