import { useEffect, useState, createContext, FunctionComponent, useContext } from 'react';
import { useSnackBar } from './useSnackbarContext';
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
