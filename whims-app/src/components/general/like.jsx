// libraries
import { useState } from "react";
// icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Interface called Props, with a property 'onClick', passed from App(),
// which is a function that takes no arguements, and returns nothing.
// Used to define the props that the Like component expects.
interface Props {
  onClick: () => void;
}

// The 'Like' componenet
const Like = ({ onClick }: Props) => {
  // useState hook to create a state variable caleld Status, and
  // a function setStatus to update its value. Initially set to false.
  const [status, setStatus] = useState(false);
  // Function called 'Toggle' that updates the status state variable to the opposite
  // of its current value, by calling setStatus.
  // It also calls onClick passed as a prop to the component.
  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  // Conditional statement that renders either an empty heart, or a full red heart, depending on
  // the value of status being true or false.
  if (status) return <FaHeart color="#ff6b81" size="50" onClick={toggle} />;
  return <FaRegHeart size="50" onClick={toggle}></FaRegHeart>;
};

export default Like;