import React from "react";
import {
  MdFormatAlignCenter,
  MdQueue,
  MdHome,
  MdInfo,
  MdAddCircle,
  MdDelete,
  MdPerson,
} from "react-icons/md";

const iconNames = {
  formatAlignCenter: MdFormatAlignCenter,
  queue: MdQueue,
  home: MdHome,
  info: MdInfo,
  addCircle: MdAddCircle,
  delete: MdDelete,
  person: MdPerson,
};

export const Icon = ({ size = 20, name, onClick, className }) => {
  const IconRenderer = iconNames[name];

  if (!IconRenderer) {
    console.warn(`Icon with name "${name}" is not defined in iconNames.`);
    return null;
  }

  return (
    <IconRenderer
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      onClick={onClick}
      className={className}
    />
  );
};

export default Icon;
