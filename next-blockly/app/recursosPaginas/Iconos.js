import { library, findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCirclePlay,
  faTrash,
  faCircleStop,
  faRotateLeft,
  faPerson,
  faPersonRunning,
  faCode,
  faComment,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faTrash,
  faCirclePlay,
  faCircleStop,
  faRotateLeft,
  faPerson,
  faPersonRunning,
  faCode,
  faComment,
  faAnglesRight
);

export default ({ icon }) => {
  const iconElement = findIconDefinition({ prefix: "fa", iconName: icon });
  return <FontAwesomeIcon icon={iconElement} />;
};
