const utils = require('./utils');
// const mocha = require('mocha');
var expect = require('expect');
var createSpy = expect.createSpy;
var spyOn = expect.spyOn;
var isSpy = expect.isSpy;

it('should add two numbers', ()=>{
  var res = utils.add(33, 66);
  expect(res).toBe(99).toBeA('number');
})

it('should be lowercase', ()=>{
  var resp = utils.sayPlease('PLEASE');
  expect(resp).toBe('please');
});
