import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import firebase from 'firebase';
import UserPermissions from "../utilities/UserPermission";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";
import { Ionicons } from '@expo/vector-icons';

export default class RegisterPage extends Component {
    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: null
        },
        errorMessage: null
    };

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
        /*  
        firebase
              .auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(userCredentials => {
                  return userCredentials.user.updateProfile({
                      displayName: this.state.name
                  });
              })
              .catch(error => this.setState({ errorMessage: error.message }));
       */
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    };

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={this.handlePickAvatar}>
                    <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                    <Ionicons
                        name="ios-add"
                        size={80}
                        color="#FCC"
                    />
                </TouchableOpacity>
                <Text style={{ textTransform: "uppercase", fontSize: 30, fontWeight: 600 }}>Register</Text>
                <View style={styles.errorMessage}>
                    {
                        this.state.errorMessage &&
                        <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
                    }
                </View>

                <View>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            autoCapitalize="none"
                            onChangeText={name => this.setState({user:{...this.state.user, name }})}
                            value={this.state.name}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            autoCapitalize="none"
                            onChangeText={email => this.setState({user:{...this.state.user, email }})}
                            value={this.state.email}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({user:{...this.state.user, password }})}
                            value={this.state.password}
                            style={styles.input}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={this.handleSignUp} style={styles.button}>
                    <Text style={{ color: "#FFF" }}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 30 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text>
                        Already registered? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginTop: 10,
        marginHorizontal: 30,
        backgroundColor: "#FF0099",
        borderRadius: 20,
        height: 40,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    errorMessage: {
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});