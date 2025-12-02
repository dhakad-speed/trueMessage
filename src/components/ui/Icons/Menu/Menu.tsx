import { IconButton, IconButtonProps } from "@mui/material";
import { ButtonProps } from "@mui/material";
const Menu: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.6 17.51a.5.5 0 0 1 0 .98l-.1.01h-17a.5.5 0 0 1 0-1h17zm0-6a.5.5 0 0 1 0 .98l-.1.01h-17a.5.5 0 0 1 0-1h17zm0-6a.5.5 0 0 1 0 .98l-.1.01h-17a.5.5 0 0 1 0-1h17z"
        ></path>
      </svg>
    </IconButton>
  );
};

export default Menu;
