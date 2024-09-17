// src/components/MealVideoTutorial.js
import React from "react";

const MealVideoTutorial = ({ videoUrl }) => {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Video Tutorial</h5>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={videoUrl.replace("watch?v=", "embed/")}
            title="Video Tutorial"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MealVideoTutorial;
