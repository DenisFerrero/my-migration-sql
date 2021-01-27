var migration_path = './migrations';
var enabled = true;
var saveOptions = {};
var Connection = {};
const path = require('path');
const fs = require('fs');
const storageOptions = require('./src/storageOptions');
class migrations {
  /* options content
  * - Connection => connection to MySQL
  * - path => path to the migration folder
  * - saveOptions => options to save already migrated files (MySQL, JSON (TODO) ) 
  */
  constructor (options) {
    try {
      // Check if options exists
      if(!options) throw new Error("Options not definded");
      if(!(typeof options == 'object')) throw new Error("Options is not an object");
      // Check if Connection exists
      if(!(options.Connection)) throw new Error("Database connection is not defined");
      Connection = options.Connection;
      // Check if storageOptions exists
      if(!(options.saveOptions)) throw new Error("Save options is not defined");
      if(!(typeof options.saveOptions == 'object')) throw new Error("saveOptions is not an object");
      // Using custom path
      if(typeof options.path == 'string') migration_path = options.path;
      // Default settings
      if(options.saveOptions.constructor.name == 'storageOptions')
        if(options.saveOptions.isValid())
          saveOptions = saveOptions;
        else throw new Error('saveOptions is not valid');
      else {
        if(!(typeof options.Connection == 'object')) throw new Error('')
        saveOptions = new storageOptions({
          type: (!(typeof options.saveOptions.type == 'string')) ? 'mysql' : options.saveOptions.type,
          Connection: options.Connection,
          options: options.saveOptions.options
        });
      }
    } catch (Error) { enabled = false; console.error(`Error during creation of migration instance: ${Error}`); }
  }

  async up (target_migration) {
    if(saveOptions.isValid())
      var files = [];
      // Single file
      if(typeof target_migration == 'string' && fs.readFileSync(path.join(migration_path, target_migration)))
        files.push(target_migration);
      // Multiple files
      else if(Array.isArray(target_migration))
        target_migration.forEach(file => { if(fs.readFileSync(path.join(migration_path, file))) files.push(path.join(migration_path, file)); });
      // All remaining
      else
        files = await this.pending();
      console.log(typeof files, files);
      return new Promise(async function (resolve, reject) {
        for(const file of files) {
          await query(require(file).up)
            .then(() => {
              console.log(`----- migration ${target_migration} succeffully uploaded! -----`);
              // Save file just migrated
              saveOptions.load(target_migration);
            })
            .catch(() => console.log(`----- migration ${target_migration} encountered an Error! -----`));
        }
        resolve(true);
      });
  }

  down (target_migration) {
    // TODO in a second moment
  }

  pending () {
    return new Promise(async function (resolve, reject) {
      let migration_files = fs.readdirSync(migration_path);
      let already_migrated = await saveOptions.getAllMigrated();
      // Remove already migrated
      resolve(migration_files.filter(file => { return !(already_migrated.find(mig => mig.name == file)) }));
    })
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

module.exports = migrations;