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
import SalesSummary from "./SalesSummary";
import TrafficSummary from "./TrafficSummary";
import CustomersSummary from "./CustomersSummary";

import "./Dashboard.css";

const Dashboard = () => {
  const [trafficSourceData, setTrafficSourceData] = useState<any | null>(null);
  const { tokens } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la petición HTTP para obtener datos de especialidades médicas
        const response = await fetch("https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/profesionales");
        const data = await response.json();

        // Procesar los datos para obtener las especialidades médicas y sus conteos
        const specialtiesCount = {};

        data.forEach(professional => {
          const specialty = professional.especialidad;
          if (specialty in specialtiesCount) {
            specialtiesCount[specialty] += 1;
          } else {
            specialtiesCount[specialty] = 1;
          }
        });

        // Preparar los datos para el gráfico de dona
        const specialtiesData = Object.keys(specialtiesCount).map(specialty => ({
          name: specialty,
          value: specialtiesCount[specialty],
        }));

        // Actualizar el estado con los datos del backend
        setTrafficSourceData(specialtiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  // Datos hardcodeados para otros gráficos
  const barChartData = [
    {
      name: "Mobile apps",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
    {
      name: "Websites",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    },
  ];

  const lineChartData = [
    {
      name: "Mobile apps",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
    {
      name: "Websites",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    },
  ];

  const customersData = [
    {
      name: "New Customers",
      data: [50, 60, 140, 190, 180, 230],
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
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Total Citas Medicas"
              amount="321,236"
              icon={<MdRemoveRedEye />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics title="Confirmadas" amount="251,607" icon={<MdWeb />} />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Canceladas"
              amount="23,762"
              icon={<MdPermIdentity />}
            />
          </View>

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Trafico de citas medicas</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <TrafficSummary
                      title="Trafico de citas medicas"
                      data={barChartData}
                      type="bar"
                      labels={[
                        "2022-01-20",
                        "2022-01-21",
                        "2022-01-22",
                        "2022-01-23",
                        "2022-01-24",
                        "2022-01-25",
                        "2022-01-26",
                        "2022-01-27",
                        "2022-01-28",
                        "2022-01-29",
                        "2022-01-30",
                        "2022-02-01",
                        "2022-02-02",
                        "2022-02-03",
                        "2022-02-04",
                        "2022-02-05",
                        "2022-02-06",
                        "2022-02-07",
                        "2022-02-08",
                        "2022-02-09",
                        "2022-02-10",
                        "2022-02-11",
                        "2022-02-12",
                        "2022-02-13",
                        "2022-02-14",
                        "2022-02-15",
                        "2022-02-16",
                        "2022-02-17",
                        "2022-02-18",
                        "2022-02-19",
                        "2022-02-20",
                        "2022-02-21",
                        "2022-02-22",
                        "2022-02-23",
                        "2022-02-24",
                        "2022-02-25",
                        "2022-02-26",
                      ]}
                    />
                  </div>
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
          <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
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

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Sales Summary</div>
              <div className="chart-wrap">
                {lineChartData ? (
                  <div className="row">
                    <SalesSummary
                      title="Sales Summary"
                      data={lineChartData}
                      type="line"
                      labels={[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ]}
                    />
                  </div>
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

          <View rowSpan={{ base: 1, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Customers Summary</div>
              <div className="chart-wrap">
                {customersData ? (
                  <div className="row">
                    <CustomersSummary
                      title="Customers Summary"
                      data={customersData}
                      type="area"
                      labels={[
                        "2022-01-20",
                        "2022-01-21",
                        "2022-01-22",
                        "2022-01-23",
                        "2022-01-24",
                        "2022-01-25",
                      ]}
                    />
                  </div>
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
        </Grid>
      </View>
    </>
  );
};

export default Dashboard;
