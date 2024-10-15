type Props = {
  toastType: "info" | "success" | "warning" | "error";
  toastMessage: string;
};

export default function Toast({ toastType, toastMessage }: Props) {
  return (
    <div className="toast toast-center mb-24 w-1/2">
      {toastType === "info" && (
        <div className={`flex justify-center alert alert-info`}>
          <span>{toastMessage}</span>
        </div>
      )}
      {toastType === "success" && (
        <div className={`flex justify-center alert alert-success`}>
          <span>{toastMessage}</span>
        </div>
      )}
      {toastType === "warning" && (
        <div className={`flex justify-center alert alert-warning`}>
          <span>{toastMessage}</span>
        </div>
      )}
      {toastType === "error" && (
        <div className={`flex justify-center alert alert-error`}>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
