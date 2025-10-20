import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog,
  faKey,
  faEnvelope,
  faDatabase,
  faShieldAlt,
  faBell,
  faSave,
  faTest,
  faDownload,
  faUpload,
  faTrash,
  faEdit,
  faPlus,
  faTimes,
  faCheck,
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function SettingsManagement() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('api');
  const [settings, setSettings] = useState({
    api: {
      n8nUrl: 'https://n8n.example.com',
      n8nApiKey: '••••••••••••••••',
      openaiApiKey: '••••••••••••••••',
      gmailClientId: '••••••••••••••••',
      gmailClientSecret: '••••••••••••••••'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'noreply@emilai.com',
      smtpPassword: '••••••••••••••••',
      fromEmail: 'noreply@emilai.com',
      fromName: 'Emil AI'
    },
    system: {
      maintenanceMode: false,
      maxFileSize: '10MB',
      sessionTimeout: 30,
      backupFrequency: 'daily',
      logLevel: 'info'
    },
    notifications: {
      emailAlerts: true,
      slackWebhook: 'https://hooks.slack.com/...',
      errorThreshold: 5,
      uptimeMonitoring: true
    }
  });

  const [emailTemplates, setEmailTemplates] = useState([
    { id: 1, name: 'Email Verification', subject: 'Verify your Emil AI account', active: true },
    { id: 2, name: 'Password Reset', subject: 'Reset your Emil AI password', active: true },
    { id: 3, name: 'Job Application', subject: 'New application received', active: true },
    { id: 4, name: 'Interview Invite', subject: 'Interview invitation', active: false }
  ]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${section} settings saved successfully!`);
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    }
  };

  const handleTest = async (type) => {
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`${type} test completed successfully!`);
    } catch (error) {
      console.error('Test failed:', error);
      alert('Test failed');
    }
  };

  const tabs = [
    { id: 'api', name: 'API Keys', icon: faKey },
    { id: 'email', name: 'Email Settings', icon: faEnvelope },
    { id: 'templates', name: 'Email Templates', icon: faEdit },
    { id: 'system', name: 'System Config', icon: faCog },
    { id: 'notifications', name: 'Notifications', icon: faBell },
    { id: 'security', name: 'Security', icon: faShieldAlt },
    { id: 'backup', name: 'Backup & Restore', icon: faDatabase }
  ];

  const SettingCard = ({ title, children, onSave, onTest }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          {onTest && (
            <button
              onClick={onTest}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faTest} className="mr-2" />
              Test
            </button>
          )}
          {onSave && (
            <button
              onClick={onSave}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </button>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );

  const renderApiSettings = () => (
    <SettingCard
      title="API Configuration"
      onSave={() => handleSave('API')}
      onTest={() => handleTest('API Connection')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">N8N URL</label>
          <input
            type="url"
            value={settings.api.n8nUrl}
            onChange={(e) => setSettings({...settings, api: {...settings.api, n8nUrl: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">N8N API Key</label>
          <input
            type="password"
            value={settings.api.n8nApiKey}
            onChange={(e) => setSettings({...settings, api: {...settings.api, n8nApiKey: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">OpenAI API Key</label>
          <input
            type="password"
            value={settings.api.openaiApiKey}
            onChange={(e) => setSettings({...settings, api: {...settings.api, openaiApiKey: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Gmail Client ID</label>
          <input
            type="text"
            value={settings.api.gmailClientId}
            onChange={(e) => setSettings({...settings, api: {...settings.api, gmailClientId: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>
    </SettingCard>
  );

  const renderEmailSettings = () => (
    <SettingCard
      title="Email Configuration"
      onSave={() => handleSave('Email')}
      onTest={() => handleTest('Email')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => setSettings({...settings, email: {...settings.email, smtpHost: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">SMTP Port</label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => setSettings({...settings, email: {...settings.email, smtpPort: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => setSettings({...settings, email: {...settings.email, smtpUsername: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => setSettings({...settings, email: {...settings.email, smtpPassword: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => setSettings({...settings, email: {...settings.email, fromEmail: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => setSettings({...settings, email: {...settings.email, fromName: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>
    </SettingCard>
  );

  const renderEmailTemplates = () => (
    <SettingCard title="Email Templates">
      <div className="space-y-4">
        {emailTemplates.map((template) => (
          <div key={template.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${template.active ? 'bg-green-400' : 'bg-gray-400'}`} />
              <div>
                <h4 className="text-white font-medium">{template.name}</h4>
                <p className="text-white/60 text-sm">{template.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <FontAwesomeIcon icon={template.active ? faCheck : faTimes} />
              </button>
            </div>
          </div>
        ))}
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Template
        </button>
      </div>
    </SettingCard>
  );

  const renderSystemSettings = () => (
    <SettingCard
      title="System Configuration"
      onSave={() => handleSave('System')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <h4 className="text-white font-medium">Maintenance Mode</h4>
            <p className="text-white/60 text-sm">Temporarily disable the platform</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.system.maintenanceMode}
              onChange={(e) => setSettings({...settings, system: {...settings.system, maintenanceMode: e.target.checked}})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Max File Size</label>
          <select
            value={settings.system.maxFileSize}
            onChange={(e) => setSettings({...settings, system: {...settings.system, maxFileSize: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="5MB">5MB</option>
            <option value="10MB">10MB</option>
            <option value="25MB">25MB</option>
            <option value="50MB">50MB</option>
          </select>
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.system.sessionTimeout}
            onChange={(e) => setSettings({...settings, system: {...settings.system, sessionTimeout: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Backup Frequency</label>
          <select
            value={settings.system.backupFrequency}
            onChange={(e) => setSettings({...settings, system: {...settings.system, backupFrequency: e.target.value}})}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
    </SettingCard>
  );

  const renderBackupSettings = () => (
    <SettingCard title="Backup & Restore">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-6">
          <h4 className="text-white font-medium mb-4">Create Backup</h4>
          <p className="text-white/60 text-sm mb-4">Create a full system backup including database and files</p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Create Backup
          </button>
        </div>
        <div className="bg-white/5 rounded-lg p-6">
          <h4 className="text-white font-medium mb-4">Restore Backup</h4>
          <p className="text-white/60 text-sm mb-4">Restore from a previous backup file</p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Restore Backup
          </button>
        </div>
      </div>
    </SettingCard>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-black font-bold text-2xl">E</span>
            </div>
            <div className="text-white text-lg font-medium mb-2">Loading Settings</div>
            <div className="text-white/60">Fetching configuration...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Settings & Configuration</h1>
                  <p className="text-white/60 mt-1">Manage system settings and configurations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tabs */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 mb-8">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'api' && renderApiSettings()}
              {activeTab === 'email' && renderEmailSettings()}
              {activeTab === 'templates' && renderEmailTemplates()}
              {activeTab === 'system' && renderSystemSettings()}
              {activeTab === 'backup' && renderBackupSettings()}
            </motion.div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
