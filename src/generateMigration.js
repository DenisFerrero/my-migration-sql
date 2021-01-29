const path = require('path');
const fs = require('fs');
var migration_path = path.join(process.cwd(), 'migrations');
var migration_name = 'default_name';
// Flag cmd parser
const args = require('yargs').argv;
try {
  if(typeof args.name == 'string' && arg.name.length > 0) migration_name = args.name;
  // Parse migration path
  if(args.path) migration_path = path.join(process.cwd(), args.path);
  if(!(fs.existsSync(migration_path))) throw new Error(`${migration_path} folder not exists`); 
  // Parsing date for filename (Solution by Daniel Cerecedo -> https://stackoverflow.com/questions/5914020/javascript-date-to-string)
  var now = new Date();
  var dateData = /^(\d{4})-(\d{2})-(\d{2})T.*$/.exec(now.toJSON());
  var timeData = /^.*T(\d{2}):(\d{2}):(\d{2}).*$/.exec(now.toJSON());
  var myFormat = `${dateData[1]}${dateData[2]}${dateData[3]}${timeData[1]}${timeData[2]}`;
  // Create migration filename
  var migration_filename = `${myFormat} - ${migration_name}.js`;
  // Create, write and save the new file
  fs.writeFile(path.join(migration_path, migration_filename), `module.exports = {
  "up": "",
  "down": ""
}`, { flag: 'w' }, function (err) {
        try {
          if(err) throw err;
          console.log(`----- ${migration_filename} file created successfully! -----`);
        } catch (err) { console.error(err); }
      })
} catch (err) { console.error(err) }