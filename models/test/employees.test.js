const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
 it('should throw error if at least one data field is missing', () => {
    const empl = new Employee({});
        empl.validate(err => {
            expect(err.errors.lastName).to.exist;
            expect(err.errors.firstName).to.exist;
            expect(err.errors.department).to.exist;
        });
    
 });
 it('should throw an error if "firstName" is not a string', () => {

    const cases = [{}, []];
    for(let firstName of cases) {
      const empl = new Employee({ firstName });
  
      empl.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
  
    }
});

it('should throw an error if "lastName" is not a string', () => {

    const cases = [{}, []];
    for(let lastName of cases) {
      const empl = new Employee({ lastName });
  
      empl.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
  
    }
});

it('should throw an error if "department" is not a string', () => {

    const cases = [{}, []];
    for(let department of cases) {
      const empl = new Employee({ department});
  
      empl.validate(err => {
        expect(err.errors.department).to.exist;
      });
  
    }
});

 it('should work properly if args are correct', () => {
    const [ firstName, lastName, department ] = ['John', 'Doe', 'Marketing'];
    const empl = new Employee({ firstName: firstName, lastName: lastName, department: department });
    empl.validate(err => {
        expect(err).to.not.exist;
    });
 });
});

after(() => {
    mongoose.models = {};
});