import React, { useState, useEffect } from 'react';
import {
  Plane,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Cloud,
  Activity,
  Clock,
  Users,
  Settings,
  Bell,
  ExternalLink
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for prototype
const mockFlights = [
  { id: 'SV123', airline: 'الخطوط السعودية', from: 'الرياض', to: 'جدة', status: 'في الطريق', altitude: 35000, speed: 520 },
  { id: 'MS456', airline: 'ناس', from: 'الدمام', to: 'الرياض', status: 'مقلع', altitude: 15000, speed: 480 },
  { id: 'F3789', airline: 'فلاي أديل', from: 'جدة', to: 'الدمام', status: 'هابط', altitude: 8000, speed: 320 },
  { id: 'SV890', airline: 'الخطوط السعودية', from: 'الرياض', to: 'نيوم', status: 'في الطريق', altitude: 38000, speed: 550 }
];

const mockAirports = [
  { id: 'RUH', name: 'مطار الرياض', status: 'تشغيلي', flights: 45, capacity: 80 },
  { id: 'JED', name: 'مطار جدة', status: 'تشغيلي', flights: 62, capacity: 90 },
  { id: 'DMM', name: 'مطار الدمام', status: 'تشغيلي', flights: 38, capacity: 70 },
  { id: 'NEOM', name: 'مطار نيوم', status: 'تشغيلي', flights: 15, capacity: 50 }
];

const mockAlerts = [
  { id: 1, type: 'weather', message: 'رياح قوية في مطار جدة', severity: 'medium' },
  { id: 2, type: 'traffic', message: 'ازدحام في المجال الجوي - الرياض', severity: 'high' },
  { id: 3, type: 'maintenance', message: 'صيانة مدرج 2 - مطار الدمام', severity: 'low' }
];

const flightData = [
  { time: '06:00', flights: 12 },
  { time: '09:00', flights: 28 },
  { time: '12:00', flights: 45 },
  { time: '15:00', flights: 52 },
  { time: '18:00', flights: 38 },
  { time: '21:00', flights: 25 }
];

const airportData = [
  { name: 'الرياض', capacity: 80, current: 45 },
  { name: 'جدة', capacity: 90, current: 62 },
  { name: 'الدمام', capacity: 70, current: 38 },
  { name: 'نيوم', capacity: 50, current: 15 }
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const KPICard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border-r-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 font-arabic">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const FlightCard = ({ flight }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{flight.id}</h3>
          <p className="text-sm text-gray-600 font-arabic">{flight.airline}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          flight.status === 'في الطريق' ? 'bg-blue-100 text-blue-800' :
          flight.status === 'مقلع' ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {flight.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 font-arabic">من</p>
          <p className="font-medium font-arabic">{flight.from}</p>
        </div>
        <div>
          <p className="text-gray-500 font-arabic">إلى</p>
          <p className="font-medium font-arabic">{flight.to}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">الارتفاع</p>
          <p className="font-medium">{flight.altitude.toLocaleString()} قدم</p>
        </div>
        <div>
          <p className="text-gray-500">السرعة</p>
          <p className="font-medium">{flight.speed} كم/س</p>
        </div>
      </div>
    </div>
  );

  const AirportCard = ({ airport }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 font-arabic">{airport.name}</h3>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {airport.status}
          </span>
        </div>
        <MapPin className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">الرحلات النشطة</span>
          <span className="font-medium">{airport.flights}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full" 
            style={{ width: `${(airport.flights / airport.capacity) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>الطاقة الاستيعابية</span>
          <span>{airport.capacity}</span>
        </div>
      </div>
    </div>
  );

  const AlertItem = ({ alert }) => (
    <div className={`p-3 rounded-lg border-l-4 ${
      alert.severity === 'high' ? 'border-red-500 bg-red-50' :
      alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
      'border-blue-500 bg-blue-50'
    }`}>
      <div className="flex items-start">
        <AlertTriangle className={`w-4 h-4 mt-0.5 mr-2 ${
          alert.severity === 'high' ? 'text-red-500' :
          alert.severity === 'medium' ? 'text-yellow-500' :
          'text-blue-500'
        }`} />
        <div>
          <p className="text-sm font-medium text-gray-900 font-arabic">{alert.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {alert.type === 'weather' ? 'طقس' : 
             alert.type === 'traffic' ? 'حركة مرور' : 'صيانة'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Plane className="w-8 h-8 text-blue-600 ml-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-arabic">سماء السعودية</h1>
                <p className="text-sm text-gray-600">نظام إدارة الطيران المتقدم</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString('ar-SA')}
              </div>
              <a
                href="https://MoHHamMed-2030.github.io/anan-saudi-aviation-system/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200"
                title="زيارة الموقع المباشر"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/MoHHamMed-2030/anan-saudi-aviation-system"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                title="عرض الكود المصدري على GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <Bell className="w-5 h-5 text-gray-400" />
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'لوحة التحكم', icon: Activity },
              { id: 'flights', label: 'الرحلات', icon: Plane },
              { id: 'airports', label: 'المطارات', icon: MapPin },
              { id: 'weather', label: 'الطقس', icon: Cloud },
              { id: 'alerts', label: 'التنبيهات', icon: AlertTriangle }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 border-b-2 text-sm font-medium ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 ml-2" />
                <span className="font-arabic">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="الرحلات النشطة"
                value={mockFlights.length}
                icon={Plane}
                color="#3B82F6"
                change="+12%"
              />
              <KPICard 
                title="المطارات التشغيلية"
                value={mockAirports.length}
                icon={MapPin}
                color="#10B981"
                change="100%"
              />
              <KPICard 
                title="التنبيهات"
                value={mockAlerts.length}
                icon={AlertTriangle}
                color="#F59E0B"
                change="-5%"
              />
              <KPICard 
                title="كفاءة التشغيل"
                value="98.7%"
                icon={TrendingUp}
                color="#8B5CF6"
                change="+2.1%"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-arabic">حركة الرحلات اليومية</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={flightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="flights" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-arabic">الطاقة الاستيعابية للمطارات</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={airportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="capacity" fill="#E5E7EB" />
                    <Bar dataKey="current" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Flights and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-arabic">الرحلات النشطة</h3>
                <div className="space-y-4">
                  {mockFlights.slice(0, 3).map(flight => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-arabic">التنبيهات النشطة</h3>
                <div className="space-y-3">
                  {mockAlerts.map(alert => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flights' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">إدارة الرحلات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFlights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'airports' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">المطارات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAirports.map(airport => (
                <AirportCard key={airport.id} airport={airport} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">الأحوال الجوية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAirports.map(airport => (
                <div key={airport.id} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-arabic">{airport.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">درجة الحرارة</span>
                      <span className="font-medium">28°م</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الرؤية</span>
                      <span className="font-medium">10 كم</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">سرعة الرياح</span>
                      <span className="font-medium">15 كم/س</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الضغط الجوي</span>
                      <span className="font-medium">1013 هيكتوباسكال</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">التنبيهات والطوارئ</h2>
            <div className="space-y-4">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="bg-white rounded-lg shadow-sm p-6">
                  <AlertItem alert={alert} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;