//@flow

function isMobile(): boolean {
  return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1;
}

export {isMobile}
