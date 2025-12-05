'use client';

import { useState } from 'react';
import { Search, FileText, Users, Calendar, Heart } from 'lucide-react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, isActive, onClick }) => {
  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-teal-50 border-l-2 border-teal-500' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
          isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-sm font-semibold font-heading ${isActive ? 'text-teal-700' : 'text-text-charcoal'}`}>
            {title}
          </h3>
          <p className="mt-1 text-gray-600 text-xs font-body">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: <Search className="w-4 h-4" />,
      title: "Find Your Perfect Match",
      description: "Search our curated directory of fostering agencies.",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      title: "Connect & Apply",
      description: "Reach out directly to agencies that interest you.",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Meet Your Support Team",
      description: "Get matched with dedicated social workers.",
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      title: "Training & Preparation",
      description: "Complete essential training programs.",
    },
    {
      icon: <Heart className="w-4 h-4" />,
      title: "Welcome Your Child",
      description: "Begin your fostering journey with ongoing support.",
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-text-charcoal mb-2 font-heading">
            Your Journey to Making a Difference
          </h2>
          
          <p className="text-sm text-gray-600 max-w-xl mx-auto font-body">
            Becoming a foster parent is one of the most rewarding decisions you'll ever make.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            {/* Steps Navigation */}
            <div className="space-y-2">
              {steps.map((step, index) => (
                <StepCard
                  key={index}
                  icon={step.icon}
                  title={`${index + 1}. ${step.title}`}
                  description={step.description}
                  isActive={activeStep === index}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
            
            {/* Active Step Detail */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-teal-500 flex items-center justify-center text-white">
                  {steps[activeStep].icon}
                </div>
                <h3 className="text-base font-bold text-text-charcoal font-heading">
                  {steps[activeStep].title}
                </h3>
              </div>
              
              <p className="text-gray-700 text-xs font-body mb-3">
                {steps[activeStep].description}
              </p>
              
              <div className="bg-teal-50 rounded-md p-3 border border-teal-100">
                <h4 className="font-semibold text-teal-700 text-xs mb-1 font-heading">Why This Matters</h4>
                <p className="text-gray-700 text-xs font-body">
                  {activeStep === 0 && "Finding the right agency is crucial to your success as a foster parent."}
                  {activeStep === 1 && "Our streamlined process reduces paperwork stress so you can focus on preparing your heart."}
                  {activeStep === 2 && "Building relationships with your support team creates a foundation of trust."}
                  {activeStep === 3 && "Quality training empowers you with the skills needed to provide exceptional care."}
                  {activeStep === 4 && "The moment you welcome your foster child marks the beginning of a transformative journey."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};