const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Employee', () => {

    before(async () => {

        try {
          const fakeDB = new MongoMemoryServer();

          const uri = await fakeDB.getConnectionString();

          mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        } catch(err) {
          console.log(err);
        }

    });

    describe('Reading data', () => {

        beforeEach(async () => {
            const testEmplOne = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1'  });
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Name #2', lastName: 'LastName #2', department: 'Department #2'  });
            await testEmplTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "name" with "findOne" method', async () => {
            const employee = await Employee.findOne({ lastName: 'LastName #2' });
            const expectedLastName = 'LastName #2';
            expect(employee.lastName).to.be.equal(expectedLastName);
        });

    });

    describe('Creating data', () => {

        after(async () => {
            await Employee.deleteMany();
          });

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1' });
            await employee.save();
            expect(employee.isNew).to.be.false;
          });

    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmplOne = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1' });
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Name #2', lastName: 'LastName #2', department: 'Department #2'  });
            await testEmplTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ department: 'Department #1' }, { $set: { department: '=Department #1=' }});
            const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ department: 'Department #1' });
            employee.department = '=Department #1=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { lastName: 'Updated!' }});
            const employees = await Employee.find({ lastName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
          });

      });

      describe('Removing data', () => {

        beforeEach(async () => {
            const testEmplOne = new Employee({ firstName: 'Name #1', lastName: 'LastName #1', department: 'Department #1'  });
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Name #2', lastName: 'LastName #2', department: 'Department #2'  });
            await testEmplTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ lastName: 'LastName #1' });
            const removeEmployee = await Employee.findOne({ lastName: 'LastName #1' });
            expect(removeEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ lastName: 'LastName #1' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ lastName: 'LastName #1' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });

      });

});