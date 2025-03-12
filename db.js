const { Sequelize } = require('sequelize');
require('dotenv').config();


/*const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,  // Requiere SSL
      rejectUnauthorized: false // Desactiva la verificación del certificado (esto es necesario en Render)
    }
  }
});*/

/*const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});*/


const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  
});


// Usamos DATABASE_URL si está configurada en Heroku


async function Open(sql, params) {
  try {
    const result = await sequelize.query(sql, {
      replacements: params,
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.Open = Open;
