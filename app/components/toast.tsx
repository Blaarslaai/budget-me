type props = {
  toastType: "info" | "success" | "warning" | "error";
  toastMessage: string;
};

export default function Toast({ toastType, toastMessage }: props) {
  return (
    <>
      <div className="toast toast-center mb-24 w-1/2">
        <div className={`flex justify-center alert alert-${toastType}`}>
          <span>{toastMessage}</span>
        </div>
      </div>
    </>
  );
}
