import ApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartMsg = styled.p`
  color: red;
`;
interface IRange {
  dist_5: number;
  dist_10: number;
  dist_15: number;
  dist_20: number;
  dist_25: number;
  dist_30: number;
  dist_35: number;
  dist_40: number;
  dist_45: number;
  dist_50: number;
  dist_60: number;
  dist_70: number;
  dist_80: number;
  dist_90: number;
  dist_100: number;
  dist_150: number;
  dist_200: number;
  dist_250: number;
}

interface IAmmo {
  capacity_magazine: number;
  capacity_spare: number;
  damage: number;
  damage_range: IRange[];
  effectiverange: number;
  id: number;
  muzzle_velocity: number;
  price_ammo: number;
  type: string;
  verticalrecoil: number;
  weapon: number[];
}

interface IDamageRangeChart {
  LName: string | undefined;
  RName: string | undefined;
  LCategory: string | undefined;
  RCategory: string | undefined;
  LAmmo: IAmmo | null;
  RAmmo: IAmmo | null;
}

function DamageRangeChart({
  LName,
  RName,
  LCategory,
  RCategory,
  LAmmo,
  RAmmo,
}: IDamageRangeChart) {
  if (LAmmo?.damage_range.length === 0) {
    return (
      <ChartMsg>{`Sorry, there is no damage-distance data for ${LName} [${LAmmo.type}]. Try another ammo.`}</ChartMsg>
    );
  }
  if (RAmmo?.damage_range.length === 0) {
    return (
      <ChartMsg>{`Sorry, there is no damage-distance data for ${RName} [${RAmmo.type}]. Try another ammo.`}</ChartMsg>
    );
  }
  if (LAmmo && RAmmo) {
    if (LCategory === "shotgun" && RCategory === "shotgun") {
      let lDamageRange = Object.values(LAmmo.damage_range[0]);
      lDamageRange.splice(10, 8);
      lDamageRange.unshift(null);
      let rDamageRange = Object.values(RAmmo.damage_range[0]);
      rDamageRange.splice(10, 8);
      rDamageRange.unshift(null);
      for (let i = 0; i < lDamageRange.length; i++) {
        if (lDamageRange[i] > 150) {
          lDamageRange[i] = 150;
        }
        if (rDamageRange[i] > 150) {
          rDamageRange[i] = 150;
        }
      }
      return (
        <ApexChart
          type="line"
          series={[
            {
              name: `${LName} [${LAmmo.type}]`,
              data: lDamageRange ?? [],
            },
            {
              name: `${RName} [${RAmmo.type}]`,
              data: rDamageRange ?? [],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            colors: ["#e84118", "#16a085"],
            grid: {
              show: true,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
              offsetY: 7,
            },
            markers: {
              size: [4, 4],
              colors: ["#e84118", "#1abc9c"],
            },
            stroke: {
              curve: "straight",
              lineCap: "round",
              colors: ["#c23616", "#16a085"],
              width: 2,
            },
            title: {
              text: `${LName} [${LAmmo.type}] vs ${RName} [${RAmmo.type}]`,
              align: "center",
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: true,
                formatter: function (v) {
                  return `Distance: ${v} m`;
                },
              },
            },
            xaxis: {
              title: {
                text: "Distance",
              },
              type: "numeric",
              categories: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
              crosshairs: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: "Damage",
              },
              tickAmount: 6,
              min: 0,
              max: 150,
            },
          }}
        />
      );
    } else {
      let lDamageRange = Object.values(LAmmo.damage_range[0]);
      lDamageRange.unshift(null);
      let rDamageRange = Object.values(RAmmo.damage_range[0]);
      rDamageRange.unshift(null);
      for (let i = 0; i < lDamageRange.length; i++) {
        if (lDamageRange[i] > 150) {
          lDamageRange[i] = 150;
        }
        if (rDamageRange[i] > 150) {
          rDamageRange[i] = 150;
        }
      }
      return (
        <ApexChart
          type="line"
          series={[
            {
              name: `${LName} [${LAmmo.type}]`,
              data: lDamageRange ?? [],
            },
            {
              name: `${RName} [${RAmmo.type}]`,
              data: rDamageRange ?? [],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            colors: ["#e84118", "#16a085"],
            grid: {
              show: true,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
              offsetY: 7,
            },
            markers: {
              size: [4, 4],
              colors: ["#e84118", "#1abc9c"],
            },
            stroke: {
              curve: "straight",
              lineCap: "round",
              colors: ["#c23616", "#16a085"],
              width: 2,
            },
            title: {
              text: `${LName} [${LAmmo.type}] vs ${RName} [${RAmmo.type}]`,
              align: "center",
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: true,
                formatter: function (v) {
                  return `Distance: ${v} m`;
                },
              },
            },
            xaxis: {
              title: {
                text: "Distance",
              },
              type: "numeric",
              categories: [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100,
                150, 200, 250,
              ],
              crosshairs: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: "Damage",
              },
              tickAmount: 6,
              min: 0,
              max: 150,
            },
          }}
        />
      );
    }
  }
  if (LAmmo) {
    if (LCategory === "shotgun") {
      let lDamageRange = Object.values(LAmmo.damage_range[0]);
      lDamageRange.splice(10, 8);
      lDamageRange.unshift(null);
      for (let i = 0; i < lDamageRange.length; i++) {
        if (lDamageRange[i] > 150) {
          lDamageRange[i] = 150;
        }
      }
      return (
        <ApexChart
          type="line"
          series={[
            {
              name: `${LName} [${LAmmo.type}]`,
              data: lDamageRange ?? [],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            colors: ["#e84118"],
            grid: {
              show: true,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
              offsetY: 7,
            },
            markers: {
              size: [4, 4],
              colors: ["#e84118"],
            },
            stroke: {
              curve: "straight",
              lineCap: "round",
              colors: ["#c23616"],
              width: 2,
            },
            title: {
              text: `${LName} [${LAmmo.type}]`,
              align: "center",
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: true,
                formatter: function (v) {
                  return `Distance: ${v} m`;
                },
              },
            },
            xaxis: {
              title: {
                text: "Distance",
              },
              type: "numeric",
              categories: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
              crosshairs: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: "Damage",
              },
              tickAmount: 6,
              min: 0,
              max: 150,
            },
          }}
        />
      );
    } else {
      let lDamageRange = Object.values(LAmmo.damage_range[0]);
      lDamageRange.unshift(null);
      for (let i = 0; i < lDamageRange.length; i++) {
        if (lDamageRange[i] > 150) {
          lDamageRange[i] = 150;
        }
      }
      return (
        <ApexChart
          type="line"
          series={[
            {
              name: `${LName} [${LAmmo.type}]`,
              data: lDamageRange ?? [],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            colors: ["#e84118"],
            grid: {
              show: true,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
              offsetY: 7,
            },
            markers: {
              size: [4, 4],
              colors: ["#e84118"],
            },
            stroke: {
              curve: "straight",
              lineCap: "round",
              colors: ["#c23616"],
              width: 2,
            },
            title: {
              text: `${LName} [${LAmmo.type}]`,
              align: "center",
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: true,
                formatter: function (v) {
                  return `Distance: ${v} m`;
                },
              },
            },
            xaxis: {
              title: {
                text: "Distance",
              },
              type: "numeric",
              categories: [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100,
                150, 200, 250,
              ],
              crosshairs: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: "Damage",
              },
              tickAmount: 6,
              min: 0,
              max: 150,
            },
          }}
        />
      );
    }
  }
  if (RAmmo) {
    if (RCategory === "shotgun") {
      let rDamageRange = Object.values(RAmmo.damage_range[0]);
      rDamageRange.splice(10, 8);
      rDamageRange.unshift(null);
      for (let i = 0; i < rDamageRange.length; i++) {
        if (rDamageRange[i] > 150) {
          rDamageRange[i] = 150;
        }
      }
      return (
        <ApexChart
          type="line"
          series={[
            {
              name: `${RName} [${RAmmo.type}]`,
              data: rDamageRange ?? [],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            colors: ["#1abc9c"],
            grid: {
              show: true,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
              offsetY: 7,
            },
            markers: {
              size: [4, 4],
              colors: ["#1abc9c"],
            },
            stroke: {
              curve: "straight",
              lineCap: "round",
              colors: ["#16a085"],
              width: 2,
            },
            title: {
              text: `${RName} [${RAmmo.type}]`,
              align: "center",
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: true,
                formatter: function (v) {
                  return `Distance: ${v} m`;
                },
              },
            },
            xaxis: {
              title: {
                text: "Distance",
              },
              type: "numeric",
              categories: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
              crosshairs: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: "Damage",
              },
              tickAmount: 6,
              min: 0,
              max: 150,
            },
          }}
        />
      );
    } else {
      let rDamageRange = Object.values(RAmmo.damage_range[0]);
      rDamageRange.unshift(null);
      for (let i = 0; i < rDamageRange.length; i++) {
        if (rDamageRange[i] > 150) {
          rDamageRange[i] = 150;
        }
      }
      return (
        <ApexChart
          type="line"
          series={[
            {
              name: `${RName} [${RAmmo.type}]`,
              data: rDamageRange ?? [],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            colors: ["#1abc9c"],
            grid: {
              show: true,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
              offsetY: 7,
            },
            markers: {
              size: [4, 4],
              colors: ["#1abc9c"],
            },
            stroke: {
              curve: "straight",
              lineCap: "round",
              colors: ["#16a085"],
              width: 2,
            },
            title: {
              text: `${RName} [${RAmmo.type}]`,
              align: "center",
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            tooltip: {
              enabled: true,
              x: {
                show: true,
                formatter: function (v) {
                  return `Distance: ${v} m`;
                },
              },
            },
            xaxis: {
              title: {
                text: "Distance",
              },
              type: "numeric",
              categories: [
                0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100,
                150, 200, 250,
              ],
              crosshairs: {
                show: true,
              },
            },
            yaxis: {
              title: {
                text: "Damage",
              },
              tickAmount: 6,
              min: 0,
              max: 150,
            },
          }}
        />
      );
    }
  }
  return <p>{"something wrong! :("}</p>;
}

export default DamageRangeChart;
