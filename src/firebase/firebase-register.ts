import { auth, db } from './index.ts';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { Loading, Notify } from 'quasar';

import { UserProfile } from 'src/models/user.ts';


async function register(data: {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
}) {
  console.log('Starte Registrierung mit', auth, data);
  Loading.show();

  try {
    // Benutzer in Firebase Auth anlegen
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    if (user) {
      // Firebase Auth Userprofil aktualisieren
      updateProfile(user, {
        displayName: data.first_name + ' ' + data.last_name,
      });
      console.log('Benutzer angelegt: ', user);

      // Benutzerdaten in Firestore anlegen
      const userDocRef = doc(db, 'users', user.uid);
      const userProfileData: Omit<UserProfile, 'uid'> = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        role: 'athlete',
      }
      await setDoc(userDocRef, userProfileData);
      console.log('Benutzerprofil in DB angelegt: ', userProfileData);
      return user;
    }

  }
  catch (err) {
    Notify.create({
      type: 'negative',
      message: err instanceof Error
        ? err.message
        : 'Unbekannter Fehler beim Registrationsprozess.',
    });
  }
  finally {
    Loading.hide();
  }

  // return new Promise((resolve, reject) => {
  //   Loading.show();
  //
  //   createUserWithEmailAndPassword(auth, data.email, data.password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       // Firebase Auth user Profile anlegen
  //       updateProfile(user, {
  //         displayName: data.first_name + ' ' + data.last_name,
  //       });
  //
  //       // Firestore-Eintrag anlegen
  //       const userDocRef = doc(db, 'users', user.uid);
  //       const userProfileData: Omit<UserProfile, 'uid'> = {
  //         firstName: data.first_name,
  //         lastName: data.last_name,
  //         email: data.email,
  //         role: 'athlete',
  //       }
  //       await setDoc(userDocRef, userProfileData);
  //       console.log('Benutzerprofil angelegt: ', userProfileData);
  //
  //       Loading.hide();
  //       resolve(user);
  //     })
  //     .catch((err) => {
  //       Loading.hide();
  //       Notify.create({
  //         type: 'negative',
  //         message: err.message,
  //       });
  //       reject(err.message);
  //     });
  // });
};

export default register;
