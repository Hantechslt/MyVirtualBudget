import moment from "moment";

class Utilities {
  getTimeStamp() {
    //MOMENTO
    let dateMoment = new Date();
    let formattedDateMoment = moment(dateMoment).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    // Obtener el timestamp UNIX
    let timestampMilliseconds = dateMoment.getTime();
    //Devolver
    let dateFromTimestamp = new Date(timestampMilliseconds);
    let formattedDateFromTimestamp = moment(dateFromTimestamp).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    return timestampMilliseconds;
  }
  getDate(addDays) {
    let dateMoment = new Date();
    dateMoment.setDate(dateMoment.getDate() + addDays);
    return dateMoment;
  }
  getDateToTimeStamp(date) {
    return date.getTime();
  }
  getTimeStampToDate(timeStamp) {
    return new Date(timeStamp);
  }
  getFormatPeriodDate(startDate, endDate) {
    startDate = moment(startDate).format("DD/MM/YYYY");
    endDate = moment(endDate).format("DD/MM/YYYY");
    return startDate + " - " + endDate;
  }
  getLocaleCurrency(value, locale, currency) {
    //locale : "es-CR" - currency: "CRC"
    const numberFormat = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return numberFormat.format(value);
  }
  getRatios(total, value) {
    if (total === 0) {
      return 0;
    }

    let ratio = value / total;

    // Limita el ratio entre 0 y 1
    if (ratio < 0) {
      ratio = 0;
    } else if (ratio > 1) {
      ratio = 1;
    }

    return ratio;
  }

  removeArrayItem(array, property, value) {
    return array.filter((item) => item[property] !== value);
  }
  sortByIndex(array, property) {
    return array.sort((a, b) => b[property] - a[property]);
  }
}

export default new Utilities();
