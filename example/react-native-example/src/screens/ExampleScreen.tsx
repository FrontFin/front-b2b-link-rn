import React from 'react';
import {
  FrontFinance,
  FrontPayload,
  TransferFinishedPayload,
} from '@front-finance/frontfinance-rn-sdk';
import {Alert} from 'react-native';

export const ExampleScreen = () => {
  return (
    <>
      <FrontFinance
        url={'iFrameURL'}
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
