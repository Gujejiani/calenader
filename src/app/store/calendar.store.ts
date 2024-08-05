import { CalendarEvent } from '@models/calendar-event';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';


type CalendarState = {
  books: CalendarEvent[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: CalendarState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    updateQuery(query: string) {
        patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    }
  })),
);