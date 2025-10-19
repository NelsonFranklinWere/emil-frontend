import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [aiInsights, setAiInsights] = useState([]);
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 1247,
    jobsPosted: 89,
    candidatesHired: 156,
    aiAccuracy: 94.7
  });
  const [userBehavior, setUserBehavior] = useState({
    timeOnPage: 0,
    scrollDepth: 0,
    interactions: 0
  });
  const [neuralNetwork, setNeuralNetwork] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setUserBehavior(prev => ({ ...prev, scrollDepth }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setUserBehavior(prev => ({ ...prev, interactions: prev.interactions + 1 }));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // AI-Powered Dynamic Content
  useEffect(() => {
    const insights = [
      "AI detected 23% increase in qualified candidates",
      "Machine learning optimized your job descriptions",
      "Predictive analytics suggest 89% hiring success rate",
      "Neural networks identified top talent patterns"
    ];
    
    const interval = setInterval(() => {
      setAiInsights(prev => {
        const newInsight = insights[Math.floor(Math.random() * insights.length)];
        return [...prev.slice(-2), { id: Date.now(), text: newInsight, timestamp: new Date() }];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Live Metrics Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        jobsPosted: prev.jobsPosted + Math.floor(Math.random() * 2),
        candidatesHired: prev.candidatesHired + Math.floor(Math.random() * 2),
        aiAccuracy: Math.min(99.9, prev.aiAccuracy + (Math.random() - 0.5) * 0.1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Time on Page Tracking
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setUserBehavior(prev => ({ 
        ...prev, 
        timeOnPage: Math.floor((Date.now() - startTime) / 1000) 
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Neural Network Visualization
  useEffect(() => {
    const generateNeuralNetwork = () => {
      const nodes = [];
      for (let i = 0; i < 15; i++) {
        nodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
            Math.floor(Math.random() * 15)
          ),
          pulse: Math.random() * 2
        });
      }
      setNeuralNetwork(nodes);
    };

    generateNeuralNetwork();
    const interval = setInterval(generateNeuralNetwork, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "James Mwangi",
      role: "HR Director, TechCorp",
      content: "Emil AI reduced our hiring time by 70%. We went from 3 weeks to 5 days average hiring cycle.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Musando",
      role: "Talent Acquisition, Startup TechPlus",
      content: "The AI screening is incredibly accurate. We're seeing 90% better candidate matches than manual screening.",
      avatar: "👨‍💼"
    },
    {
      name: "Emily Irungu",
      role: "Recruitment Manager, GrowthInc",
      content: "Automated scheduling and reports saved our team 20+ hours per week. Game changer for busy HR teams.",
      avatar: "👩‍🎓"
    }
  ];

  // Features with icons
  const features = [
    {
      icon: '📝',
      title: 'Smart Job Posting',
      description: 'AI-optimized job descriptions that attract the right candidates',
      details: 'Generate compelling job posts, optimize for SEO, and distribute across multiple platforms automatically.'
    },
    {
      icon: '🤖',
      title: 'AI Candidate Screening',
      description: 'Automated CV parsing and intelligent scoring',
      details: 'Uses advanced NLP to analyze resumes, match skills, and rank candidates based on your requirements.'
    },
    {
      icon: '📅',
      title: 'Automated Scheduling',
      description: 'Seamless calendar integration and interview coordination',
      details: 'Sync with Google Calendar, auto-send invites, and manage interview slots without the back-and-forth.'
    },
    {
      icon: '📊',
      title: 'Smart Analytics & Reports',
      description: 'Real-time insights and comprehensive hiring metrics',
      details: 'Get detailed reports on candidate pipeline, diversity metrics, time-to-hire, and cost-per-hire.'
    }
  ];

  // Company logos (placeholder)
  const companies = [
    { name: "TechCorp", logo: "tC" },
    { name: "Startup TechPlus", logo: "💡" },
    { name: "GrowthInc", logo: "📈" },
    { name: "InnovateLabs", logo: "🔬" },
    { name: "ScaleFast", logo: "⚡" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 20,
            top: mousePosition.y / 20,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-black font-bold text-xl">E</span>
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent ${
                scrolled ? 'from-gray-900 to-yellow-600' : 'from-white to-yellow-200'
              }`}>Emil AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Features</a>
              <a href="#pricing" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Pricing</a>
              <a href="#testimonials" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Testimonials</a>
              <a href="#contact" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`}>Contact</a>
              <Link href="/create-job" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
                Start Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          {/* Trust Badge */}
          <div 
            id="trust-badge"
            data-animate
            className={`inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 transition-all duration-1000 ${
              isVisible['trust-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium">
               Trusted by 20+ companies in Kenya
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            id="main-headline"
            data-animate
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight transition-all duration-1000 delay-200 ${
              isVisible['main-headline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Recruitment, Simplified.
            </span>
          </h1>

          {/* Subtext */}
          <p 
            id="subtext"
            data-animate
            className={`text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible['subtext'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Post jobs, let Emil AI screen applicants, and get instant reports in your inbox.
            <span className="block mt-2 text-yellow-300 font-semibold">
              Hire smarter, faster, and better with cutting-edge artificial intelligence.
            </span>
          </p>

          {/* AI Demo Video Placeholder */}
          <div 
            id="demo-video"
            data-animate
            className={`mb-12 max-w-5xl mx-auto transition-all duration-1000 delay-600 ${
              isVisible['demo-video'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-white/10 transition-all duration-500 group">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                {/* Animated Neural Network Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="text-center relative z-10">
                  <div className="text-8xl mb-6 animate-bounce">🤖</div>
                  <h3 className="text-3xl font-bold text-white mb-4">AI Screening in Action</h3>
                  <p className="text-white/70 text-lg mb-6">Watch how Emil AI analyzes resumes and scores candidates in real-time</p>
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Play Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            id="cta-buttons"
            data-animate
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-800 ${
              isVisible['cta-buttons'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link href="/create-job" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 text-lg flex items-center">
              <span className="mr-2">🚀</span>
              Start Free Trial
            </Link>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-green-400/25 transition-all duration-300 transform hover:scale-105 text-lg flex items-center">
              <span className="mr-2">🤖</span>
              Try AI Screening Now
            </button>
            <button className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/30 font-bold px-10 py-5 rounded-xl shadow-lg hover:shadow-white/10 transition-all duration-300 text-lg flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See Demo
            </button>
          </div>

          {/* AI-Powered Live Insights */}
          <div 
            id="ai-insights"
            data-animate
            className={`mb-12 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
              isVisible['ai-insights'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <span className="text-white/80 text-sm font-medium">AI INSIGHTS LIVE</span>
              </div>
              <div className="space-y-2">
                {aiInsights.map((insight, index) => (
                  <div 
                    key={insight.id} 
                    className="text-white/90 text-sm animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    🤖 {insight.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Metrics Dashboard */}
          <div 
            id="live-metrics"
            data-animate
            className={`mb-12 max-w-5xl mx-auto transition-all duration-1000 delay-1200 ${
              isVisible['live-metrics'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Active Users', 
                  value: liveMetrics.activeUsers, 
                  icon: '👥', 
                  color: 'from-blue-500 to-cyan-500',
                  trend: '+12%'
                },
                { 
                  label: 'Jobs Posted', 
                  value: liveMetrics.jobsPosted, 
                  icon: '📝', 
                  color: 'from-green-500 to-emerald-500',
                  trend: '+8%'
                },
                { 
                  label: 'Candidates Hired', 
                  value: liveMetrics.candidatesHired, 
                  icon: '🎯', 
                  color: 'from-purple-500 to-pink-500',
                  trend: '+15%'
                },
                { 
                  label: 'AI Accuracy', 
                  value: `${liveMetrics.aiAccuracy.toFixed(1)}%`, 
                  icon: '🧠', 
                  color: 'from-yellow-500 to-orange-500',
                  trend: '+2.3%'
                }
              ].map((metric, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{metric.icon}</span>
                    <span className="text-green-400 text-xs font-medium">{metric.trend}</span>
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                  <div className="text-white/70 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Neural Network Visualization */}
          <div 
            id="neural-viz"
            data-animate
            className={`mb-12 max-w-4xl mx-auto transition-all duration-1000 delay-1400 ${
              isVisible['neural-viz'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Neural Network Processing</h3>
                <p className="text-white/70 text-sm">Real-time AI analysis in action</p>
              </div>
              <div className="relative h-32">
                {neuralNetwork.map((node, index) => (
                  <div key={node.id} className="absolute">
                    <div 
                      className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        animationDelay: `${node.pulse}s`,
                        animationDuration: `${2 + node.pulse}s`
                      }}
                    />
                    {node.connections.map((connection, connIndex) => (
                      <div
                        key={connIndex}
                        className="absolute w-px bg-gradient-to-r from-blue-400/50 to-purple-500/50 animate-pulse"
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          transform: `rotate(${Math.random() * 360}deg)`,
                          height: `${Math.random() * 50 + 20}px`,
                          animationDelay: `${node.pulse + connIndex * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Proof - Company Logos */}
          <div className="mb-16">
            <p className="text-white/60 text-sm mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{company.logo}</span>
                  <span className="font-semibold group-hover:text-yellow-300 transition-colors duration-300">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Stats with Animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '20+', label: 'Companies', icon: '🏢', color: 'from-blue-500 to-cyan-500' },
              { number: '500+', label: 'Candidates Hired', icon: '👥', color: 'from-green-500 to-emerald-500' },
              { number: '85%', label: 'Faster Hiring', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
              { number: '4.7/5', label: 'Rating', icon: '⭐', color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Smart Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Quantum Particles Background */}
        <div className="absolute inset-0 quantum-particles">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-quantum-glow"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-quantum-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-quantum-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 holographic">
              AI-Powered Intelligence
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our AI learns from your behavior and adapts in real-time to provide personalized insights
            </p>
          </div>

          {/* Smart Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-advanced rounded-2xl p-6 neural-connection">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">User Engagement</h3>
                <div className="ai-thinking"></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Time on Page</span>
                  <span className="text-green-400 font-medium">{userBehavior.timeOnPage}s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Scroll Depth</span>
                  <span className="text-blue-400 font-medium">{Math.round(userBehavior.scrollDepth)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Interactions</span>
                  <span className="text-purple-400 font-medium">{userBehavior.interactions}</span>
                </div>
                <div className="data-bar"></div>
              </div>
            </div>

            <div className="glass-advanced rounded-2xl p-6 neural-connection">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">AI Predictions</h3>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-white/70 mb-2">Based on your behavior, AI suggests:</div>
                <div className="text-sm text-green-300">• You're likely interested in enterprise features</div>
                <div className="text-sm text-blue-300">• Advanced AI screening would benefit you</div>
                <div className="text-sm text-purple-300">• Custom integrations recommended</div>
              </div>
            </div>

            <div className="glass-advanced rounded-2xl p-6 neural-connection">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Smart Recommendations</h3>
                <div className="animate-ai-thinking">🧠</div>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-white/70 mb-2">Personalized for you:</div>
                <div className="text-sm text-yellow-300">• Pro Plan matches your needs (94% match)</div>
                <div className="text-sm text-cyan-300">• API access for automation</div>
                <div className="text-sm text-pink-300">• Priority support recommended</div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on User Behavior */}
          <div className="text-center">
            <div className="glass-advanced rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                {userBehavior.timeOnPage > 30 ? 
                  "You're clearly interested! Let's get you started with Emil AI" : 
                  "Discover the power of AI-driven recruitment"
                }
              </h3>
              <p className="text-white/80 mb-6">
                {userBehavior.scrollDepth > 50 ? 
                  "You've explored our features - ready to transform your hiring process?" :
                  "Scroll down to see how Emil AI can revolutionize your recruitment"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create-job" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
                  {userBehavior.interactions > 10 ? "Start Your AI Journey" : "Try Emil AI Now"}
                </Link>
                <button className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/30 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-white/10 transition-all duration-300">
                  {userBehavior.scrollDepth > 70 ? "See Advanced Features" : "Learn More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div 
            id="features-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Everything You Need to Hire Better
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From job posting to final hiring decision, Emil AI handles the heavy lifting with 
              <span className="font-semibold text-blue-600"> cutting-edge technology</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                id={`feature-${index}`}
                data-animate
                className={`group relative transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                  
                  {/* Icon with Animation */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 text-sm text-gray-600 border border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                    {feature.details}
                  </div>
                  
                  {/* Hover Effect Indicator */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div 
            id="tech-stack"
            data-animate
            className={`mt-20 text-center transition-all duration-1000 delay-1000 ${
              isVisible['tech-stack'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-12">
              Powered by Cutting-Edge Technology
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {[
                { name: "OpenAI GPT-4", icon: "🧠", color: "from-green-500 to-emerald-600" },
                { name: "Google Gemini", icon: "🔮", color: "from-blue-500 to-cyan-600" },
                { name: "HuggingFace", icon: "🤗", color: "from-yellow-500 to-orange-600" },
                { name: "Google Calendar", icon: "📅", color: "from-red-500 to-pink-600" },
                { name: "Gmail API", icon: "📧", color: "from-purple-500 to-indigo-600" }
              ].map((tech, index) => (
                <div 
                  key={index} 
                  className="group flex items-center space-x-3 bg-white/80 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {tech.icon}
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div 
            id="testimonials-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['testimonials-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What HR Professionals Say
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our customers have to say about 
              <span className="font-semibold text-yellow-300"> Emil AI</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                id={`testimonial-${index}`}
                data-animate
                className={`group transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`testimonial-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-white/10 border border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                  
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-4xl text-white/20 group-hover:text-yellow-400/50 transition-colors duration-300">
                    "
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg group-hover:text-yellow-300 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-white/90 italic text-lg leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400 text-xl">
                      {'★'.repeat(5)}
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div 
            id="trust-indicators"
            data-animate
            className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
              isVisible['trust-indicators'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '20+', label: 'Companies', icon: '🏢' },
                { number: '500+', label: 'Candidates Hired', icon: '👥' },
                { number: '85%', label: 'Faster Hiring', icon: '⚡' },
                { number: '4.7/5', label: 'Rating', icon: '⭐' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div 
            id="pricing-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['pricing-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that works best for your team. 
              <span className="font-semibold text-blue-600">No hidden fees, no surprises</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div 
              id="starter-plan"
              data-animate
              className={`group transition-all duration-1000 delay-200 ${
                isVisible['starter-plan'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Starter Plan
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">
                    $20<span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-8">Perfect for small teams getting started</p>
                  
                  <div className="space-y-4 mb-8 text-left">
                    {[
                      '1 Active Job Posting',
                      'Up to 500 Applicants',
                      'Basic AI Screening',
                      'Email Support'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/create-job" className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 py-4 rounded-xl font-bold transition-all duration-300 block text-center group-hover:shadow-lg">
                    Get Started Free
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div 
              id="pro-plan"
              data-animate
              className={`group transition-all duration-1000 delay-400 ${
                isVisible['pro-plan'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-yellow-400/25 border-2 border-yellow-400/30 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden">
                {/* Popular Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-bl-2xl rounded-tr-3xl text-sm font-bold shadow-lg">
                  MOST POPULAR
                </div>
                
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                    Pro Plan
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">
                    $85<span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-8">Pay-as-you-go for growing businesses</p>
                  
                  <div className="space-y-4 mb-8 text-left">
                    {[
                      'Unlimited Job Postings',
                      'Unlimited Applicants',
                      'Advanced AI Screening',
                      'Priority Support',
                      'Custom Reports',
                      'API Access'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/create-job" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black py-4 rounded-xl font-bold transition-all duration-300 block text-center group-hover:shadow-yellow-400/25">
                    Start Pro Trial
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div 
              id="enterprise-plan"
              data-animate
              className={`group transition-all duration-1000 delay-600 ${
                isVisible['enterprise-plan'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    Enterprise
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">Custom</div>
                  <p className="text-gray-600 mb-8">For large organizations with complex needs</p>
                  
                  <div className="space-y-4 mb-8 text-left">
                    {[
                      'Everything in Pro',
                      'Dedicated Account Manager',
                      'Custom AI Models',
                      'SSO & Advanced Security',
                      'Custom Integrations'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-300 group-hover:shadow-lg">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Contact/Demo Section */}
<section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
      Ready to Transform Your Hiring?
    </h2>
    <p className="text-xl text-white/80 mb-8">
      See how Emil AI can revolutionize your recruitment process. Book a personalized demo today.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
      <Link 
        href="/dashboard"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 transform hover:scale-105 text-lg inline-block text-center"
      >
        📅 Book a Demo
      </Link>
      <Link 
        href="/contact-sales"
        className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-lg shadow transition-all duration-200 text-lg inline-block text-center"
      >
        💬 Chat with Sales
      </Link>
    </div>
    
    <p className="text-white/60 text-sm">
      Or start instantly with our <Link href="/create-job" className="text-yellow-400 hover:text-yellow-300 underline">free trial</Link>
    </p>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div 
            id="footer-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['footer-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-6 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300 group-hover:scale-110">
                    <span className="text-black font-bold text-xl">E</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    Emil AI
                  </span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  AI-powered recruitment platform for modern businesses. 
                  <span className="text-yellow-300 font-semibold">Building the future of hiring</span>.
                </p>
                <div className="flex space-x-4">
                  {[
                    { href: "https://www.linkedin.com/in/stivego-company-729746386/", icon: "💼", label: "LinkedIn" },
                    { href: "https://www.tiktok.com/@strivego", icon: "🎵", label: "TikTok" },
                    { href: "https://www.facebook.com/profile.php?id=61581393475109", icon: "📘", label: "Facebook" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href} 
                      className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20 hover:border-yellow-400/50"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Navigation Links */}
              {[
                { 
                  title: 'Product', 
                  links: [
                    { name: 'Features', href: '#features' },
                    { name: 'Pricing', href: '#pricing' },
                    { name: 'API', href: '#' },
                    { name: 'Integrations', href: '#' }
                  ] 
                },
                { 
                  title: 'Company', 
                  links: [
                    { name: 'About', href: '#' },
                    { name: 'Blog', href: '#' },
                    { name: 'Careers', href: '#' },
                    { name: 'Contact', href: '#contact' }
                  ] 
                },
                { 
                  title: 'Support', 
                  links: [
                    { name: 'Help Center', href: '#' },
                    { name: 'Documentation', href: '#' },
                    { name: 'Status', href: '#' },
                    { name: 'Community', href: '#' }
                  ] 
                }
              ].map((column, index) => (
                <div key={index} className="group">
                  <h4 className="font-bold mb-6 text-lg group-hover:text-yellow-300 transition-colors duration-300">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link, idx) => (
                      <li key={idx}>
                        <a 
                          href={link.href} 
                          className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group-hover:text-yellow-300"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Bottom Section */}
            <div className="border-t border-white/10 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 mb-2">© 2025 Emil AI. All rights reserved.</p>
                  <p className="text-gray-500 text-sm">
                    contact@emilai.com • 
                    <span className="text-yellow-400 font-semibold"> Powered by Strive Go Team</span>
                  </p>
                </div>
                
                {/* Trust Badges */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span>ISO 27001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}