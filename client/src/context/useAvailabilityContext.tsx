import { createContext, useContext } from 'react';
interface Slot {
  startTime: string;
  endTime: string;
}
interface AvailabilityI {
  availability: Slot[];
}
const AvailabilityContext = createContext<AvailabilityI>({
  availability: [],
});

export function useAvailability() {
  return useContext(AvailabilityContext);
}
