import React, { memo } from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return <GridLoader color="#ee3131" />;
};

export default memo(Loading);
