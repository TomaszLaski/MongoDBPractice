const Employee = require('../models/employees.model');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Employee.find({}).populate('department'));
  }
  catch(err) {
    res.status(500).json(err)
  }
};


exports.getRandom = async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.json(err);
  }
};

exports.getById = async (req, res) => {
    try {
        const dep = await Employee.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
      }
      catch(err) {
        res.status(500).json(err);
      }
};

exports.addNew = async (req, res) => {

  try {

    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json(err);
  }
};

exports.modify = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    try {
      const dep = await(Employee.findById(req.params.id));
      if(dep) {
        dep.firstName = firstName;
        dep.lastName = lastName;
        dep.department = department;
        await dep.save();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json(err);
    }

};

exports.delete = async (req, res) => {
    try {
        const dep = await(Employee.findById(req.params.id));
        if(dep) {
          await Employee.deleteOne({ _id: req.params.id });
          // res.json({ message: 'OK' });
          res.json(dep);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json(err);
      }
};
