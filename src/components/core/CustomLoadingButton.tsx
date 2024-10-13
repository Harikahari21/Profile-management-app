import { CircularProgress } from "@mui/material";

export default function LoadingButton({
  title,
  className,
  loading,
  handleClick,
  icon,
  type = "submit",
  isDisabled,
  circleClassName,
  circleSize,
}: {
  title?: string;
  className?: string;
  loading?: boolean;
  icon?: JSX.Element;
  handleClick?: () => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  circleClassName?: string;
  circleSize?: number;
}) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} ${
        loading
          ? "bg-secondary !py-2.5 cursor-not-allowed text-base text-primary flex items-center justify-center"
          : "bg-primary text-base text-white flex items-center justify-center"
      } common-transition`}
      disabled={loading}
    >
      {loading ? (
        <span className="w-full flex items-center justify-center">
          <CircularProgress
            size={circleSize || 28}
            className={`${circleClassName} !text-white`}
          />
        </span>
      ) : (
        <span>
          {icon} {title}
        </span>
      )}
    </button>
  );
}
