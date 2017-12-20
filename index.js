const fs = require("fs");

const defaultConfig = {
  tabSpace: "\t"
};

function jsonkvs(path, config = {}) {
  config = { ...defaultConfig, ...config };
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
      fs.writeFileSync(
        path,
        JSON.stringify(file, null, config.tabSpace),
        "utf8"
      );
    }
  };
}

module.exports = jsonkvs;
