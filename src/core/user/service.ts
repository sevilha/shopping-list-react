import { User } from "./entity";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface UseCases {
  getUser(uid: string): User;
  updateUser(user: User): void;
  removeUser(uid: string): Promise<boolean>;
  register(email: string, password: string): void;
  authentication(email: string, password: string): Promise<boolean>;
  out(): void;
}

export class UserService implements UseCases {

  private auth;

  constructor() {
    this.auth = getAuth();
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

      });
  }

  async authentication(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }

  out() {
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  getUser(): User {
    const user = this.auth.currentUser;
    if (user !== null) {
      const { uid, displayName, email } = user;
      return { uid, displayName, email } as User;
    }
    return {} as User;
  }

  updateUser(user: User): void {
    
  }

  async removeUser(uid: string): Promise<boolean> {
    const user = this.auth.currentUser;

    if (user) {
      return await user.delete()
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false
        });
    }
    return false;
  }
}