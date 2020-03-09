import React from 'react';
import {View} from 'react-native';

import {Container, Title} from './styles';
import Background from '~/components/Background';

export default function Profile() {
    return (
        <Background>
            <Container>
                <Title>Perfil</Title>
            </Container>
        </Background>
    );
}
