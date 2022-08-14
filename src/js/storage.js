const STORAGE_KEY_PREFIX = "momentum_";

/**
 * @param {string} key
 * @param {*} obj
 * @returns {boolean}
 */
function saveObj(key, obj) {
  try {
    window.localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${key}`,
      JSON.stringify(obj)
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * @param {string} key
 * @returns {*}
 */
function loadObj(key) {
  try {
    const rawData = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);

    if (rawData === null || rawData === undefined) {
      return undefined;
    }

    return JSON.parse(rawData);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
