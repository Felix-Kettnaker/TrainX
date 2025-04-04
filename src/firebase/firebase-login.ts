import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Loading, Notify } from 'quasar';
import { auth, db } from './index.ts';
import { useUserStore } from 'src/stores/user-store.ts';
import { UserProfile } from 'src/models/user.ts';

async function login(email: string, password: string) {
  Loading.show()

  try {
    // login
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    // userProfile im Store speichern
    const user = userCredential.user
    const userDocRef = doc(db, 'users', user.uid)
    const userProfileDocSnap = await getDoc(userDocRef)
    // INFO: Ort 2/4 wo userProfile im Store gesetzt wird
    useUserStore().userProfile = userProfileDocSnap.data() as UserProfile

    return user
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
}

export default login;
