import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './security/AuthProvider';
import WelcomeNavigation from './navigation/WelcomeNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <WelcomeNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

