import React, { useState, useEffect } from "react";
import {
  useTheme,
  TextInput,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
  List,
  Tooltip,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { View, ScrollView } from "react-native";
import MainStyleSheet from "@Styles/MainStyleSheet";
import Config from "@Config/Config";
import Utilities from "@Utilities/Utilities";
const Notes = () => {
  const theme = useTheme();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotesLocalStorage().then((notes) => {
      console.log(notes);
      if (notes !== null) {
        setNotes(notes);
      }
    });
    setNote("");
  }, []);

  const handleAddNote = () => {
    let objNote = {
      note: note,
      index: Utilities.getTimeStamp(),
    };
    let updateArray = notes;
    updateArray.push(objNote);
    setNotes(updateArray);
    saveNotesLocalStorage(updateArray);
    setNote("");
  };

  const handleRemoveNote = (index) => {
    let updateNotes = notes;
    updateNotes = Utilities.removeArrayItem(updateNotes, "index", index);
    setNotes(updateNotes);
    saveNotesLocalStorage(updateNotes);
  };

  const saveNotesLocalStorage = async (notes) => {
    try {
      console.log(notes);
      await AsyncStorage.setItem("NotesKey", JSON.stringify(notes));
    } catch (error) {
      console.log(error);
    }
  };

  const getNotesLocalStorage = async () => {
    try {
      const valor = await AsyncStorage.getItem("NotesKey");
      if (valor !== null || valor !== undefined) {
        return JSON.parse(valor);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        ...MainStyleSheet.backView,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          ...MainStyleSheet.frontView,
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={{ ...MainStyleSheet.viewRow, marginVertical: "3%" }}>
          <TextInput
            label="Escribe una nota o recordatorio"
            mode="outlined"
            value={note}
            style={{ width: "85%" }}
            onChangeText={(text) => setNote(text)}
            numberOfLines={3}
            multiline
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="plus"
                onPress={() => handleAddNote()}
                size={30}
                style={{
                  color: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {}}
          />
        </View>
        <Divider />

        <ScrollView>
          {notes.map((note) => {
            return (
              <View key={note.index}>
                <List.Item
                  titleNumberOfLines={3}
                  title={<Text style={{ width: "80%" }}>{note.note}</Text>}
                  right={(props) => (
                    <IconButton
                      icon={() => (
                        <MaterialCommunityIcons
                          name="delete"
                          onPress={() => handleRemoveNote(note.index)}
                          size={20}
                          style={{
                            color: theme.colors.darkRed,
                          }}
                        />
                      )}
                      onPress={() => {}}
                    />
                  )}
                />
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Notes;
