import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Table, TableCell, TableRow } from "@material-ui/core";

import TablePaginationActions from "../../../../components/TablePaginationActions";
import {
  BlueBar,
  BoldText,
  CommonTablePagination,
  ComponentContainer,
  LinkText,
  SubTitle,
  TBody,
  Text,
  THead,
  Title,
} from "./styles";

interface CommonTableProps {
  data: {
    headers: string[];
    body: {
      items: {
        value: string;
        type?: string;
      }[];
    }[];
  };
  title?: string;
  subtitle?: string;
  hasPagination?: boolean;
  scrollTopOnPaging?: boolean;
}

interface TableBodyRowProps {
  row: {
    items: {
      value: string;
      type?: string;
      companyId?: number;
      width?: string;
      styleColor?: string;
    }[];
  };
}

const TableBodyRow = (props: TableBodyRowProps) => {
  return (
    <TableRow>
      {props.row.items.map((item, index) => {
        if (item.type === "link") {
          return (
            // using index for key is not best practice but this is for rendering each cell in a row
            // so no further sort is needed so key wont be used
            <TableCell key={index}>
              <Link to={`/company/${item.companyId}?initiallize=true`}>
                <LinkText>{item.value}</LinkText>
              </Link>
            </TableCell>
          );
        }
        if (item.type === "graph") {
          return (
            <TableCell key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BlueBar $value={Number(item.value) / 100} />
                <Text component="span">{item.value}%</Text>
              </Box>
            </TableCell>
          );
        }

        return (
          <TableCell key={index} style={{ width: item?.width }}>
            <Text $color={item?.styleColor === "priority_high"}>
              {item.value}
            </Text>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const CommonTable = (props: CommonTableProps) => {
  const porfolioRef = useRef<HTMLInputElement | null>(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.scrollTopOnPaging) {
      window.scrollTo({
        top: porfolioRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [selectedPage, rowsPerPage]);

  const rows = useMemo(() => {
    return props.data.body.slice(
      selectedPage * rowsPerPage,
      selectedPage * rowsPerPage + rowsPerPage
    );
  }, [props.data.body, selectedPage, rowsPerPage]);

  return (
    <ComponentContainer
      ref={porfolioRef}
      style={props.title || props.subtitle ? { paddingTop: 16 } : {}}
    >
      {props.title && <Title component="span">{props.title}</Title>}
      {props.subtitle && <SubTitle component="span">{props.subtitle}</SubTitle>}

      <Table>
        <THead>
          <TableRow>
            {props.data.headers.map((header) => {
              return (
                <TableCell key={header}>
                  <BoldText>{header}</BoldText>
                </TableCell>
              );
            })}
          </TableRow>
        </THead>

        <TBody>
          {rows.map((row, index) => (
            <TableBodyRow key={index} row={row} />
          ))}
        </TBody>
      </Table>

      {props.hasPagination && (
        <CommonTablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, 50]}
          count={props.data.body.length}
          page={selectedPage}
          onPageChange={(_event, page) => setSelectedPage(page)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setSelectedPage(0);
            setRowsPerPage(Number(event.target.value));
          }}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </ComponentContainer>
  );
};

CommonTable.defaultProps = {
  title: "",
  subtitle: "",
  hasPagination: false,
  scrollTopOnPaging: false,
};

export default React.memo(CommonTable);
