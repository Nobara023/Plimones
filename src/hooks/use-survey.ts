import { useState, useEffect, useCallback } from 'react';
import { useNotification } from './use-notification';

const SURVEY_URL = 'https://forms.office.com/r/cy6uDF6SiX?origin=lprLink';
const SURVEY_DELAY = 5 * 60 * 1000; // 5 minutos en millisegundos
const STORAGE_KEY = 'survey_status';

interface SurveyStatus {
  hasShownNotification: boolean;
  hasCompletedSurvey: boolean;
  lastShownDate: string;
}

export function useSurvey() {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { addNotification } = useNotification();

  // Obtener estado del localStorage
  const getSurveyStatus = useCallback((): SurveyStatus => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error al obtener estado de encuesta:', error);
    }
    
    return {
      hasShownNotification: false,
      hasCompletedSurvey: false,
      lastShownDate: '',
    };
  }, []);

  // Guardar estado en localStorage
  const setSurveyStatus = useCallback((status: Partial<SurveyStatus>) => {
    try {
      const current = getSurveyStatus();
      const updated = { ...current, ...status };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error al guardar estado de encuesta:', error);
    }
  }, [getSurveyStatus]);

  // Verificar si debe mostrar la encuesta hoy
  const shouldShowSurveyToday = useCallback(() => {
    const status = getSurveyStatus();
    const today = new Date().toDateString();
    
    return !status.hasCompletedSurvey && 
           (!status.hasShownNotification || status.lastShownDate !== today);
  }, [getSurveyStatus]);

  // Mostrar notificación de encuesta
  const showSurveyNotification = useCallback(() => {
    if (!shouldShowSurveyToday()) return;

    addNotification({
      title: '📝 Encuesta de Satisfacción',
      message: 'Nos gustaría conocer tu opinión sobre nuestra plataforma. ¡Solo te tomará unos minutos!',
      type: 'info',
      duration: 10000, // 10 segundos
      action: {
        label: 'Realizar Encuesta',
        onClick: () => setShowSurveyModal(true),
      },
    });

    setSurveyStatus({
      hasShownNotification: true,
      lastShownDate: new Date().toDateString(),
    });
  }, [addNotification, setSurveyStatus, shouldShowSurveyToday]);

  // Abrir encuesta manualmente
  const openSurvey = useCallback(() => {
    setShowSurveyModal(true);
  }, []);

  // Cerrar modal de encuesta
  const closeSurveyModal = useCallback(() => {
    setShowSurveyModal(false);
  }, []);

  // Marcar encuesta como completada
  const markSurveyCompleted = useCallback(() => {
    setSurveyStatus({
      hasCompletedSurvey: true,
      lastShownDate: new Date().toDateString(),
    });
    setShowSurveyModal(false);
  }, [setSurveyStatus]);

  // Efecto para el temporizador
  useEffect(() => {
    if (!shouldShowSurveyToday()) return;

    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimeElapsed(elapsed);
      
      if (elapsed >= SURVEY_DELAY) {
        showSurveyNotification();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showSurveyNotification, shouldShowSurveyToday]);

  return {
    showSurveyModal,
    timeElapsed,
    surveyUrl: SURVEY_URL,
    openSurvey,
    closeSurveyModal,
    markSurveyCompleted,
    shouldShowSurveyToday: shouldShowSurveyToday(),
  };
}
