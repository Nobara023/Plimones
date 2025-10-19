import { useState } from "react";
import { Button } from "./ui/button";
import { Citrus, LogOut, Plus, UserCircle } from "lucide-react";
import { ContractList } from "./ContractList";
import { NewContractWizard } from "./NewContractWizard";
import { ProfileModal } from "./ProfileModal";
import { NotificationContainer } from "./NotificationContainer";
import { SurveyModal } from "./SurveyModal";
import { Footer } from "./Footer";
import { useSurvey } from "../hooks/use-survey";

interface CompanyDashboardProps {
  onLogout: () => void;
}

export function CompanyDashboard({ onLogout }: CompanyDashboardProps) {
  const [showWizard, setShowWizard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Hook para manejar la encuesta
  const {
    showSurveyModal,
    surveyUrl,
    openSurvey,
    closeSurveyModal,
    markSurveyCompleted,
  } = useSurvey();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Contenedor de notificaciones */}
      <NotificationContainer />

      {/* Header */}
      <header className="bg-[#0d5f5f] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img src="/logo-1.png" alt="Logo" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-white">Panel de Empresa</h1>
                <p className="text-[#c8e86f] text-sm">Limones Piuranos S.A</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowWizard(true)}
                className="bg-[#a3d94d] text-[#0d5f5f] hover:bg-[#c8e86f] rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Contrato
              </Button>
              <Button 
                onClick={() => setShowProfile(true)}
                variant="outline" 
                className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-xl"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Mi Perfil
              </Button>
              <Button 
                onClick={onLogout}
                variant="outline" 
                className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 flex-1">
        {showWizard ? (
          <NewContractWizard onClose={() => setShowWizard(false)} />
        ) : (
          <ContractList userRole="empresa" />
        )}
      </div>

      {/* Footer */}
      <Footer onSurveyClick={openSurvey} />

      {/* Modales */}
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
        userRole="empresa" 
      />

      <SurveyModal
        isOpen={showSurveyModal}
        onClose={closeSurveyModal}
        onComplete={markSurveyCompleted}
        surveyUrl={surveyUrl}
      />
    </div>
  );
}
