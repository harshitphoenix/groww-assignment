import ErrorMessage from "./ErrorMessage";

type FloatingErrorMsg = {
  msg: string;
};
const FloatingErrorMsg = ({ msg }: FloatingErrorMsg) => {
  return (
    <div >
      <ErrorMessage msg={msg} />
    </div>
  );
};
