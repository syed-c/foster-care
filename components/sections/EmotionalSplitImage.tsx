'use client';

export const EmotionalSplitImage = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center max-w-3xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-md overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Diverse group of happy children and foster parents" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-text-charcoal mb-3 font-heading">
              Where Love Meets Legacy
            </h2>
            
            <p className="text-sm text-gray-700 mb-3 font-body">
              Fostering isn't just about providing a roof over someone's head—it's about giving children 
              the stability, security, and unconditional love they deserve to thrive.
            </p>
            
            <p className="text-sm text-gray-700 font-body">
              Every child deserves a safe, nurturing environment where they can grow, learn, and flourish. 
              Our platform helps connect you with agencies that understand your unique needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};