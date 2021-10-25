import {
  findMean,
  findMedian,
  findMode,
  findStdDev,
} from "../utils/statistics";
import Card from "./Card";

function Cards({ dataSets }) {
  return (
    <div className="data-container">
      <Card text="Mean" value={findMean(dataSets)} />
      <Card text="Median" value={findMedian(dataSets)} />
      <Card text="StdDev" value={findStdDev(dataSets)} />
      <Card text="Mode" value={findMode(dataSets)} />
    </div>
  );
}

export default Cards;
