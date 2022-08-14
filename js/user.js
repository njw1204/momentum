/**
 * @param {string} username
 * @returns {boolean}
 */
function login(username) {
  return saveObj("user", {
    username,
  });
}

/**
 * @returns {boolean}
 */
function logout() {
  return saveObj("user", null);
}

/**
 * @returns {string|undefined}
 */
function getLoggedInUsername() {
  const obj = loadObj("user");
  return obj?.username;
}
