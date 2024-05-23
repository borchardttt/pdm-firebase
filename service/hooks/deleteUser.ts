import { getDatabase, ref, remove } from "firebase/database";
import { db } from "@/firebaseConfig";

const deleteUser = async (userId: number): Promise<void> => {
  const dbRef = ref(db, `/${userId}`);
  try {
    await remove(dbRef);
    console.log(`Hell yeah! User with id ${userId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default deleteUser;
