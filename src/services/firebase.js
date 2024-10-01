
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
    apiKey: "AIzaSyBiZjKGp0502YXB8AtGwiUWMGkgH1N2dNA",
    authDomain: "ecommerce-coffeshop.firebaseapp.com",
    projectId: "ecommerce-coffeshop",
    storageBucket: "ecommerce-coffeshop.appspot.com",
    messagingSenderId: "605455334094",
    appId: "1:605455334094:web:a20244685245fc392eee9f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };