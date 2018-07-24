import { getConfig, getJsconfig, touch } from "./common";

const HomeActionCreatorsMap = {
  getConfig,
  getJsconfig,
  touch
};

export interface CommonActions {
  getConfig: Function;
  getJsconfig: Function;
  touch: Function;
}

export default HomeActionCreatorsMap;
