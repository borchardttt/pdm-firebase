import { getDatabase, ref, push } from "firebase/database";
import { db } from "@/firebaseConfig";

const addUser = async (user: Omit<Users, "id">): Promise<void> => {
  const dbRef = ref(db, "/");
  try {
    await push(dbRef, user);
    console.log("Yessir, user registered successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export default addUser;
