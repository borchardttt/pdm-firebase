import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import HeaderWithTitle from "@/components/headers/Header";
import addUser from "@/service/hooks/addUser";
import getUsers from "@/service/hooks/getUser";
import deleteUser from "@/service/hooks/deleteUser";
import updateCar from "@/service/hooks/editUser";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";
import FormButtonCancel from "@/components/form/FormButtonCancel";
import FormButtonCreate from "@/components/form/FormButtonCreate";

export default function index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<Omit<Users, "id">>({
    name: "",
    surname: "",
    grade: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<
    Omit<Users, "id"> & { id?: number }
  >({ name: "", surname: "", grade: "" });

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setModalVisible(false);
      setNewUser({ name: "", surname: "", grade: "" });
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleEditUser = async () => {
    try {
      if (currentUser.id) {
        await updateCar(currentUser as Users);
        setModalVisible(false);
        setCurrentUser({ name: "", surname: "", grade: "" });
        const usersData = await getUsers();
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  const openEditModal = (user: Users) => {
    setCurrentUser(user);
    setEditMode(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.view}>
      <HeaderWithTitle
        title="Users Register"
        actionSheetOptions={["Cancel", "About", "Logout"]}
        HideThisPage={false}
      />

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Where that user... 🤔💭"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="black"
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <AntDesign name="pluscircle" size={50} color="gray" />
        </TouchableOpacity>
        <FlatList
          data={users.filter((user) =>
            `${user.name} ${user.surname}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.header}>
                Nome: {`${item.name} ${item.surname}`}
              </Text>
              <Text style={styles.model}>Ano de Nascimento: {item.grade}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <FontAwesome name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <FormInput
              label="Nome"
              value={editMode ? currentUser.name : newUser.name}
              onChangeText={(text) =>
                editMode
                  ? setCurrentUser({ ...currentUser, name: text })
                  : setNewUser({ ...newUser, name: text })
              }
            />
            <FormInput
              label="Sobrenome"
              value={editMode ? currentUser.surname : newUser.surname}
              onChangeText={(text) =>
                editMode
                  ? setCurrentUser({ ...currentUser, surname: text })
                  : setNewUser({ ...newUser, surname: text })
              }
            />
            <FormInput
              label="Ano"
              value={editMode ? currentUser.grade : newUser.grade}
              onChangeText={(text) =>
                editMode
                  ? setCurrentUser({ ...currentUser, grade: text })
                  : setNewUser({ ...newUser, grade: text })
              }
            />

            <FormButtonCreate
              title={editMode ? "Edit That User fella" : "Add that user bro 😘"}
              onPress={editMode ? handleEditUser : handleAddUser}
            />
            <FormButtonCancel
              title="Cancel"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#91c122",
  },
  view: {
    backgroundColor: "#91c122",
  },
  searchBar: {
    padding: 10,
    backgroundColor: "gray",
    margin: 10,
    borderRadius: 5,
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
  },
  item: {
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
  },
  model: {
    fontSize: 30,
    textAlign: "center",
  },
  carPrice: {
    fontSize: 20,
    textAlign: "center",
    color: "lightgreen",
    fontWeight: "bold",
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
  carId: {
    fontSize: 10,
    textAlign: "center",
    color: "lightgray",
  },
  deleteButton: {
    color: "red",
  },
  addButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#91c122",
    padding: 35,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});
