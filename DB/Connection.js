import { Sequelize } from'sequelize';

export const sequelize = new Sequelize('freedb_AdvanceSoftwareProject','freedb_AdvanceSpftwareDB','rtrJJj@HxZHp5sE', {
    host: 'sql.freedb.tech',
    port:3306,
    dialect:'mysql'  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


  export const ConnectDB = async()=>{
    try{
        return await sequelize.sync({alter:true, force:false}); // change for table
   // force is make table empty
      }
    catch(error){
       console.log("error to connect to database");
    }
  }