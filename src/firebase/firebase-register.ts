import { auth } from './index.ts';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Loading, Notify } from 'quasar';

const register = (data: {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
}) => {
  console.log('auth: ', auth);
  console.log('data: ', data);
  return new Promise((resolve, reject) => {
    Loading.show();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.first_name + ' ' + data.last_name,
        });

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

export default register;
