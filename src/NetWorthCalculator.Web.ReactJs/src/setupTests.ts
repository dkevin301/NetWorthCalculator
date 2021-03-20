// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * https://stackoverflow.com/questions/64813447/cannot-read-property-addlistener-of-undefined-react-testing-library
 * <MaskedInput /> initially did not play well with react-testing-library until this was added
 * possibly due to some internals that couldn't be mocked by jest
 */
 global.matchMedia = global.matchMedia || function (query) {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	};
};