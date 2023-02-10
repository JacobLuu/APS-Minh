export const countQualitativeDisclosures = (factor_score) => {
  return factor_score.qualitative_score.questionnaire_scores.reduce(
    (total, questionnaire_score) => {
      if (questionnaire_score.answers.length > 0) {
        total += questionnaire_score.answers.length;
      }
      if (questionnaire_score.news_scores.length > 0) {
        total += questionnaire_score.news_scores.length;
      }
      return total;
    },
    0
  );
};

export const countQuantitativeDisclosures = (factor_score) => {
  return factor_score.quantitative_score.indicator_key_scores.reduce(
    (total, indicator_key_score) => {
      if (indicator_key_score.extracted_result_scores.length > 0) {
        total += indicator_key_score.extracted_result_scores.length;
      }
      if (indicator_key_score.news_scores.length > 0) {
        total += indicator_key_score.news_scores.length;
      }
      return total;
    },
    0
  );
};

export const countDisclosuresOfMetric = (
  disclosures,
  news_score_disclosures
) => {
  let disclosuresLength = 0;
  if (disclosures && disclosures.length > 0) {
    disclosuresLength += disclosures.length;
  }
  if (news_score_disclosures && news_score_disclosures.length > 0) {
    disclosuresLength += news_score_disclosures.length;
  }
  return disclosuresLength;
};
