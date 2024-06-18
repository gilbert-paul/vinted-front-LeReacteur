const Modal = ({ content, setModalIsVisible, setTryToSell }) => {
  const handleModalVisibility = (event) => {
    setTryToSell(false);
    setModalIsVisible({ login: false, signup: false });
  };
  return (
    <div onClick={handleModalVisibility} className="container-modal">
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="__to-close"
      >
        <i
          onClick={handleModalVisibility}
          className="fa-regular fa-circle-xmark"
        ></i>
        {content}
      </div>
    </div>
  );
};

export default Modal;
