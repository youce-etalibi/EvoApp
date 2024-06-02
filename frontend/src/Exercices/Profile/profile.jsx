import { Fragment } from "react";
import DataProfile from "./dataProfile/dataProfile";
import WeightTracking from "./weightTracking/weightTracking";

export default function Profile() {
  return (
    <Fragment>
      <div className="parentCategoriresExercices">
        <DataProfile />
        <WeightTracking />
        <br /><br /><br /><br />
      </div>
    </Fragment>
  );
}
