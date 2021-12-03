import React from "react";
import { BeatLoader } from "react-spinners";

import "./Loading.scss";

const Loading: React.FC = (): JSX.Element => {
  return (
    <div className="loading">
      <BeatLoader loading={true} color="gray" />
    </div>
  );
};

export default Loading;
