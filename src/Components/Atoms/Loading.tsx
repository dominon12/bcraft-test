import React from "react";
import { BeatLoader } from "react-spinners";

const Loading: React.FC = (): JSX.Element => {
  return (
    <div className="loading">
      <BeatLoader loading={true} color="gray" />
    </div>
  );
};

export default Loading;
