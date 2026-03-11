'use client';

import { OpenTome } from '@/components/ui/icons';
import { PulseRings, TomeSparks } from '../effects';

export function TomeScene() {
  return (
    <div className="relative flex h-85 w-85 items-center justify-center">
      <PulseRings />

      <TomeSparks />

      <div className="relative z-10">
        <OpenTome />
      </div>
    </div>
  );
}
