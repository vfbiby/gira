export const mockSystemPrefersColorThemeTo = (matches: boolean): void => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: matches,
      media: query,
      onchange: null,
    })),
  });
};
