import { create } from "zustand";
import {
  UpdateTable,
  getTablesService,
  resetTablesService,
  updateTablesService,
} from "../services/tables";
import { resetTablesInUsersService } from "../services/users.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  tablesArray: [];
  getTables: () => Promise<void>;
  updateTables: (args: UpdateTable[], userId: string) => Promise<void>;
  resetTables: () => Promise<void>;
}

export const UseTableStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    tablesArray: [],
    getTables: async () => {
      set({ isLoading: true });
      try {
        const response = await getTablesService();
        if (!response.data) {
          set({ isLoading: false, errors: true });
        }
        set({ tablesArray: response.data });
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    updateTables: async (arg, userId) => {
      set({ isLoading: true });
      try {
        const res = await updateTablesService(arg, userId);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    resetTables: async () => {
      set({ isLoading: true });
      try {
        const [res, response] = await Promise.all([
          resetTablesService(),
          resetTablesInUsersService(),
        ]);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        if (!response) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
