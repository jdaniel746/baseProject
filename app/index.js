import { LogBox, Text } from 'react-native';
import { persistor, store } from 'app/store';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Utils from '@utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './navigation';
Utils.setupLayoutAnimation();
LogBox.ignoreAllLogs(true);
import Home from '@screens/Home';

const Mazi = () => {
  return (

        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/*<SafeAreaProvider>*/}
            <App/>
              {/*<Text style={{fontSize: 40}}>epale</Text>*/}
          {/*</SafeAreaProvider>*/}
        </PersistGate>
      </Provider>
  );
};

export default Mazi;
