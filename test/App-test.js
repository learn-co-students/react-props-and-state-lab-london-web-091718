import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from '../src/fetch-setup';
import App from '../src/components/App';
import Filters from '../src/components/Filters';
import PetBrowser from '../src/components/PetBrowser';

Enzyme.configure({ adapter: new Adapter() });

const FILTERS_STATE = {
  type: 'all'
};



