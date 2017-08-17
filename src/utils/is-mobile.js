//@flow

/**
 * Detection of mobile device utility function
 *
 * @returns {boolean} Boolean for detecting if device is mobile or not
 */
function isMobile(): boolean {
  return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1;
}

export {isMobile}
