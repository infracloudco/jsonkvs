const fs = require("fs");

const defaultConfig = {
  tabSpace: "\t"
};

function jsonkvs(path, config = {}) {
  config = Object.assign(defaultConfig, config);
  let file = JSON.parse(fs.readFileSync(path, "utf8"));

  return {
    get: key => (key ? file[key] : file),
    set: (keyOrPatch, valueOrReplace) => {
      if (typeof keyOrPatch === "object") {
        const patch = keyOrPatch;
        const replace = !!valueOrReplace;
        file = replace ? patch : Object.assign(file, patch);
      } else {
        const key = keyOrPatch;
        const value = valueOrReplace;
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
