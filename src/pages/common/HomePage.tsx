/**
 * Home Page
 * Landing page for unauthenticated users
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { Button } from '@components/ui';
import { ROUTES } from '@constants';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== HEADER ==================== */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-2xl md:text-3xl font-bold">💼</div>

            <div>
              <h1 className="text-lg md:text-xl sm:text-lg font-bold text-gray-900">
                Portfolio Manager
              </h1>
              <p className="text-xs md:text-sm sm:block hidden text-gray-600">Investment Tracker</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            <Link to={ROUTES.LOGIN}>
              <Button variant="secondary" size="md">
                Login
              </Button>
            </Link>

            <Link to={ROUTES.REGISTER}>
              <Button size="md">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link
                to={ROUTES.LOGIN}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="secondary" size="md" fullWidth>
                  Login
                </Button>
              </Link>

              <Link
                to={ROUTES.REGISTER}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button size="md" fullWidth>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Manage Your Investments Smarter
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
                Track, analyze, and optimize your investment portfolio with ease. Get real-time
                insights into your portfolio performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to={ROUTES.REGISTER} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-white w-full sm:w-auto"
                  >
                    Get Started Free
                  </Button>
                </Link>

                <button className="px-4 md:px-6 py-2 md:py-3 rounded-lg border-2 border-blue-200 text-white hover:bg-blue-500 transition-colors font-semibold text-sm md:text-base">
                  Watch Demo
                </button>
              </div>

              {/* Stats - Mobile Optimized */}
              <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl md:text-3xl font-bold">10K+</p>
                  <p className="text-xs md:text-sm text-blue-100">Active Users</p>
                </div>

                <div>
                  <p className="text-2xl md:text-3xl font-bold">$500M+</p>
                  <p className="text-xs md:text-sm text-blue-100">Assets Tracked</p>
                </div>

                <div>
                  <p className="text-2xl md:text-3xl font-bold">99.9%</p>
                  <p className="text-xs md:text-sm text-blue-100">Uptime</p>
                </div>
              </div>
            </div>

            {/* Right Visual - Hidden on Small Screens */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 md:p-8 border border-white/20">
                <div className="space-y-4">
                  {[
                    { symbol: 'AAPL', change: '+12.5%' },
                    { symbol: 'GOOGL', change: '+8.3%' },
                    { symbol: 'MSFT', change: '-2.1%' },
                    { symbol: 'TSLA', change: '+5.7%' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/20 rounded-lg p-4 flex items-center justify-between"
                    >
                      <span className="text-blue-100">{item.symbol}</span>
                      <span
                        className={item.change.startsWith('+') ? 'text-green-300' : 'text-red-300'}
                      >
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Powerful Features
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
              Everything you need to manage your investments effectively
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: '📊',
                title: 'Portfolio Tracking',
                description: 'Monitor all your investments in one centralized place.',
                features: ['Multiple portfolios', 'Real-time prices', 'Portfolio allocation'],
              },
              {
                icon: '📈',
                title: 'Performance Analytics',
                description: 'Get detailed insights into your returns and growth.',
                features: ['Performance charts', 'Gain/loss analysis', 'Return metrics'],
              },
              {
                icon: '💡',
                title: 'Investment Planning',
                description: 'Plan your SIP and automate your investments.',
                features: ['SIP management', 'Goal tracking', 'Projections'],
              },
              {
                icon: '🔐',
                title: 'Security & Privacy',
                description: 'Your data is encrypted with industry standards.',
                features: ['End-to-end encryption', 'Data privacy', 'Secure auth'],
              },
              {
                icon: '📱',
                title: 'Multi-Device Access',
                description: 'Access your portfolio anytime, anywhere.',
                features: ['Web app', 'Mobile app', 'Cloud sync'],
              },
              {
                icon: '📊',
                title: 'Tax Reports',
                description: 'Generate detailed tax reports for your investments.',
                features: ['Gain/loss reports', 'Tax summaries', 'Export formats'],
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">{feature.icon}</div>
                <h4 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  {feature.title}
                </h4>

                <p className="text-sm md:text-base text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                  {feature.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS SECTION ==================== */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              How It Works
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: 1,
                title: 'Create Account',
                desc: 'Sign up with your email. Takes less than 2 minutes.',
              },
              {
                num: 2,
                title: 'Add Investments',
                desc: 'Create portfolios and add your investments.',
              },
              { num: 3, title: 'Track & Analyze', desc: 'Monitor performance and get insights.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-3 md:mb-4">
                  {step.num}
                </div>

                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm md:text-base text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              What Our Users Say
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Join thousands of investors managing their portfolios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Investor',
                avatar: 'RK',
                text: 'Portfolio Manager has made tracking my investments so much easier.',
              },
              {
                name: 'Priya Singh',
                role: 'Mutual Fund Investor',
                avatar: 'PS',
                text: 'The SIP tracking feature is amazing. I can easily manage all my investments.',
              },
              {
                name: 'Amit Patel',
                role: 'Stock Investor',
                avatar: 'AP',
                text: 'I love the portfolio allocation visualization. It helps me rebalance easily.',
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="flex text-yellow-400 text-sm md:text-base mb-3 md:mb-4">
                  {'★'.repeat(5)}
                </div>

                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    {testimonial.avatar}
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 text-sm md:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING SECTION ==================== */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Simple, Transparent Pricing
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Choose the plan that works for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Free',
                price: '0',
                desc: 'Perfect for getting started',
                cta: 'Get Started',
                features: [
                  'Up to 3 portfolios',
                  'Basic analytics',
                  'No tax reports',
                  'No priority support',
                ],
                isPopular: false,
              },
              {
                name: 'Pro',
                price: '99',
                desc: 'For serious investors',
                cta: 'Start Free Trial',
                features: [
                  'Unlimited portfolios',
                  'Advanced analytics',
                  'Tax reports',
                  'Email support',
                ],
                isPopular: true,
              },
              {
                name: 'Premium',
                price: '299',
                desc: 'For professionals',
                cta: 'Contact Sales',
                features: ['Everything in Pro', 'API access', 'Priority support', 'Custom reports'],
                isPopular: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-6 md:p-8 transition-all ${
                  plan.isPopular ? 'border-2 border-blue-600 relative' : 'border border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                      POPULAR
                    </span>
                  </div>
                )}

                <h4
                  className={`text-xl md:text-2xl font-bold mb-1 md:mb-2 ${
                    plan.isPopular ? 'mt-4' : ''
                  }`}
                >
                  {plan.name}
                </h4>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">{plan.desc}</p>

                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  ₹{plan.price}
                  <span className="text-sm md:text-base text-gray-600 font-normal">/month</span>
                </p>

                <Button fullWidth className="mb-6">
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm md:text-base text-gray-600"
                    >
                      <span
                        className={`flex-shrink-0 mt-0.5 ${
                          feature.includes('No') ? 'text-gray-400' : 'text-green-500'
                        }`}
                      >
                        {feature.includes('No') ? '✗' : '✓'}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to Take Control of Your Portfolio?
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8">
            Join thousands of investors managing their portfolios smarter with Portfolio Manager.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center">
            <Link to={ROUTES.REGISTER}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-white"
              >
                Start Free Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">About</h4>
              <p className="text-xs md:text-sm leading-relaxed">
                Portfolio Manager is your trusted platform for investment tracking.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Company</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li>support@portfoliomgr.com</li>
                <li>+1 (555) 123-4567</li>

                <li>
                  <div className="flex gap-3 mt-3">
                    <a href="#" className="hover:text-white transition-colors">
                      Twitter
                    </a>

                    <a href="#" className="hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
            <p>© 2024 Portfolio Management System. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>

              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
