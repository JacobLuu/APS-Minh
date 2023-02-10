import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Text from "../../../../components/Text";
import {
  Container,
  Cell,
  CollapseIconButton,
  SelectableCell,
  WhatToMeasureRow,
} from "./styles";
import { Category, Factor } from "../../../../types/settings";
import { CategoryType } from "../../../../constants/enums";
import { useLabelTranslation } from "../../../../utils/customHooks";
import { TEXT_COLOR_GREY } from "../../../../themes/colors";

interface CategoryHeaderRowProps {
  collapsed: boolean;
  setCollapsed: Function;
  categoryIndex: number;
}

const CategoryHeaderRow = (props: CategoryHeaderRowProps) => {
  const { t } = useTranslation();
  const CategoryArray = [
    t("settings:framework_view_mode.environmental"),
    t("settings:framework_view_mode.social"),
    t("settings:framework_view_mode.governance"),
  ];
  return (
    <TableRow
      onClick={() =>
        props.setCollapsed((prevState) => {
          const newState = [...prevState];
          newState[props.categoryIndex] = !newState[props.categoryIndex];
          return newState;
        })
      }
      style={{ cursor: "pointer" }}
    >
      <Cell>
        <Box pl={7} py={1.5}>
          <CollapseIconButton aria-label="expand row">
            {props.collapsed ? <ArrowDropUp /> : <ArrowDropDown />}
          </CollapseIconButton>
          <Text $size="lg" $weight="bold" $color={TEXT_COLOR_GREY}>
            {CategoryArray[props.categoryIndex - 1]}
          </Text>
        </Box>
      </Cell>
    </TableRow>
  );
};

interface CategoryBodyRowProps {
  category: Category;
  selectedFactorId: number;
  onChangeFactor: Function;
}

const CategoryBodyRow = (props: CategoryBodyRowProps) => {
  const { t } = useTranslation();
  const { translateFactorLabel } = useLabelTranslation();

  if (!props.category?.factors || props.category?.factors.length === 0) {
    return null;
  }

  return (
    <TableBody>
      <WhatToMeasureRow>
        <Cell>
          <Box pl={9.5} py={1.5}>
            <Text $weight="bold" style={{ color: "#979797" }}>
              {t("settings:framework_view_mode.what_to_measure")}
            </Text>
          </Box>
        </Cell>
      </WhatToMeasureRow>
      {props.category?.factors.map((factor) => {
        return (
          <TableRow key={factor.id}>
            <SelectableCell
              selected={factor.id === props.selectedFactorId}
              onClick={() => props.onChangeFactor(factor)}
            >
              <Box pl={9.5} py={1.5}>
                <Text $size="md" $weight="bold">
                  {translateFactorLabel(factor)}
                </Text>
              </Box>
            </SelectableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

interface SettingsLeftSideProps {
  categories: Category[];
  selectedFactor: Factor;
  onChangeFactor: Function;
}

const SettingsLeftSide = (props: SettingsLeftSideProps) => {
  const [collapsed, setCollapsed] = useState<boolean[]>([false]);

  const getCategory = useCallback(
    (categoryType) => {
      return props.categories?.find((c) => c.category_type === categoryType);
    },
    [props.categories]
  );

  const canCollapse = useCallback(
    (categoryType) => {
      return (
        getCategory(categoryType)?.factors.find(
          (factor) => factor.id === props.selectedFactor?.id
        ) === undefined
      );
    },
    [props.selectedFactor]
  );

  const hasInitialized = useCallback(
    (categoryType) => {
      return (
        getCategory(categoryType)?.factors.find(
          (factor) => factor.id === props.selectedFactor?.id
        ) !== undefined
      );
    },
    [props.selectedFactor]
  );

  const renderCategory = (categoryType: CategoryType) => {
    const isForceOpen =
      hasInitialized(categoryType) && collapsed[categoryType] === undefined;

    if (isForceOpen) {
      setCollapsed((prevState) => {
        const newState = [...prevState];
        newState[categoryType] = true;
        return newState;
      });
    }

    return (
      <React.Fragment>
        <TableHead>
          <CategoryHeaderRow
            collapsed={collapsed[categoryType]}
            categoryIndex={categoryType}
            setCollapsed={canCollapse(categoryType) ? setCollapsed : () => {}}
          />
        </TableHead>
        {collapsed[categoryType] && (
          <CategoryBodyRow
            category={getCategory(categoryType)}
            selectedFactorId={props.selectedFactor?.id}
            onChangeFactor={props.onChangeFactor}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <Container item xs={3}>
      <Box mt={2.5}>
        <TableContainer>
          <Table>
            {renderCategory(CategoryType.environmental)}
            {renderCategory(CategoryType.social)}
            {renderCategory(CategoryType.governance)}
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default React.memo(SettingsLeftSide);
