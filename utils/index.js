import { convertCamelToSnack } from "~/utils/convertCamelToSnack";
import { toUnderscore } from "~/utils/toUnderscore";
export const functions = {
  source() {
    const CancelToken = this.$axios.CancelToken;
    return CancelToken.source();
  },
  formData(data, files) {
    const apiData = convertCamelToSnack(data);
    const formData = new FormData();
    if (apiData) {
      Object.keys(apiData).forEach((key) => {
        formData.append(key, apiData[key]);
      });
    }
    if (files) {
      Object.keys(files).forEach((item) =>
        formData.append(toUnderscore(item), files[item])
      );
    }

    return formData;
  },
  filesHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
  },

  readChunk(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  },
  async prepareChunk(chunk, file) {
    const done = await this.readChunk(chunk);
    return new File([done], file.name);
  },
  formatMoney(money) {
    return Number(money).toLocaleString("ru-RU");
  },

  objectToQuery(obj) {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
  cleanObject(obj) {
    return Object.entries(obj).reduce((a, [k, v]) => {
      return (typeof v === "object" && Object.keys(v).length) ||
        (v && typeof v !== "object")
        ? ((a[k] = v), a)
        : a;
    }, {});
  },
  objectToQuerySearch(obj) {
    const search = functions.cleanObject(obj);
    return Object.entries(search)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },
  capitalize(str) {
    const lower = str.toLowerCase();
    return str?.charAt(0).toUpperCase() + lower.slice(1);
  },
  getMonthList(locale = "en-us") {
    const objDate = new Date();
    const items = [];
    [...Array(12).keys()].map((monthNumber) => {
      objDate.setDate(1);
      objDate.setMonth(monthNumber);
      const month = objDate.toLocaleString(locale, { month: "long" });
      items.push(this.capitalize(month));
    });
    return items;
  },
};
