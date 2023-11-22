import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const Timer = ({ onSave }) => {
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [task, setTask] = useState({ title: "", description: "", duration: 0 });

  useEffect(() => {
    if (isStarted && !isPaused) {
      setTimerId(
        setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000)
      );
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isStarted, isPaused]);

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
    setIsStarted((prevIsStarted) => !prevIsStarted);
  };

  const handleSave = () => {
    setShowModal(true);
    setIsStarted(false);
    setIsPaused(false);
    setTask({ ...task, duration: time });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    if (task.title.trim() === "") {
      setError("Please enter a title for the task.");
      return;
    }

    // Handle saving task title
    onSave({ title: task.title, duration: task.duration });
    setShowModal(false);
    setTime(0);
    setTask({ title: "", description: "", duration: 0 });
    setError(""); // Reset error after successful save
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="timer">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </div>
      <div style={{ marginTop: "10px" }}>
        {" "}
        <Button onClick={handleStart} disabled={isStarted}>
          Start
        </Button>{" "}
        <Button onClick={handlePause} disabled={!isStarted || isPaused}>
          Pause
        </Button>{" "}
        <Button onClick={handleSave} disabled={isStarted || !isPaused}>
          Save
        </Button>
      </div>

      {/* Modal */}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <p style={{ color: "red" }}>{error}</p>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Timer;
