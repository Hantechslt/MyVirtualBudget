import moment from "moment";

class Utilities {
  getTimeStamp() {
    //MOMENTO
    let dateMoment = new Date();
    console.log("moment: " + dateMoment);
    let formattedDateMoment = moment(dateMoment).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    console.log("moment: " + formattedDateMoment);
    // Obtener el timestamp UNIX
    let timestampMilliseconds = dateMoment.getTime();
    console.log("Timestamp UNIX: " + timestampMilliseconds);

    //Devolver 
    let dateFromTimestamp = new Date(timestampMilliseconds);

    // Formatear la fecha en el formato "2023-10-18T14:40:21.097Z"
    let formattedDateFromTimestamp = moment(dateFromTimestamp).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    console.log("Devolver : "+ formattedDateFromTimestamp);


    return timestampMilliseconds;
  }
  getDate() {
     let dateMoment = new Date();
     return dateMoment;
  }
}

export default new Utilities();
