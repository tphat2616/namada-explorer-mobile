import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import {tokenQueryKeys} from '../query-keys';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getLatestProposals} from '../services';
import {useMemo} from 'react';
import {Proposal} from '@/types';

const useGetProposals = () => {
  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: tokenQueryKeys.proposals(),
    queryFn: () => {
      return getLatestProposals();
    },
    getNextPageParam: () => {
      return undefined;
    },
  });

  return query;
};

export default function ProposalScreen() {
  const {data, isLoading, isFetching, fetchNextPage, hasNextPage} =
    useGetProposals();

  const proposals = useMemo(
    () => (data ? data.pages.flatMap(page => page.data.proposals) : []),
    [data],
  ) as Proposal[];

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{gap: 8}}
        data={proposals}
        renderItem={({item}) => {
          return (
            <View style={styles.section}>
              <Text style={styles.title}>{`#${item.proposal_id}`}</Text>
              <Text style={styles.text}>{`Author: ${item.author}`}</Text>
              <Text
                style={styles.text}>{`Start Epoch: ${item.start_epoch}`}</Text>
              <Text style={styles.text}>{`End Epoch: ${item.end_epoch}`}</Text>
              <Text style={styles.text}>{`Type: ${item.type}`}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.proposal_id.toString()}
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
