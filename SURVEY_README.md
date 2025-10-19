# 📊 Sistema de Encuesta de Satisfacción

## 🎯 Funcionalidades Implementadas

### 1. **Notificación Automática**
- Se muestra una notificación después de **5 minutos** de uso de la aplicación
- La notificación incluye un botón de acción para abrir la encuesta directamente
- Solo se muestra una vez por día por usuario

### 2. **Modal de Encuesta**
- Modal elegante con información sobre la encuesta
- Tiempo estimado: 2-3 minutos
- Descripción de los temas que cubre la encuesta
- Botón para abrir la encuesta en una nueva pestaña
- Opción para recordar más tarde

### 3. **Footer con Botón de Encuesta**
- Botón permanente en el footer de ambos dashboards
- Permite acceder a la encuesta en cualquier momento
- Diseño consistente con la marca

### 4. **Gestión de Estado Inteligente**
- Usa localStorage para recordar el estado de la encuesta
- No vuelve a mostrar notificaciones si ya se completó la encuesta
- Control diario de notificaciones para no ser intrusivo

## 🛠️ Componentes Creados

### Hooks
- **`use-notification.ts`**: Manejo de notificaciones del sistema
- **`use-survey.ts`**: Lógica de la encuesta y temporizador

### Componentes
- **`NotificationContainer.tsx`**: Contenedor de notificaciones elegante
- **`SurveyModal.tsx`**: Modal principal de la encuesta
- **`Footer.tsx`**: Footer con botón de encuesta y links adicionales

## 🔗 URL de la Encuesta

La encuesta está disponible en: [https://forms.office.com/r/cy6uDF6SiX?origin=lprLink](https://forms.office.com/r/cy6uDF6SiX?origin=lprLink)

## ⏱️ Flujo de Usuario

1. **Usuario ingresa a la aplicación**
2. **Después de 5 minutos**: Aparece notificación automática
3. **Usuario puede**:
   - Hacer clic en "Realizar Encuesta" desde la notificación
   - Usar el botón del footer en cualquier momento
   - Ignorar la notificación (se puede recordar más tarde)
4. **Modal se abre** con información detallada
5. **Encuesta se abre** en nueva pestaña
6. **Sistema registra** que se abrió la encuesta

## 🎨 Características de Diseño

- **Colores de marca**: Verde `#0d5f5f`, Verde claro `#a3d94d`, Amarillo `#c8e86f`
- **Notificaciones no intrusivas**: Aparecen en la esquina superior derecha
- **Responsive**: Funciona en móviles y escritorio
- **Accesible**: Incluye iconos y descripciones claras
- **Persistente**: Estado guardado en localStorage

## 📱 Compatibilidad

- ✅ Dashboards de Administrador y Empresa
- ✅ Navegadores modernos
- ✅ Dispositivos móviles
- ✅ Modo claro/oscuro compatible

## 🔧 Configuración Técnica

### Temporizador
```typescript
const SURVEY_DELAY = 5 * 60 * 1000; // 5 minutos
```

### Storage Key
```typescript
const STORAGE_KEY = 'survey_status';
```

### Estados Guardados
- `hasShownNotification`: Si ya se mostró la notificación hoy
- `hasCompletedSurvey`: Si el usuario ya completó la encuesta
- `lastShownDate`: Última fecha que se mostró la notificación

## 🚀 Próximas Mejoras

- [ ] Analytics de interacción con la encuesta
- [ ] Personalización del tiempo de espera
- [ ] Múltiples encuestas por categoría
- [ ] Dashboard de resultados (solo admin)
- [ ] Recordatorios periódicos opcionales
