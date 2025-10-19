import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Star, Clock, Gift, Copy, Check } from 'lucide-react';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  surveyUrl: string;
}

export function SurveyModal({ isOpen, onClose, onComplete, surveyUrl }: SurveyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenSurvey = (e?: React.MouseEvent) => {
    // Prevenir cualquier comportamiento por defecto
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsLoading(true);
    
    try {
      // Intentar abrir la encuesta en una nueva pestaña
      const newWindow = window.open(surveyUrl, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        // La ventana se abrió exitosamente
        newWindow.focus();
        setTimeout(() => {
          setIsLoading(false);
          onComplete();
        }, 1500);
      } else {
        // El popup fue bloqueado, mostrar mensaje al usuario
        setIsLoading(false);
        alert('Por favor, permite las ventanas emergentes para abrir la encuesta en una nueva pestaña. También puedes copiar el enlace: ' + surveyUrl);
      }
    } catch (error) {
      // Error al abrir la ventana
      setIsLoading(false);
      console.error('Error al abrir la encuesta:', error);
      
      // Copiar URL al portapapeles como alternativa
      if (navigator.clipboard) {
        navigator.clipboard.writeText(surveyUrl).then(() => {
          alert('No se pudo abrir la encuesta automáticamente. El enlace se ha copiado al portapapeles.');
        }).catch(() => {
          alert('Por favor, copia manualmente este enlace: ' + surveyUrl);
        });
      } else {
        alert('Por favor, copia manualmente este enlace: ' + surveyUrl);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(surveyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = surveyUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error con fallback de copia:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#0d5f5f] to-[#a3d94d] rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <DialogTitle className="text-lg font-semibold">Encuesta de Satisfacción</DialogTitle>
            </div>
            <Badge variant="secondary" className="bg-[#c8e86f]/20 text-[#0d5f5f] border-[#a3d94d]/30">
              <Gift className="w-3 h-3 mr-1" />
              ¡Gratis!
            </Badge>
          </div>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Tu opinión es muy importante para nosotros. Ayúdanos a mejorar nuestra plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Card className="border-none bg-gradient-to-r from-[#0d5f5f]/5 to-[#a3d94d]/10">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-[#0d5f5f]" />
                  <span>Tiempo estimado: <strong>2-3 minutos</strong></span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-800">La encuesta incluye:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#a3d94d] rounded-full"></div>
                      Facilidad de uso de la plataforma
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#a3d94d] rounded-full"></div>
                      Funcionalidades más útiles
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#a3d94d] rounded-full"></div>
                      Sugerencias de mejora
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>💡 Tu feedback nos ayuda a:</strong> Mejorar la experiencia de usuario, 
              añadir nuevas funcionalidades y optimizar los procesos de exportación.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleOpenSurvey}
            disabled={isLoading}
            type="button"
            className="w-full bg-gradient-to-r from-[#0d5f5f] to-[#0d5f5f]/90 hover:from-[#0d5f5f]/90 hover:to-[#0d5f5f] text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Abriendo encuesta...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Realizar Encuesta
              </>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="flex-1 border-[#0d5f5f]/20 text-[#0d5f5f] hover:bg-[#0d5f5f]/5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Enlace
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Recordar más tarde
            </Button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            Esta encuesta es completamente anónima y opcional
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
