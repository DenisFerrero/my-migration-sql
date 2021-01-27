type = 'mysql';
other_options = {}; // Connection, meta-table
is_valid = true;

class storageOptions {
  constructor (options) {
    try {
      if(!(options)) throw new Error('Options is not defined');
      if(!(typeof options == 'object')) throw new Error('Options is not an object');
      if(!(typeof options.type == 'string')) throw new Error('Options type not found');
      switch(options.type) {
        // If type is mysql
        case 'mysql': {
          if(!(typeof options.Connection == 'object')) throw new Error('options.Connection is not an object');
          if(!(typeof options.table_meta == 'string')) options.table_meta = 'mysql-meta';
          other_options = options;
          break;
        }; default: {
          is_valid = false;
          throw new Error(`${options.type} type not supported yet`);
        } 
      }
    } catch (Error) { console.error(`Error during creation of StorageOptions: ${Error}`) }
  };

  getAllMigrated () {
    if(type == 'mysql')
      return new Promise(async function (resolve, reject) {
        await query('CREATE TABLE IF NOT EXISTS `' + other_options.table_meta + '` ( `id` INT NOT NULL AUTO_INCREMENT, `migration` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) AUTO_INCREMENT=1,ENGINE = InnoDB;')
        .catch(err => reject(err));
        let result = await query('SELECT * FROM `' + other_options.table_meta + '`');
        resolve(result);
      })
  }

  async load (migration_file) {
    try {
      if(!(typeof migration_file == 'string')) throw new Error('The migration to load name passed is not valid');
      await query("INSERT INTO `" + other_options.table_meta + "` (migration) VALUES ('" + migration_file + "')");
    } catch(Error) { console.error(Error); }
  }

  async unload (migration_file) {
    try {
      if(!(typeof migration_file == 'string')) throw new Error('The migration to unload name passed is not valid');
      await query("DELETE FROM `" + other_options.table_meta + "` WHERE migration = '"+ migration_file + "'");
    } catch(Error) { console.error(Error); }
  }

  isValid () {
    return is_valid;
  }
}


function query (qry) {
  return new Promise(function (resolve, reject) {
    other_options.Connection.query(qry, function (err, result) {
      try {
        if(err) throw err;
        resolve(result);
      } catch (Error) { console.error(`Error on query: ${Error}`); reject(Error); }
    })
  });
}

module.exports = storageOptions;