import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faBars,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

type NAMES = "menu" | "cart";

const ICONS: Record<NAMES, IconDefinition> = {
  menu: faBars,
  cart: faShoppingCart,
};

export interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  name: NAMES;
}

export default function Icon({ name, ...rest }: IconProps) {
  return <FontAwesomeIcon icon={ICONS[name]} {...rest} />;
}
