// Créez un mock pour localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Affectez le mock à window.localStorage
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
