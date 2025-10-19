import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  BarChart3, 
  FileText, 
  Building2, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Citrus,
  LogOut,
  Users,
  DollarSign,
  UserCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ContractList } from "./ContractList";
import { CompanyList } from "./CompanyList";
import { ProfileModal } from "./ProfileModal";
import { NotificationContainer } from "./NotificationContainer";
import { SurveyModal } from "./SurveyModal";
import { Footer } from "./Footer";
import { useSurvey } from "../hooks/use-survey";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfile, setShowProfile] = useState(false);
  
  // Hook para manejar la encuesta
  const {
    showSurveyModal,
    surveyUrl,
    openSurvey,
    closeSurveyModal,
    markSurveyCompleted,
  } = useSurvey();

  const stats = [
    {
      title: "Contratos Activos",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "bg-[#a3d94d]",
      textColor: "text-[#0d5f5f]"
    },
    {
      title: "Empresas Registradas",
      value: "8",
      change: "+2",
      icon: Building2,
      color: "bg-[#0d5f5f]",
      textColor: "text-white"
    },
    {
      title: "Exportaciones Mes",
      value: "45 Ton",
      change: "+8%",
      icon: Package,
      color: "bg-[#c8e86f]",
      textColor: "text-[#0d5f5f]"
    },
    {
      title: "Valor Total",
      value: "$325K",
      change: "+15%",
      icon: DollarSign,
      color: "bg-[#0d5f5f]",
      textColor: "text-white"
    }
  ];

  const recentActivity = [
    { id: 1, empresa: "AgroExport SAC", accion: "Nuevo contrato creado", estado: "pendiente", tiempo: "Hace 2 horas" },
    { id: 2, empresa: "Limones del Norte", accion: "DUA enviado a SUNAT", estado: "proceso", tiempo: "Hace 4 horas" },
    { id: 3, empresa: "CitrusExport Peru", accion: "Contrato aprobado", estado: "aprobado", tiempo: "Hace 6 horas" },
    { id: 4, empresa: "Valle Verde Export", accion: "Documentación completada", estado: "aprobado", tiempo: "Hace 1 día" },
  ];

  // Datos para gráfico de barras
  const barChartData = [
    { mes: "Jun", contratos: 15, exportaciones: 32 },
    { mes: "Jul", contratos: 19, exportaciones: 38 },
    { mes: "Ago", contratos: 17, exportaciones: 35 },
    { mes: "Sep", contratos: 21, exportaciones: 42 },
    { mes: "Oct", contratos: 24, exportaciones: 45 },
  ];

  // Datos para gráfico circular
  const pieChartData = [
    { name: "Aprobados", value: 18, color: "#22c55e" },
    { name: "En Proceso", value: 4, color: "#3b82f6" },
    { name: "Pendientes", value: 2, color: "#eab308" },
  ];

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
                <h1 className="text-white">Panel de Administrador</h1>
                <p className="text-[#c8e86f] text-sm">Sistema de Gestión Limones Piuranos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} ${stat.textColor} p-3 rounded-xl`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-md rounded-xl p-1">
            <TabsTrigger 
              value="overview" 
              className={`rounded-lg transition-all duration-200 hover:bg-gray-100 relative ${
                activeTab === "overview" 
                  ? "bg-[#0d5f5f]/20 text-[#0d5f5f] shadow-lg font-semibold border-2 border-[#0d5f5f]/30" 
                  : "text-black-700"
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Vista General
            </TabsTrigger>
            <TabsTrigger 
              value="contracts" 
              className={`rounded-lg transition-all duration-200 hover:bg-gray-100 relative ${
                activeTab === "contracts" 
                  ? "bg-[#0d5f5f]/20 text-[#0d5f5f] shadow-lg font-semibold border-2 border-[#0d5f5f]/30" 
                  : "text-black-700"
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Contratos
            </TabsTrigger>
            <TabsTrigger 
              value="companies" 
              className={`rounded-lg transition-all duration-200 hover:bg-gray-100 relative ${
                activeTab === "companies" 
                  ? "bg-[#0d5f5f]/20 text-[#0d5f5f] shadow-lg font-semibold border-2 border-[#0d5f5f]/30" 
                  : "text-black-700"
              }`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Empresas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Actividad Reciente */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                      <div className={`p-2 rounded-lg ${
                        activity.estado === "aprobado" ? "bg-green-100" :
                        activity.estado === "proceso" ? "bg-blue-100" :
                        "bg-yellow-100"
                      }`}>
                        {activity.estado === "aprobado" ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                         activity.estado === "proceso" ? <Clock className="w-5 h-5 text-blue-600" /> :
                         <AlertCircle className="w-5 h-5 text-yellow-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{activity.empresa}</p>
                        <p className="text-sm text-muted-foreground">{activity.accion}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.tiempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Barras */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Tendencia de Contratos</CardTitle>
                  <CardDescription>Últimos 5 meses</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="mes" 
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280' }}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280' }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="contratos" 
                        fill="#0d5f5f" 
                        name="Contratos"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar 
                        dataKey="exportaciones" 
                        fill="#a3d94d" 
                        name="Exportaciones (Ton)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico Circular */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Estadísticas del Mes</CardTitle>
                  <CardDescription>Octubre 2025</CardDescription>
                </CardHeader>
                <CardContent className="h-72 flex flex-col items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={50}
                        paddingAngle={3}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          `${value} contratos`,
                          name,
                        ]}
                        contentStyle={{
                          borderRadius: "10px",
                          border: "none",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts">
            <ContractList userRole="admin" />
          </TabsContent>

          <TabsContent value="companies">
            <CompanyList />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer onSurveyClick={openSurvey} />

      {/* Modales */}
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
        userRole="admin" 
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
