import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc
} from "firebase/firestore";
import { app } from "./config";


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export const getProducts = async (setProducts) => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = []

    querySnapshot.forEach((doc) => {
        products.push(doc.data());
    });
    setProducts(products)
}

const docRef = doc(db, "products", "sf");
const docSnap = await getDoc(docRef);


export const getSingleProduct = async (id, setProducts) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       setProducts(docSnap.data())
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
