import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  Firestore,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

export const db = getFirestore(app);

export class Database {
  constructor(db: Firestore) {
    this.db = db;
  }
  private readonly db: Firestore;

  async addData<T extends object>(collections: string, data: T) {
    return addDoc(collection(this.db, collections), data);
  }

  async setData<T extends object>(collections: string, key: string, data: T) {
    return setDoc(doc(this.db, collections, key), data);
  }

  async getData(collections: string, key: string, value: string) {
    const querySnapshot = await getDocs(
      query(collection(this.db, collections), where(key, "==", value))
    );

    let result: any = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }

  async getAllData(collections: string) {
    const querySnapshot = await getDocs(collection(this.db, collections));

    let result: any = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }
}
