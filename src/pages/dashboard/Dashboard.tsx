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
  const [appointmentData, setAppointmentData] = useState<any | null>(null);
  const { tokens } = useTheme();
  const userType = localStorage.getItem("userType");

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/citas/todasP", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const finalizedAppointments = data.filter(appointment => appointment.estado === "Finalizada");

        const appointmentsCountByDate = finalizedAppointments.reduce((acc, appointment) => {
          const date = appointment.fecha;
          if (acc[date]) {
            acc[date] += 1;
          } else {
            acc[date] = 1;
          }
          return acc;
        }, {});

        const chartData = Object.keys(appointmentsCountByDate).map(date => ({
          date,
          count: appointmentsCountByDate[date],
        }));

        setAppointmentData(chartData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (userType === "profesional") {
      fetchAppointments();
    }
  }, [userType]);

  const barChartData = userType === "profesional" && appointmentData
    ? [{
        name: "Citas Finalizadas",
        data: appointmentData.map(item => item.count),
      }]
    : [
      {
        name: "Reservas Por App Movil",
        data: [100, 200, 300, 250, 200, 300, 400, 300, 300],
      },
      {
        name: "Reservas Por Otro Medio",
        data: [150, 150, 100, 150, 100, 75, 75, 60, 50],
      },
    ];

  const chartLabels = userType === "profesional" && appointmentData
    ? appointmentData.map(item => item.date)
    : [
        "2024-01-01",
        "2024-02-01",
        "2024-03-01",
        "2024-04-01",
        "2024-05-01",
        "2024-06-01",
        "2024-07-01",
        "2024-08-01",
        "2024-09-01",
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
                    labels={chartLabels}
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