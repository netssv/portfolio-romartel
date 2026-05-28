"use client";

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

interface ClarityTrackerProps {
  projectId: string;
}

export function ClarityTracker({ projectId }: ClarityTrackerProps) {
  useEffect(() => {
    if (projectId) {
      Clarity.init(projectId);
      
      // We can also initialize cookie consent here if needed
      // Clarity.consentV2(); 
    }
  }, [projectId]);

  return null;
}
