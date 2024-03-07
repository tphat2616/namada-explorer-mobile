import React from 'react';
import {tokenQueryKeys} from '../query-keys';
import {getBlockDetail} from '../services';
import {IBlockDetail} from '../types';
import {useQuery} from '@tanstack/react-query';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

const useGetTransactionsDetail = ({height}: {height: string}) => {
  const query = useQuery({
    queryKey: tokenQueryKeys.getBlockDetail({hash: height}),
    queryFn: () => {
      return getBlockDetail({height});
    },
  });

  return query;
};

export default function DetailScreen() {
  const route = useRoute();

  const {
    data: block,
    isError,
    isSuccess,
    isLoading = true,
  } = useGetTransactionsDetail({height: route.params?.height as string});

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const {
    data: {
      height: block_height,
      hash: hash_id,
      time: time,
      signatures: signatures,
      transactions: transactions,
      proposer: proposer,
      moniker: moniker,
      logo_url: logo_url,
    },
  } = block as IBlockDetail;

  const dataTable = [
    {
      title: 'Time',
      value: time,
    },
    {
      title: 'Height',
      value: block_height,
    },
    {title: 'Number of transactions', value: transactions.length},
    {title: 'Block hash', value: hash_id},
    {title: 'Proposer', value: proposer},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Block Header: #${block_height}`}</Text>
      <View style={styles.section}>
        {!isLoading &&
          isSuccess &&
          dataTable.map((item, i) => {
            return (
              <View style={styles.view} key={i}>
                <Text style={styles.title}>{`${item.title}: `}</Text>
                <Text style={styles.text}>{item.value}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
  view: {flexDirection: 'column', alignItems: 'center'},
  section: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
});
