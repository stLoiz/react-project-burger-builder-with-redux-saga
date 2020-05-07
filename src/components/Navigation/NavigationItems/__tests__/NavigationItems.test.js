import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavigationItems from '../NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

describe('<NavigationItems/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated />);
  });
  it('should match default snapshot on render', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render two <NavigationItem/> elements if user is not authenticated', () => {
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render three <NavigationItem/> elements if user is authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should render the Logout <NavigationItem/> element if user is authenticated', () => {
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>),
    ).toEqual(true);
  });
});
