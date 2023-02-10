import React, { useMemo } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { News } from "../../../../types/news";
import NewsBox from "../NewsBox";

interface Props {
  news: News[];
}

const CompanyMoreNews = (props: Props) => {
  const blockNum = useMemo<number>(() => {
    return Math.floor(props.news.length / 3);
  }, [props.news]);

  return (
    <React.Fragment>
      {Array.from(Array(blockNum + 1).keys()).map((num) => {
        return (
          <Box mt={2.5} key={num}>
            <Grid container>
              {props.news.slice(num * 3, (num + 1) * 3).map((news) => {
                return (
                  <Grid item xs={4} key={news.id}>
                    <NewsBox news={news} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

export default React.memo(CompanyMoreNews);
