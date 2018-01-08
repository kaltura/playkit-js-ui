import UIComponentConfig from '../../../src/ui-options/component-config'

describe('UIComponentConfig', () => {
  const component = 'myComponent';
  const config = {myComponentProp: 1};

  it('should create component config', () => {
    const cc = new UIComponentConfig(component, config);
    cc.should.be.instanceOf(UIComponentConfig);
    cc.component.should.equal(component);
    cc.config.should.equal(config);
  });

  it('should get json component config', () => {
    const json = {
      component: component,
      config: config
    };
    const cc = new UIComponentConfig(component, config);
    cc.should.be.instanceOf(UIComponentConfig);
    cc.toJSON().should.deep.equal(json);
  });
});
