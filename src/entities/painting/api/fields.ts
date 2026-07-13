export const ARTWORK_SUMMARY_FIELDS = "id,title,image_id,artist_title,date_display";

export const ARTWORK_DETAILS_FIELDS = [
  ARTWORK_SUMMARY_FIELDS,
  "artist_id,artist_display,place_of_origin,medium_display,dimensions",
  "credit_line,description,department_title,style_title,classification_title,is_public_domain",
].join(",");
