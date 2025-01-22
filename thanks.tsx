import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, CheckCircle2, PhoneCall, Truck, Star, Gift } from 'lucide-react';

const OrderStep = ({ icon: Icon, title, status, statusText }) => (
  <div className="text-center w-1/3">
    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
      status === 'completed' ? 'bg-green-500 text-white' :
      status === 'current' ? 'bg-blue-500 text-white animate-pulse' :
      'bg-gray-200 text-gray-500'
    }`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="mt-2 text-sm font-medium text-gray-700">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{statusText}</p>
  </div>
);

const ProductCard = ({ name, price, image, eco, rating, origin }) => (
  <Card className="bg-white">
    <CardContent className="p-4">
      <div className="relative mb-4">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Eco
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-green-800">{name}</h3>
        <span className="flex items-center text-amber-500">
          <Heart className="w-4 h-4 mr-1" />
          {rating}
        </span>
      </div>
      <p className="text-sm text-green-600 mb-2">{origin}</p>
      <p className="text-lg font-semibold text-green-700 mb-4">{price}</p>
      <Button className="w-full bg-green-600 hover:bg-green-700">
        Agregar al carrito
      </Button>
    </CardContent>
  </Card>
);

const Timer = ({ minutes, seconds }) => (
  <div className="bg-gradient-to-r from-green-100 to-amber-100 p-6 rounded-xl mb-8">
    <p className="text-center text-lg text-green-800 mb-4">
      Te llamaremos en:
    </p>
    <div className="flex justify-center gap-4 mb-4 relative">
      <AnimatedDecorations position="left" />
      <TimeUnit value={minutes} label="minutos" />
      <TimeUnit value={seconds} label="segundos" />
      <AnimatedDecorations position="right" />
    </div>
    <div className="text-center p-4 bg-[#F69B11] rounded-xl">
      <p className="text-[#FF5C5C] text-lg font-bold uppercase">
        Si no recibe una llamada dentro de 5 minutos, la entrega es gratuita
      </p>
    </div>
  </div>
);

const TimeUnit = ({ value, label }) => (
  <div className="bg-white px-6 py-4 rounded-xl text-center min-w-[120px]">
    <span className="text-3xl font-bold text-green-700 block">
      {value.toString().padStart(2, '0')}
    </span>
    <p className="text-sm text-green-600">{label}</p>
  </div>
);

const AnimatedDecorations = ({ position }) => (
  <div className={`absolute ${position}-2 top-1/2 -translate-y-1/2 flex items-center ${position === 'right' ? 'flex-row-reverse' : ''}`}>
    <div className="relative mx-4">
      <Gift className="w-10 h-10 text-[#F69B11] animate-bounce" />
      <Star className={`absolute -top-2 ${position === 'right' ? '-left-2' : '-right-2'} w-6 h-6 text-[#F69B11] animate-ping`} />
    </div>
    <Star className="w-8 h-8 text-[#F69B11] animate-pulse" />
  </div>
);

const ThankYouPage = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const orderSteps = [
    { icon: CheckCircle2, title: "Pedido realizado", status: "completed", statusText: "Completado" },
    { icon: PhoneCall, title: "Confirmación", status: "current", statusText: "En proceso" },
    { icon: Truck, title: "Entrega", status: "waiting", statusText: "Pendiente" }
  ];

  const recommendedProducts = [
    { id: 1, name: "Jabón Orgánico de Agave Azul", price: "199 MXN", image: "/api/placeholder/200/200", rating: 4.8, origin: "Jalisco" },
    { id: 2, name: "Crema Natural de Nopal y Aloe", price: "299 MXN", image: "/api/placeholder/200/200", rating: 4.9, origin: "Oaxaca" },
    { id: 3, name: "Aceite Esencial de Lavanda", price: "249 MXN", image: "/api/placeholder/200/200", rating: 4.7, origin: "Michoacán" }
  ];

  useEffect(() => {
    // Initialize Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KFDNC77S';
    
    document.head.appendChild(gtmScript);

    return () => {
      // Cleanup if needed
      document.head.removeChild(gtmScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-white shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-5xl font-bold text-green-800 mb-4">
                ¡Muchas gracias!
              </h1>
              <p className="text-lg text-green-700 mb-4">
                ¡Su pedido ha sido aceptado!
              </p>
              <div className="bg-red-600 p-3 rounded-lg">
                <p className="text-white font-bold text-lg mb-1">
                  ¡PROMOCIÓN ESPECIAL!
                </p>
                <p className="text-white">
                  Responde la llamada en 5 minutos y obtén 3x2 en tu próxima compra
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
                  <div className="absolute top-0 left-0 h-full bg-green-500 w-1/3"></div>
                </div>
                <div className="relative flex justify-between">
                  {orderSteps.map((step, index) => (
                    <OrderStep key={index} {...step} />
                  ))}
                </div>
              </div>
            </div>

            <Timer minutes={minutes} seconds={seconds} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ThankYouPage;