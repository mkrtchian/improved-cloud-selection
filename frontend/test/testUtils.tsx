import { render, RenderResult } from "@testing-library/react";
import { SWRConfig } from "swr";

const Providers = ({ children }) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {children}
    </SWRConfig>
  );
};

const customRender = (ui: JSX.Element, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
