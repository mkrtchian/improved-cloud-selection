/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
  }
  interface Methods extends Playwright {} // eslint-disable-line @typescript-eslint/no-empty-interface
  interface I extends ReturnType<Methods> {} // eslint-disable-line @typescript-eslint/no-empty-interface
  namespace Translation {
    interface Actions {} // eslint-disable-line @typescript-eslint/no-empty-interface
  }
}
