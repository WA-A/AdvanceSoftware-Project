import { Sequelize } from'sequelize';

export const sequelize = new Sequelize('freedb_AdvanceSoftwareProject','freedb_AdvanceSpftwareDB','rtrJJj@HxZHp5sE', {
    host: 'sql.freedb.tech',
    port:3306,
    dialect:'mysql'  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


  export const ConnectDB = async()=>{
    
      try {
        await sequelize.authenticate(); 
        console.log("Connection to the database has been established successfully.");

    // force is make table empty
    // change for table 
        return await sequelize.sync({ alter: true ,force:false }); 
        
        
  
    }
        
      
      catch (error) {
        console.error("Error connecting to database:", error);
        return({ error: error.message });
      }
  }