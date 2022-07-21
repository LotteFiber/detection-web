import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/9811-loading.json";

function Loading({ isLoading }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (!isLoading) {
    return (
      <div style={{ display: "block" }} className="modal">
        <div className="modal-content cl-modal">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Loading;
