import {expect} from 'chai';
import {mergeDeep} from '../../src/utils/merge-deep';
import {copyDeep} from '../../src/utils/copy-deep';

describe('prototype pollution protection', () => {
  afterEach(() => {
    delete (Object.prototype as any).polluted;
  });

  it('mergeDeep should ignore __proto__ keys', () => {
    mergeDeep({}, JSON.parse('{"__proto__": {"polluted": true}}'));
    expect(({} as any).polluted).to.be.undefined;
  });

  it('mergeDeep should ignore constructor.prototype keys', () => {
    const target = {constructor: {prototype: Object.prototype}};
    mergeDeep(target, JSON.parse('{"constructor": {"prototype": {"polluted": true}}}'));
    expect(({} as any).polluted).to.be.undefined;
  });

  it('mergeDeep should ignore inherited source keys', () => {
    const source = Object.create({inherited: 1});
    source.own = 2;
    const result = mergeDeep({}, source);
    expect(result).to.deep.equal({own: 2});
  });

  it('copyDeep should drop constructor and prototype keys', () => {
    const copy = copyDeep(JSON.parse('{"a": 1, "constructor": {"prototype": {"polluted": true}}, "prototype": {"x": 1}}'));
    expect(Object.prototype.hasOwnProperty.call(copy, 'constructor')).to.be.false;
    expect(Object.prototype.hasOwnProperty.call(copy, 'prototype')).to.be.false;
    expect(copy.a).to.equal(1);
  });

  it('mergeDeep should still merge regular nested keys', () => {
    const result = mergeDeep({a: {b: 1}}, {a: {c: 2}, d: 3});
    expect(result).to.deep.equal({a: {b: 1, c: 2}, d: 3});
  });

  it('copyDeep should drop __proto__ keys and not alter the prototype', () => {
    const copy = copyDeep(JSON.parse('{"a": {"b": 1}, "__proto__": {"polluted": true}}'));
    expect(Object.getPrototypeOf(copy)).to.equal(Object.prototype);
    expect(copy.polluted).to.be.undefined;
    expect(copy.a).to.deep.equal({b: 1});
  });
});
