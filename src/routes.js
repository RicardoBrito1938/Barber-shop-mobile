import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    const signed = useSelector(state => state.auth.signed);

    function New({navigation}) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                        marginLeft: 20,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Agendamentos')}>
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}>
                <Stack.Screen
                    name="Selecione o Prestador"
                    component={SelectProvider}
                />
                <Stack.Screen
                    name="SelectDateTime"
                    component={SelectDateTime}
                    options={{
                        title: 'Seleciona o horario',
                    }}
                />
                <Stack.Screen name="Confirm" component={Confirm} />
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {signed == false ? (
                <Stack.Navigator initialRouteName="SignIn" headerMode="none">
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            ) : (
                <Tab.Navigator
                    tabBarOptions={{
                        keyboardHidesTabBar: true,
                        activeTintColor: '#fff',
                        inactiveTintColor: 'rgba(255,255,255,0.6)',
                        style: {
                            backgroundColor: '#8d41a8',
                        },
                    }}>
                    <Tab.Screen
                        name="Agendamentos"
                        component={Dashboard}
                        options={{
                            tabBarIcon: ({color}) => (
                                <Icon name="event" size={20} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Agendar"
                        component={New}
                        options={{
                            tabBarVisible: false,
                            tabBarIcon: ({color}) => (
                                <Icon
                                    name="add-circle-outline"
                                    size={20}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Meu Perfil"
                        component={Profile}
                        options={{
                            tabBarIcon: ({color}) => (
                                <Icon name="person" size={20} color={color} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}
