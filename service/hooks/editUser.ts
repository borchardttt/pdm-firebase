import { ref, update } from "firebase/database";
import { db } from "@/firebaseConfig";

const updateUser = async (user: Users): Promise<void> => {
  const dbRef = ref(db, `${user.id}`);
  try {
    await update(dbRef, {
      name: user.name,
      surname: user.surname,
      grade: user.grade,
    });
    console.log("Yeah! User updated");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default updateUser;
