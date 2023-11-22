import React from "react";
import { ListGroup } from "react-bootstrap";

const TaskList = ({ taskList }) => {
  return (
    <ListGroup>
      {taskList.map((task, index) => (
        <ListGroup.Item key={index}>
          <strong>{task.title}</strong> - Duration:{" "}
          {new Date(task.duration * 1000).toISOString().substr(11, 8)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
