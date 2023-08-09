import React, {useCallback} from 'react';
import {
  FrontFinance,
  FrontPayload,
  TransferFinishedPayload,
} from '@front-finance/frontfinance-rn-sdk';
import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

export const ExampleScreen = () => {
  const [iframeUrl, setIframeUrl] = React.useState<string>('https://');
  const [isValidURL, setIsValidURL] = React.useState<boolean>(false);

  const checkIframeUrlValidity = useCallback((url: string) => {
    // match with a proper http or https url
    const regex = new RegExp(
      '^(http|https)://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
      'i',
    );

    const isValidUrl = regex.test(url);

    setIsValidURL(isValidUrl);
  }, []);

  if (!isValidURL) {
    return (
      <SafeAreaView>
        <View style={{padding: 20}}>
          <Text>
            The connection link for brokerage connection should be obtained from
            the Get catalog link endpoint.
          </Text>
          <Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL(iframeUrl)}>
              Get catalog link
            </Text>
          </Text>
          <View style={{height: 10}} />
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            textContentType={'URL'}
            value={iframeUrl}
            placeholder={'Enter iframe url'}
            onChangeText={setIframeUrl}
          />
          <View style={{height: 10}} />
          <Button
            title={'Connect'}
            onPress={() => checkIframeUrlValidity(iframeUrl)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <FrontFinance
        url={iframeUrl}
        onBrokerConnected={(payload: FrontPayload) => {
          // use broker account data
          console.log('broker connected', payload);
          Alert.alert('Broker connected', JSON.stringify(payload));
        }}
        onTransferFinished={(payload: TransferFinishedPayload) => {
          // use transfer finished data
          console.log('transfer finished', payload);
          Alert.alert('Transfer finished', JSON.stringify(payload));
        }}
        onClose={() => {
          // use close event
          console.log('close event');
        }}
        onError={(err: string) => {
          // use error message
          console.log(err);
          Alert.alert('Error', err);
        }}
      />
    </>
  );
};
