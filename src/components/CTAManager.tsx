'use client';

import React, { createContext, useContext, useState } from 'react';
import DemoRequestModal from './DemoRequestModal';
import ConsultationRequestModal from './ConsultationRequestModal';

interface CTAManagerContextType {
  openDemoModal: () => void;
  openConsultationModal: () => void;
}

const CTAManagerContext = createContext<CTAManagerContextType | undefined>(undefined);

export function CTAManagerProvider({ children }: { children: React.ReactNode }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const openConsultationModal = () => setIsConsultationModalOpen(true);

  return (
    <CTAManagerContext.Provider value={{ openDemoModal, openConsultationModal }}>
      {children}
      <DemoRequestModal isOpen={isDemoModalOpen} onCloseAction={() => setIsDemoModalOpen(false)} />
      <ConsultationRequestModal isOpen={isConsultationModalOpen} onCloseAction={() => setIsConsultationModalOpen(false)} />
    </CTAManagerContext.Provider>
  );
}

export function useCTA() {
  const context = useContext(CTAManagerContext);
  if (context === undefined) {
    throw new Error('useCTA must be used within a CTAManagerProvider');
  }
  return context;
}