import React from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaRegFileAlt, FaPencilAlt, FaTrash } from "react-icons/fa";

const OrderTimeLine = (props) => {
  const { orderTimeLine } = props;

  return (
    <Timeline minEvents={5} placeholder>
      {orderTimeLine.map((item, index) => {
        let icon;
        let color;

        if (item.type === "Created") {
          icon = FaRegFileAlt;
          color = "#00CC00"; // Green
        } else if (item.type === "Updated") {
          icon = FaPencilAlt;
          color = "#FFD700"; // Yellow
        } else if (item.type === "Cancelled") {
          icon = FaTrash;
          color = "#FF0033"; // Red
        } else {
          // Default icon and color if type doesn't match
          icon = FaRegFileAlt;
          color = "#000000"; // Default color
        }

        return (
          <TimelineEvent
            key={index}
            color={color}
            icon={icon}
            title={<h6 className="mt-2">{item.type}</h6>}
            subtitle={item.createdTime}
          />
        );
      })}
    </Timeline>
  );
};

export default OrderTimeLine;
