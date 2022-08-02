const { DataTypes } = require('sequelize')
const { MySql } = require('../common/db')

const Student = MySql.define('student', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    comment: '学生id',
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    comment: '学生姓名',
  },
  gender: {
    type: DataTypes.STRING(1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    comment: '性别',
  },
  class_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    comment: '班级',
  },
  cid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: 'cid',
    validate: {
      notEmpty: true,
    },
    comment: '身份证',
  },
})

module.exports = Student
