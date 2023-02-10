import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@material-ui/core/Box";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import Text from "../../../../components/Text";
import { selectCompany } from "../../../../reducers/company";
import {
  getNewsRequested,
  getMockNewsRequested,
} from "../../../../reducers/news";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  COLOR_PRIMARY,
  STATE_OFF,
  STATE_ON,
  WHITE,
} from "../../../../themes/colors";
import { CompanyDetailsState } from "../../../../types";
import { EXCHANGE_CURRENCY } from "../../../../constants/enums";
import { listMockedCompanyId } from "../../../CompanyNews/components/CompanyNewsDetail/CompanyNewsDetail";

const CompanyInformation = () => {
  const {
    name,
    ticker,
    sector,
    stockExchange,
    stockPrice,
    stockPriceDiff,
    stockPriceDiffPercentage,
  }: CompanyDetailsState = useAppSelector(selectCompany);
  const dispatch = useAppDispatch();
  const params = useParams<{ companyId: string }>();
  useEffect(() => {
    if (listMockedCompanyId.includes(+params.companyId)) {
      dispatch(getMockNewsRequested(+params.companyId));
    } else {
      dispatch(
        getNewsRequested({
          companyId: Number(params.companyId),
          offset: 0,
          limit: 4,
        })
      );
    }
  }, [params.companyId]);

  const colorOfIndicator = stockPriceDiff < 0 ? STATE_OFF : STATE_ON;

  return (
    <Box
      style={{
        backgroundColor: `${WHITE}`,
        borderRadius: 8,
        textTransform: "capitalize",
      }}
      height="100%"
      px={3}
      py={2}
    >
      <Box mb={2}>
        <Text $size="lg" $weight="bold">
          Basic Information
        </Text>
      </Box>

      <Box mb={1} display="flex">
        <Text>Company Name: &nbsp;&nbsp;</Text>
        <Text $size="md" $weight="bold" $color={COLOR_PRIMARY}>
          {name}
        </Text>
      </Box>

      <Box mb={1} display="flex">
        <Text>Company Ticker: &nbsp;&nbsp;</Text>
        <Text>{ticker}</Text>
      </Box>

      <Box mb={1} display="flex">
        <Text>Sector: &nbsp;&nbsp;</Text>
        <Text $size="md" $weight="bold">
          {sector}
        </Text>
      </Box>

      <Box mb={1} display="flex">
        <Text>Stock exchange: &nbsp;&nbsp;</Text>
        <Text>{stockExchange}</Text>
      </Box>

      <Box mb={1} display="flex">
        <Text>Stock price: &nbsp;&nbsp;</Text>
        <Text $size="md" $weight="bold" $color={COLOR_PRIMARY}>
          {stockPrice} {EXCHANGE_CURRENCY[stockExchange]}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Text>
        <Text $color={colorOfIndicator}>
          {stockPriceDiff}
          (&nbsp;
          {stockPriceDiffPercentage}
          &nbsp;% )
        </Text>
        {stockPriceDiff < 0 ? (
          <ArrowDownwardIcon htmlColor={colorOfIndicator} />
        ) : (
          <ArrowUpwardIcon htmlColor={colorOfIndicator} />
        )}
        <Text $color={colorOfIndicator}>Today</Text>
      </Box>
    </Box>
  );
};

export default React.memo(CompanyInformation);
