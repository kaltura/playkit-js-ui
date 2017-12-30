import UIOptions from '../../../src/ui-options/ui-options'

describe('UIOptions', () => {
  const targetId = 'target-id';
  const logLevel = 'WARN';

  it('should create ui options with only target id', () => {
    const uo = new UIOptions(targetId);
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
  });

  it('should throw error when creating ui options without target id', (done) => {
    try {
      new UIOptions();
      done(new Error('test failed'));
    } catch (e) {
      done();
    }
  });

  it('should throw error when creating ui options with wrong type of target id', (done) => {
    try {
      new UIOptions(123);
      done(new Error('test failed'));
    } catch (e) {
      done();
    }
  });

  it('should create ui options with target id and set other props later', () => {
    const uo = new UIOptions(targetId);
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
    uo.logLevel = logLevel;
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
  });

  it('should create ui options by json', () => {
    const uo = new UIOptions({targetId: targetId});
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
  });

  it('should throw error when creating ui options by json without target id', (done) => {
    try {
      new UIOptions({});
      done(new Error('test failed'));
    } catch (e) {
      done();
    }
  });

  it('should throw error when creating ui options by json with wrong type of target id', (done) => {
    try {
      new UIOptions({targetId: 1});
      done(new Error('test failed'));
    } catch (e) {
      done();
    }
  });

  it('should create ui options by json with target id and set other props later', () => {
    const uo = new UIOptions({targetId: targetId});
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
    uo.logLevel = logLevel;
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
  });

  it('should create ui options by json with all params', () => {
    const json = {
      targetId: targetId,
      logLevel: logLevel
    };
    const uo = new UIOptions(json);
    uo.should.be.instanceOf(UIOptions);
    uo.targetId.should.equal(targetId);
    uo.logLevel.should.equal(logLevel);
  });

  it('should get json ui options', () => {
    const json = {
      targetId: targetId,
      logLevel: logLevel
    };
    const uo = new UIOptions(json);
    uo.should.be.instanceOf(UIOptions);
    uo.logLevel = logLevel;
    uo.toJSON().should.deep.equal(json);
  });
});
