import React, { useEffect, useState } from "react";
import {
  View,
  Grid,
  Flex,
  Card,
  Placeholder,
  useTheme,
} from "@aws-amplify/ui-react";
import { MdRemoveRedEye, MdWeb, MdPermIdentity } from "react-icons/md";

import MiniStatistics from "./MiniStatistics";
import TrafficSources from "./TrafficSources";
import TrafficSummary from "./TrafficSummary"; // Conservamos TrafficSummary para el tráfico de citas médicas
import "./Dashboard.css";

const Dashboard = () => {
  const [trafficSourceData, setTrafficSourceData] = useState<any | null>(null);
  const { tokens } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/profesionales");
        const data = await response.json();

        const specialtiesCount = {};

        data.forEach(professional => {
          const specialty = professional.especialidad;
          if (specialty in specialtiesCount) {
            specialtiesCount[specialty] += 1;
          } else {
            specialtiesCount[specialty] = 1;
          }
        });

        const specialtiesData = Object.keys(specialtiesCount).map(specialty => ({
          name: specialty,
          value: specialtiesCount[specialty],
        }));

        setTrafficSourceData(specialtiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const barChartData = [
    {
      name: "Mobile apps",
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      name: "Websites",
      data: [150, 250, 350, 450, 550, 650, 750, 850, 950],
    },
  ];

  return (
    <>
      <div>
        <h2>Dashboard</h2>
      </div>
      <View borderRadius="6px" maxWidth="100%" padding="0rem" minHeight="100vh">
        <Grid
          templateColumns={{ base: "1fr", large: "1fr 1fr 1fr" }}
          templateRows={{ base: "repeat(4, 10rem)", large: "repeat(3, 8rem)" }}
          gap={tokens.space.xl}
        >
          <View className="grid-item">
            <MiniStatistics
              title="Total Citas Medicas"
              amount="321,236"
              icon={<MdRemoveRedEye />}
            />
          </View>
          <View className="grid-item">
            <MiniStatistics title="Confirmadas" amount="251,607" icon={<MdWeb />} />
          </View>
          <View className="grid-item">
            <MiniStatistics
              title="Canceladas"
              amount="23,762"
              icon={<MdPermIdentity />}
            />
          </View>

          <View className="grid-item" style={{ gridColumn: "span 2" }}>
            <Card borderRadius="15px" width="100%">
              <div className="card-title">Trafico de citas medicas</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <TrafficSummary
                    title="Trafico de citas medicas"
                    data={barChartData}
                    type="bar"
                    labels={[
                      "2024-01-01",
                      "2024-02-01",
                      "2024-03-01",
                      "2024-04-01",
                      "2024-05-01",
                      "2024-06-01",
                      "2024-07-01",
                      "2024-08-01",
                      "2024-09-01",
                    ]}
                  />
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>
          <View className="grid-item">
  <Card height="270%" borderRadius="15px" width="80%" style={{ marginRight: "-10px" }}>
    <div className="card-title">Doctores de Áreas Médicas</div>
    <div className="chart-wrap">
      {trafficSourceData ? (
        <TrafficSources
          title="Áreas médicas"
          data={trafficSourceData.map(item => item.value)}
          type="donut"
          labels={trafficSourceData.map(item => item.name)}
        />
      ) : (
        <Flex direction="column" minHeight="55px">
          <Placeholder size="small" />
          <Placeholder size="small" />
          <Placeholder size="small" />
          <Placeholder size="small" />
        </Flex>
      )}
    </div>
  </Card>
</View>
        </Grid>
      </View>
    </>
  );
};

export default Dashboard;