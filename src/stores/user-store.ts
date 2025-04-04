import { defineStore } from 'pinia';
import { UserProfile } from 'src/models/user';


export const useUserStore = defineStore('user', {
  state: () => ({
    counter: 0,
    userProfile: null as UserProfile | null,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    isUserProfileLoaded: (state) => !!state.userProfile
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
