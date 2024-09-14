import { configureStore } from '@reduxjs/toolkit';
import RielesReducer from '../Features/RielesReducer'; // Asegúrate de que la ruta es correcta

export const store = configureStore({
  reducer: {
    Rieles: RielesReducer,
  },
});

