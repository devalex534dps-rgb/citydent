import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Agenda from '@/pages/Agenda';
import Estadisticas from '@/pages/Estadisticas';
import Cuenta from '@/pages/Cuenta';
import Configuracion from '@/pages/Configuracion';
import SolicitudesUrgentes from '@/pages/SolicitudesUrgentes';
import Busqueda from '@/pages/Busqueda';
import Notificaciones from '@/pages/Notificaciones';
import Login from '@/pages/Login';
import ProximasCitas from '@/pages/ProximasCitas';
import ReporteIngresos from '@/pages/ReporteIngresos';
import TratamientosPopulares from '@/pages/TratamientosPopulares';
import NuevaCitaModal from '@/components/NuevaCitaModal';

const STITCH_NOTIFICATIONS = [
  {
    id: 'notif-1',
    section: 'HOY',
    type: 'urgent',
    dotColor: 'red',
    unread: true,
    title: 'Solicitud Urgente',
    time: 'Hace 10 min',
    description:
      'El paciente Juan Pérez requiere atención inmediata por dolor agudo. Por favor revisar agenda.',
  },
  {
    id: 'notif-2',
    section: 'HOY',
    type: 'appointment',
    dotColor: 'blue',
    unread: true,
    title: 'Cita Confirmada',
    time: '09:30 AM',
    description:
      'María González ha confirmado su cita para limpieza dental programada para mañana a las 10:00 AM.',
  },
  {
    id: 'notif-3',
    section: 'AYER',
    type: 'inventory',
    dotColor: 'blue',
    unread: false,
    title: 'Recordatorio de Inventario',
    time: 'Ayer, 16:45',
    description:
      'El stock de anestesia local está por debajo del límite recomendado. Se sugiere realizar un pedido pronto.',
  },
  {
    id: 'notif-4',
    section: 'ESTA SEMANA',
    type: 'inquiry',
    dotColor: 'blue',
    unread: false,
    title: 'Nueva Consulta',
    time: 'Lun, 08:15 AM',
    description:
      'Has recibido una nueva consulta en el portal web referente a tratamientos de blanqueamiento dental.',
  },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [previousScreen, setPreviousScreen] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Initially empty (no red dot on bell icon); interacting with the bell loads/toggles the Stitch notifications
  const [notifications, setNotifications] = useState([]);

  // Modal Nueva Cita state (UI-only modal open/close)
  const [isNuevaCitaOpen, setIsNuevaCitaOpen] = useState(false);
  const [modalPatientName, setModalPatientName] = useState('');

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleNavigate = (screen) => {
    setSearchQuery('');
    setActiveScreen(screen);
  };

  const handleLogout = () => {
    setSearchQuery('');
    setActiveScreen('login');
  };

  const handleLoginSuccess = () => {
    setActiveScreen('dashboard');
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      if (activeScreen !== 'busqueda') {
        if (activeScreen !== 'notificaciones') {
          setPreviousScreen(activeScreen);
        }
        setActiveScreen('busqueda');
      }
    } else if (activeScreen === 'busqueda') {
      setActiveScreen(previousScreen);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveScreen(previousScreen || 'dashboard');
  };

  const handleOpenNotifications = () => {
    setSearchQuery('');
    if (notifications.length === 0 && activeScreen !== 'notificaciones') {
      setNotifications(STITCH_NOTIFICATIONS);
    }
    if (activeScreen !== 'notificaciones') {
      if (activeScreen !== 'busqueda') {
        setPreviousScreen(activeScreen);
      }
      setActiveScreen('notificaciones');
    }
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  const handleToggleNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item
      )
    );
  };

  const handleBackToPrevious = () => {
    setActiveScreen(previousScreen || 'dashboard');
  };

  const handleOpenNuevaCita = (patientName = '') => {
    setModalPatientName(patientName);
    setIsNuevaCitaOpen(true);
  };

  if (activeScreen === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const getSidebarHighlight = () => {
    if (activeScreen === 'busqueda' || activeScreen === 'notificaciones') {
      return previousScreen;
    }
    if (
      activeScreen === 'solicitudes-urgentes' ||
      activeScreen === 'proximas-citas'
    ) {
      return 'dashboard';
    }
    if (
      activeScreen === 'reporte-ingresos' ||
      activeScreen === 'tratamientos-populares'
    ) {
      return 'estadisticas';
    }
    return activeScreen;
  };

  return (
    <MainLayout
      activeScreen={getSidebarHighlight()}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      unreadCount={unreadCount}
      isNotificationsActive={activeScreen === 'notificaciones'}
      onOpenNotifications={handleOpenNotifications}
    >
      {activeScreen === 'dashboard' && (
        <Dashboard
          onNavigate={handleNavigate}
          onOpenNuevaCita={handleOpenNuevaCita}
        />
      )}
      {activeScreen === 'agenda' && (
        <Agenda onOpenNuevaCita={handleOpenNuevaCita} />
      )}
      {activeScreen === 'estadisticas' && (
        <Estadisticas onNavigate={handleNavigate} />
      )}
      {activeScreen === 'cuenta' && <Cuenta />}
      {activeScreen === 'configuracion' && (
        <Configuracion
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      {activeScreen === 'solicitudes-urgentes' && (
        <SolicitudesUrgentes
          onBack={handleNavigate}
          onOpenNuevaCita={handleOpenNuevaCita}
        />
      )}
      {activeScreen === 'proximas-citas' && (
        <ProximasCitas onBack={() => handleNavigate('dashboard')} />
      )}
      {activeScreen === 'reporte-ingresos' && (
        <ReporteIngresos onBack={() => handleNavigate('estadisticas')} />
      )}
      {activeScreen === 'tratamientos-populares' && (
        <TratamientosPopulares onBack={() => handleNavigate('estadisticas')} />
      )}
      {activeScreen === 'busqueda' && (
        <Busqueda
          query={searchQuery}
          onBack={handleClearSearch}
          onClearSearch={handleClearSearch}
          onNavigate={handleNavigate}
          onOpenNuevaCita={handleOpenNuevaCita}
        />
      )}
      {activeScreen === 'notificaciones' && (
        <Notificaciones
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onToggleRead={handleToggleNotificationRead}
          onBack={handleBackToPrevious}
        />
      )}

      {/* Modal Nueva Cita (Screen ID: 1fb530c32bbe4562802cc5245958025a) */}
      <NuevaCitaModal
        key={`${isNuevaCitaOpen}-${modalPatientName}`}
        open={isNuevaCitaOpen}
        initialPatientName={modalPatientName}
        onClose={() => setIsNuevaCitaOpen(false)}
      />
    </MainLayout>
  );
}

export default App;
