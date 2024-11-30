export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  providerData: {
    providerID: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber?: string;
    photoURL?: string;
  }[];
  stsTokenManager: {
    apiKey: string;
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
    createdAt: number;
    lastLoginAt: number;
    appName: string;
  };
}
