let mClockSubscribeCallbacks = [];

/**
 * @param {(now: Date) => any} callback
 */
function subscribeClock(callback) {
  unsubscribeClock(callback);
  mClockSubscribeCallbacks.push(callback);
  publishClock();
}

/**
 * @param {(now: Date) => any} callback
 */
function unsubscribeClock(callback) {
  mClockSubscribeCallbacks = mClockSubscribeCallbacks.filter(
    (aCallback) => aCallback !== callback
  );
}

function publishClock() {
  const now = new Date();

  mClockSubscribeCallbacks.forEach((callback) => {
    if (typeof callback === "function") {
      callback(now);
    }
  });
}

setInterval(() => {
  publishClock();
}, 100);
