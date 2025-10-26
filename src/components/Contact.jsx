import React, { useState, useRef, useEffect } from "react";

// Google Maps Component
const MapComponent = ({ location }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      // Initialize map
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.9312, lng: 76.2673 }, // Kanayannur, Kerala coordinates
        zoom: 14,
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }],
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add marker
      new window.google.maps.Marker({
        position: { lat: 9.9312, lng: 76.2673 },
        map: googleMap,
        title: "Relief Hands Organization",
        icon: {
          url:
            "data:image/svg+xml;base64," +
            btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#8B5CF6" stroke="#ffffff" stroke-width="2"/>
              <path d="M20 12L24.5 16.5L20 21L15.5 16.5L20 12Z" fill="white"/>
              <circle cx="20" cy="20" r="4" fill="#ffffff"/>
            </svg>
          `),
        },
      });

      setMap(googleMap);
    }
  }, [map]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-2xl"
      style={{ minHeight: "300px" }}
    />
  );
};

// Map Wrapper Component with Loading State
const MapWrapper = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google) {
      setIsMapLoaded(true);
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsMapLoaded(true);
    script.onerror = () => console.error("Google Maps failed to load");

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!isMapLoaded) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-400">Loading Map...</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  return <MapComponent location="Kanayannur, Kerala, India" />;
};

export default function ContactSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "contact@reliefhands.org",
      link: "mailto:contact@reliefhands.org",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+91 1234567890",
      link: "tel:+911234567890",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Kanayannur, Kerala, India",
      link: "#",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🕒",
      title: "Working Hours",
      value: "Mon - Fri, 9AM - 6PM",
      link: "#",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const socialLinks = [
    { icon: "🐦", name: "Twitter", gradient: "from-blue-400 to-cyan-400" },
    { icon: "📘", name: "Facebook", gradient: "from-blue-600 to-blue-400" },
    { icon: "📸", name: "Instagram", gradient: "from-pink-600 to-purple-600" },
    { icon: "💼", name: "LinkedIn", gradient: "from-blue-700 to-blue-500" },
    { icon: "🎥", name: "YouTube", gradient: "from-red-600 to-red-400" },
    { icon: "💬", name: "WhatsApp", gradient: "from-green-600 to-green-400" },
  ];

  return (
    <section id="contact" className="py-20">
      <div ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-20 transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block mb-4 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              <span className="text-sm text-purple-300">📬 GET IN TOUCH</span>
            </div>
            <h2 className="text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Contact Us
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send me a message and
              we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="group relative block"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${info.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500`}
                ></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <div className="text-5xl mb-3">{info.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transform transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Contact Form */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send me a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field with Icon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field with Icon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field with Visibility Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Subject Field with Icon */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div> */}

                  {/* Message Field with Icon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center animate-fade-in flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Map & Social Links */}
            <div className="space-y-8">
              {/* Map */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 overflow-hidden h-80">
                  <MapWrapper />
                </div>
              </div>

              {/* Social Links */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Follow Us
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <button key={index} className="group/social relative">
                        <div
                          className={`absolute -inset-1 bg-gradient-to-r ${social.gradient} rounded-2xl blur opacity-25 group-hover/social:opacity-75 transition duration-300`}
                        ></div>
                        <div className="relative bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
                          <div className="text-4xl mb-2">{social.icon}</div>
                          <p className="text-xs text-gray-400">{social.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}</style>
      </div>
    </section>
  );
}
