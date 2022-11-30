import moment from "moment";
import "moment/locale/fr";

export const dateParser = (num) => {
  moment.updateLocale("fr");
  let date = moment(num).format(" Do MMMM YYYY");

  return date.toString();
};
