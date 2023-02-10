import { GlobalWithFetchMock } from "jest-fetch-mock";
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// fetch API as mock
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

// enable to work storyshots
registerRequireContextHook();

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});
