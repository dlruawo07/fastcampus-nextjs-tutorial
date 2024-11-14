import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  Firestore,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkZaoNeGd59Sg7TlAfWeWjTfC__DyA_K4",
  authDomain: "my-article-a9742.firebaseapp.com",
  projectId: "my-article-a9742",
  storageBucket: "my-article-a9742.firebasestorage.app",
  messagingSenderId: "467485099574",
  appId: "1:467485099574:web:b8d0f84f91ee155d3eba97",
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

  async getData(collections: string, key: string, value: string) {
    const querySnapshot = await getDocs(
      query(collection(db, collections), where(key, "==", value))
    );

    let result: any = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }
}

const addDocuments = () => {
  addDoc(collection(db, ""), {});
};
