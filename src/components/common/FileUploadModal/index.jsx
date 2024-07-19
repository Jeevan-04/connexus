import React from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  return (
    <Modal
      title="Upload File"
      centered
      open={modalOpen}
      onOk={() => {
        setModalOpen(false);
        setCurrentImage("");
      }}
      onCancel={() => {
        setModalOpen(false);
        setCurrentImage("");
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={uploadImage}
          disabled={!currentImage}
        >
          Upload
        </Button>,
      ]}
    >
      <div className="file-upload-body">
        {progress > 0 && progress < 100 && (
          <Progress type="circle" percent={progress} />
        )}
        {currentImage && <img className="preview-image" src={currentImage} alt="current" />}
        <input
          type="file"
          onChange={(event) => getImage(event.target.files[0])}
        />
      </div>
    </Modal>
  );
}
