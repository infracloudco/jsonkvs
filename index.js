const fs = require("fs");

function jsonkvs(path) {
  let file = JSON.parse(fs.readFileSync(path, "utf8"));

  return {
    get: key => (key ? file[key] : file),
    set: (...args) => {
      if (typeof args[0] === "object") {
        const patch = args[0];
        const replace = !!args[1];
        file = replace ? patch : { ...file, ...patch };
      } else {
        const key = args[0];
        const value = args[1];
        file[key] = value;
      }
    },
    del: key => {
      delete file[key];
    },
    save: () => {
      fs.writeFileSync(path, JSON.stringify(file, null, "\t"), "utf8");
    }
  };
}

module.exports = jsonkvs;
