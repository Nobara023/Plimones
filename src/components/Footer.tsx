import { MessageSquare, Heart, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  onSurveyClick: () => void;
}

export function Footer({ onSurveyClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo y descripción */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/logo-1.png" alt="Logo" className="w-6 h-6" />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Sistema de Gestión Limones Piuranos</p>
              <p className="text-xs">© {currentYear} - Todos los derechos reservados</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onSurveyClick}
              variant="outline"
              size="sm"
              className="border-[#0d5f5f]/20 text-[#0d5f5f] hover:bg-[#0d5f5f]/5 hover:border-[#0d5f5f]/40 transition-all duration-200 group"
            >
              <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Encuesta de Satisfacción
              <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
            </Button>
            
            <div className="hidden md:flex items-center gap-1 text-xs text-gray-500">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-500 animate-pulse" />
              <span>en Piura</span>
            </div>
          </div>
        </div>

        {/* Links adicionales */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-[#0d5f5f] transition-colors">
              Política de Privacidad
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-[#0d5f5f] transition-colors">
              Términos de Servicio
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-[#0d5f5f] transition-colors">
              Soporte Técnico
            </a>
            <span className="hidden md:inline">•</span>
            <span className="text-[#0d5f5f] font-medium">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
