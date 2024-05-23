import { getDatabase, ref, get, child } from "firebase/database";
import { db } from "../../firebaseConfig";

const getUsers = async (): Promise<Users[]> => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "/"));
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const usersList: Users[] = Object.keys(usersData).map((key) => ({
        id: key,
        name: usersData[key].name,
        surname: usersData[key].surname,
        grade: usersData[key].grade,
      }));
      return usersList;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching cars data:", error);
    throw error;
  }
};

export default getUsers;
