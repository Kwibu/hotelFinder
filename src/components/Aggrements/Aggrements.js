/** @format */

import React from "react";
import managerSVG from "../../assets/Illustrations/Group 102.png";
import customerSVG from "../../assets/Illustrations/Group 100.png";
import "./Aggrements.css";

export default function Aggrements() {
  const aggrements = [
    {
      title: "Manager Guidance",
      subtitle:
        "While you need to create hotel you need to create your account and get dashboard where you get all control and there you have to make payement inorder to create hotel that will be visible to the users",
      illustration: managerSVG,
    },
    {
      title: "Customer Guidance",
      subtitle:
        "Inorder to find the hotels that around you, you have to click on 'View Map' and map will give you all solution you need and if you want to make reservation there you have to foll the conventions about tha specific hotel",
      illustration: customerSVG,
    },
  ];
  const aggrementsMapped = aggrements.map((aggrement, i) => {
    return (
      <div key={i} className="aggrements">
        <div className="aggrements-svg">
          <img src={aggrement.illustration} alt={aggrement.title} />
        </div>
        <div className="aggrements-title">{aggrement.title}</div>
        <div className="aggrements-subtitle">{aggrement.subtitle}</div>
      </div>
    );
  });
  return (
    <div className="aggrements-container">
      <div className="aggrement-bigtitle">Aggrements</div>
      {aggrementsMapped}
    </div>
  );
}
