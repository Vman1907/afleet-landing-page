import moment from "moment";

export const lowerCase = (input: string) => {
  // console.log(input);

  var temp: string[] = [];
  if (input != null && input != undefined) {
    {
      temp = input.split("");
      for (var i = 0; i < temp.length; i++) {
        if (input[i] >= "A" && input[i] <= "Z") {
          temp[i] = nextChar(temp[i]);
        }
      }
    }
  }
  return input ? temp.join('') : "";
};
function nextChar(c: string) {
  return String.fromCharCode(
    c.charCodeAt(0) - "A".charCodeAt(0) + "a".charCodeAt(0)
  );
}

export const isStringEmpty = (value: string) => {
  if (value == "" || value == undefined || value == null) {
    return true;
  }
  return false;
}
export const convertToUTC = (value: string) => {
  return moment.utc(moment(value)).format();
};
export const convertToLocale = (value: string) => {
  return moment.utc(value).local().format();
};

export const capitalizeName = (value: string) => {
  const arr = value.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;

}
