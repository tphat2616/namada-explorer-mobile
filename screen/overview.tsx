import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { tokenQueryKeys } from "../query-keys";
import { getOverview } from "../services";
import { ExplorerCard } from "../components/ExplorerCard";
import Config from "react-native-config";

const useGetOverview = () => {
  const query = useQuery({
    queryKey: tokenQueryKeys.infor(),
    queryFn: () => {
      return getOverview();
    },
  });

  return query;
};

export default function OverviewScreen() {
  const { data: inforOverview } = useGetOverview();

  const count = parseInt(inforOverview?.data.nb_validators || "");
  const total = parseInt(inforOverview?.data.nb_validators || "");
  const percentage = (count / total) * 100;
  const percentageNumber = Number(percentage.toFixed(0));
  const blockHeight = inforOverview?.data.last_height;
  const epoch = inforOverview?.data.epoch;
  const block_time = Number(inforOverview?.data.avg_blocktime).toFixed(2);
  const total_stake = Number(inforOverview?.data.total_stake).toFixed(0);
  const chain = "shielded-expedition.88f17d1d14";

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/image/logo.png")}
        />
        <Text style={styles.title}>OverView</Text>
      </View>
      <View style={styles.scrollview}>
        <View style={styles.section}>
          <ExplorerCard
            value={percentageNumber}
            title={"Number of validators"}
          />
          <ExplorerCard value={total_stake} title={"Total Stake"} />
        </View>
        <View style={styles.section}>
          <ExplorerCard value={chain} title={"Chain ID"} />
          <ExplorerCard value={blockHeight} title={"Latest Block"} />
        </View>
        <View style={styles.section}>
          <ExplorerCard value={epoch} title={"Current Epoch"} />
          <ExplorerCard value={`~ ${block_time}s`} title={"Block Time"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  tinyLogo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  scrollview: { marginTop: 16, gap: 12, backgroundColor: "black" },
  section: {
    width: "100%",
    backgroundColor: "black",
    flexDirection: "row",
    gap: 12,
  },
});
