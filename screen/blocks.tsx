import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useInfiniteQuery} from '@tanstack/react-query';
import {tokenQueryKeys} from '../query-keys';
import {getLatestBlocks} from '../services';
import React, {useMemo} from 'react';
import {IBlocks} from '@/types';
import {displayHash} from '../libs/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const useGetBlocks = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.blocks(),
    queryFn: () => {
      return getLatestBlocks();
    },
    getNextPageParam: () => {
      return undefined;
    },
  });

  return query;
};

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const {data, isLoading} = useGetBlocks();

  const blocks = useMemo(
    () => (data ? data.pages.flatMap(page => page.data) : []),
    [data],
  ) as IBlocks[];

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{gap: 8}}
        data={blocks}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('Detail', {
                  height: item.height,
                });
              }}>
              <View style={styles.section}>
                <Text style={styles.title}>{`Height: #${item.height}`}</Text>
                <Text style={styles.text}>{`Hash: ${displayHash(
                  item.hash,
                )}`}</Text>
                <Text
                  style={
                    styles.text
                  }>{`Txs: ${item.transactions.length}`}</Text>
                <Text style={styles.text}>{`Time: ${item.time}`}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.hash}
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
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  section: {
    flex: 1,
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
