import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Filters from '../src/components/Filters';

Enzyme.configure({ adapter: new Adapter() });

const FILTERS_STATE = {
  type: 'all'
};

