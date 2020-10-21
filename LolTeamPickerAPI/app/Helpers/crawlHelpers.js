"use strict";

const Config = use("Config");
const servers = Config.get("constants").servers;

module.exports = {
  getNextServerNameToCrawl: (lastCraweledServerName) => {
    switch (lastCraweledServerName) {
      case servers.RU.name:
        return servers.BR.name;
      case servers.BR.name:
        return servers.EUNE.name;
      case servers.EUNE.name:
        return servers.EUW.name;
      case servers.EUW.name:
        return servers.JP.name;
      case servers.JP.name:
        return servers.KR.name;
      case servers.KR.name:
        return servers.LA1.name;
      case servers.LA1.name:
        return servers.LA2.name;
      case servers.LA2.name:
        return servers.NA.name;
      case servers.NA.name:
        return servers.OCE.name;
      case servers.OCE.name:
        return servers.TR.name;
      case servers.TR.name:
        return servers.RU.name;
      default:
        return servers.BR.name;
    }
  },
};
