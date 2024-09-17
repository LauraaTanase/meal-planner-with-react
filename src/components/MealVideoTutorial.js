import React from "react";

const MealVideoTutorial = ({ videoUrl }) => {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="ratio ratio-16x9">
        <iframe
          src={videoUrl.replace("watch?v=", "embed/")}
          title="Video Tutorial"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MealVideoTutorial;
