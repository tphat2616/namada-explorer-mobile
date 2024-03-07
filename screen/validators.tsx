import React from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getValidator} from '../services';
import {tokenQueryKeys} from '../query-keys';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {Validator} from '@/types';

const useGetValidators = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.validator(),
    queryFn: () => {
      return getValidator();
    },
    getNextPageParam: () => {
      return undefined;
    },
  });

  return query;
};

export default function ValidatorScreen() {
  const {data, isLoading} = useGetValidators();

  const validators = useMemo(
    () => (data ? data.pages.flatMap(page => page.data.validators) : []),
    [data],
  ) as Validator[];

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{gap: 8}}
        data={validators}
        renderItem={({item}) => {
          return (
            <View style={styles.section}>
              <Text style={styles.text}>{`Moniker: ${item.moniker}`}</Text>
              <Text style={styles.text}>{`Address: ${item.address}`}</Text>
              <Text
                style={
                  styles.text
                }>{`Commission Rate: ${item.commission_rate}`}</Text>
              <Text style={styles.text}>{`State: ${item.status}`}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.address_hex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  section: {
    borderRadius: 8,
    borderColor: 'yellow',
    backgroundColor: 'black',
    borderWidth: 0.5,
    padding: 8,
    gap: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
