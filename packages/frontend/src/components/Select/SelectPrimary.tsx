import React from "react";
import { MenuProps } from "@material-ui/core/Menu";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SelectPrimary as StyledWrapper } from "./styles";

export interface ISelectPrimaryProps {
  value: string;
  options: Array<MenuItemProps & { name: string }>;
  MenuProps: Partial<MenuProps>;
  onChange: (e: any) => void;
}

const defaultMenuProps: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const SelectPrimary = (props: ISelectPrimaryProps) => {
  const { options, MenuProps, ...otherProps } = props;

  return (
    <StyledWrapper
      variant="outlined"
      autoComplete="off"
      IconComponent={ExpandMoreIcon}
      MenuProps={MenuProps || defaultMenuProps}
      {...otherProps}
    >
      {options.map((element) => {
        if (typeof element !== "string") {
          const elementText = element.value || element.name;
          return (
            <MenuItem key={element.id} value={element.id}>
              {elementText}
            </MenuItem>
          );
        }
        return (
          <MenuItem key={element} value={element}>
            {element}
          </MenuItem>
        );
      })}
    </StyledWrapper>
  );
};

export default SelectPrimary;
