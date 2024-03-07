import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type IExplorerCardProps = {
  title: string;
  value?: string | number;
  prefixValue?: string;
  chart?: React.ReactNode;
};

export const ExplorerCard = ({
  title,
  value,
  prefixValue,
  chart,
}: IExplorerCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 120,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'yellow',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
