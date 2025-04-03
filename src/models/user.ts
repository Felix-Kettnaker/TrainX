// src/models/user.ts
export interface UserProfile {
  uid: string; // Firebase Auth UID
  firstName: string;
  lastName: string;
  email: string;
  role: 'trainer' | 'athlete'; // Oder spezifischere Rollen
  // Evtl. später: teamId, etc.
}
