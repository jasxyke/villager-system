import React from 'react';
import { SafeAreaView } from 'react-native';
import PermitForm from '../../components/forms/PermitForm';
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabsGradient />
      <AppHeader />
      <PermitForm />
    </SafeAreaView>
  );
};

export default App;
