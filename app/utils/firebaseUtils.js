import { auth } from "../hook/firebase";
import { getDatabase, ref, set } from "firebase/database";


const createUserAccount = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user);
        const database = getDatabase();
        const userId = 1;
        set(ref(database, `users/${3}`), {
          email: email
        });
      })
      .catch(error => alert(error.message))
}

export {createUserAccount}