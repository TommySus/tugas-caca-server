'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mail.belongsTo(models.User)
    }
  };
  Mail.init({
    kepada: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'kolom kepada tidak boleh kosong'
        }
      }
    },
    perihal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'kolom perihal tidak boleh kosong'
        }
      }
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'kolom keterangan tidak boleh kosong'
        }
      }
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'kolom instansi tidak boleh kosong'
        }
      }
    },
    jenisSurat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'kolom jenis surat tidak boleh kosong'
        }
      }
    }, 
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'kolom User Id tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};