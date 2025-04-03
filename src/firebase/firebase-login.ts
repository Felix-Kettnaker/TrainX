import { auth } from './index.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Loading, Notify } from 'quasar';

const login = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    Loading.show();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Loading.hide();
        resolve(userCredential.user);
      })
      .catch((err) => {
        Loading.hide();
        Notify.create({
          type: 'negative',
          message: err.message,
        });
        reject(err.message);
      });
  });
};

export default login;
