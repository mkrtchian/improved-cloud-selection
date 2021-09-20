/// <reference types='codeceptjs' />
type steps_file = typeof import("./e2e/config/steps_file.js/index.js");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
  }
  interface Methods extends Playwright {} // eslint-disable-line @typescript-eslint/no-empty-interface
  interface I extends ReturnType<steps_file> {} // eslint-disable-line @typescript-eslint/no-empty-interface
  namespace Translation {
    interface Actions {} // eslint-disable-line @typescript-eslint/no-empty-interface
  }
}
