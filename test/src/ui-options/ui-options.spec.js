import UIOptions from '../../../src/ui-options/ui-options'

describe('UIOptions', () => {
  const targetId = 'target-id';
  const logLevel = 'WARN';
  const forceTouchUI = true;

  it('should create ui options with only target id', () => {
    const uo = new UIOptions(targetId);
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
  });

  it('should create empty ui options', () => {
    const uo = new UIOptions();
    uo.should.be.instanceOf(UIOptions);
  });

  it('should create ui options with target id and set other props later', () => {
    const uo = new UIOptions(targetId);
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
    uo.logLevel = logLevel;
    uo.forceTouchUI = forceTouchUI;
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
    uo.forceTouchUI.should.equal(forceTouchUI);
  });

  it('should empty create ui options and set other props later', () => {
    const uo = new UIOptions();
    uo.should.be.instanceOf(UIOptions);
    uo.targetId = targetId;
    uo.logLevel = logLevel;
    uo.forceTouchUI = forceTouchUI;
    uo.targetId.should.equal(targetId);
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
    uo.forceTouchUI.should.equal(forceTouchUI);
  });

  it('should create ui options by json', () => {
    const uo = new UIOptions({targetId: targetId});
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
  });

  it('should create ui options by json with target id and set other props later', () => {
    const uo = new UIOptions({targetId: targetId});
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
    uo.logLevel = logLevel;
    uo.forceTouchUI = forceTouchUI;
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
    uo.forceTouchUI.should.equal(forceTouchUI);
  });

  it('should create ui options by json with all params', () => {
    const json = {
      targetId: targetId,
      logLevel: logLevel,
      forceTouchUI: forceTouchUI
    };
    const uo = new UIOptions(json);
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
    uo.forceTouchUI.should.equal(forceTouchUI);
  });

  it('should get json ui options', () => {
    const json = {
      targetId: targetId,
      logLevel: logLevel,
      forceTouchUI: forceTouchUI
    };
    const uo = new UIOptions(json);
    uo.should.be.instanceOf(UIOptions);
    uo.logLevel = logLevel;
    uo.toJSON().should.deep.equal(json);
  });
});
