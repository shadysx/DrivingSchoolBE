import { View, Text } from "react-native";
import React from "react";
import { Menu, Divider, Button, IconButton } from "react-native-paper";
import { useAuth } from "../auth/Auth";

const SettingsMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { handleLogout } = useAuth();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu visible={visible} onDismiss={closeMenu}  anchor={<IconButton icon="cog" iconColor={"white"} size={30} onPress={openMenu}/>}>
        <Menu.Item onPress={() => {}} title="Nous contacter" leadingIcon={"send"}/>
        <Menu.Item onPress={() => {}} title="A propos de nous" leadingIcon={"information"}/>
        <Menu.Item onPress={() => handleLogout()} title="Se déconnecter" leadingIcon={"logout"}/>
      </Menu>
    </View>
  );
};

export default SettingsMenu;
