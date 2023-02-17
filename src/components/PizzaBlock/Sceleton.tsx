import React from "react";
import ContentLoader from "react-content-loader";

export const Sceleton = () => (
  <ContentLoader
    className={"pizza-block"}
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="-1" y="297" rx="10" ry="10" width="280" height="26" />
    <rect x="2" y="342" rx="0" ry="0" width="273" height="84" />
    <rect x="-2" y="456" rx="10" ry="10" width="95" height="27" />
    <rect x="128" y="444" rx="10" ry="10" width="173" height="60" />
  </ContentLoader>
);
