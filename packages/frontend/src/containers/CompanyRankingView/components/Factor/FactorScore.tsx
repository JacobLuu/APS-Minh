import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";

import Text from "../../../../components/Text";
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from "../../../../themes/colors";
import { Factor } from "../../../../types";
import FactorPage from "../../../Company/components/FactorPage";
import { TableCellCompany, TableCellRank, TableCellScore } from "./styles";
import FactorInformation from "../FactorInformation/FactorInformation";
import { nullishCoalescing } from "../../../../utils/miscellaneous";

interface HeaderProps {
  company_name: string;
}

const Header = (props: HeaderProps) => {
  return (
    <Box px={4} pt={3} pb={1}>
      <Text $size="xs" $color={COLOR_TEXT_SECONDARY}>
        Company
      </Text>
      <Text $size="lg" $color={COLOR_PRIMARY} $weight="bold">
        {props.company_name}
      </Text>
    </Box>
  );
};

interface BodyProps {
  factor: Factor;
  category_id: number;
}

const Body = (props: BodyProps) => {
  return (
    <FactorPage
      factor={props.factor}
      isMetricsWeightageShown
      isExpanded
      category_id={props.category_id}
    />
  );
};

interface IFactor {
  company_name: string;
  sector_name: string;
  company_id: number;
  rankingOrderInSector: number;
  shouldShowRankColumn: boolean;
  selectedColumnIndex: number;
}

const FactorScore = (props: IFactor) => {
  const {
    company_name,
    sector_name,
    factors,
    rankingOrderInSector,
    company_id,
    shouldShowRankColumn,
    selectedColumnIndex,
  } = props;
  const [factorScoreToEdit, setFactorScoreToEdit] =
    React.useState<number>(undefined);
  const [isFactorScoreAddedSuccessfully, setIsFactorScoreAddedSuccessfully] =
    React.useState<boolean>(false);
  const [shouldDisplayRank, setShouldDisplayRank] = React.useState(true);

  const reloadPage = () => {
    setIsFactorScoreAddedSuccessfully(true);
  };

  const handleOpenFactorModal = (factorWeightage, factor) => {
    if (factorWeightage > 0) setFactorScoreToEdit(factor);
  };

  React.useEffect(() => {
    if (!factorScoreToEdit && isFactorScoreAddedSuccessfully)
      window.location.reload();
  }, [factorScoreToEdit]);

  React.useEffect(() => {
    const activeFactor = factors.find((factor) => {
      return factor?.factor_id === selectedColumnIndex;
    });
    if (activeFactor) {
      const activeFactorScore = nullishCoalescing(
        activeFactor.factor_overall_score
      );
      if (activeFactorScore === "") {
        setShouldDisplayRank(false);
      }
    }
  }, [factors, selectedColumnIndex]);

  React.useEffect(() => {
    if (isFactorScoreAddedSuccessfully) {
      window.location.reload();
    }
  }, [isFactorScoreAddedSuccessfully]);

  return (
    <TableRow>
      {shouldShowRankColumn && (
        <TableCellRank align="left">
          {shouldDisplayRank && rankingOrderInSector > 0
            ? rankingOrderInSector
            : ""}
        </TableCellRank>
      )}
      <TableCellCompany align="left">
        <Link
          to={`/company/${company_id}`}
          target="_blank"
          style={{ color: `${COLOR_PRIMARY}` }}
        >
          {company_name}
        </Link>
      </TableCellCompany>
      <TableCellRank align="left">{sector_name}</TableCellRank>
      {factors.map((factor) => (
        <TableCellScore
          key={factor.id}
          $isActive={selectedColumnIndex === factor.factor_id}
          style={{
            color:
              factor.factor_weightage > 0
                ? COLOR_PRIMARY
                : COLOR_TEXT_SECONDARY,
          }}
          align="center"
          onClick={() => handleOpenFactorModal(factor.factor_weightage, factor)}
        >
          {nullishCoalescing(factor.factor_overall_score, "-")}
        </TableCellScore>
      ))}
      {factorScoreToEdit && (
        <FactorInformation
          isOpenFactor={!!factorScoreToEdit}
          setFactorScoreToEdit={setFactorScoreToEdit}
          companyName={company_name}
          factor={factorScoreToEdit}
          reloadPage={reloadPage}
        />
      )}
    </TableRow>
  );
};

export default React.memo(FactorScore);
