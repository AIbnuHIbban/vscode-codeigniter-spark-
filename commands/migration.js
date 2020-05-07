const times         = require('./functions')

module.exports = function(vscode, fs, pathwork, path, table_name = false){
    if (table_name !== false) {
        var val = ""
        execute(vscode, fs, pathwork, path, val, table_name)
    }else{
        vscode.window.showInputBox({
            prompt: "name of table",
            placeHolder: "name of table"
        }).then(function(val) {
            execute(vscode, fs, pathwork, path, val)
        })
    }
}

function execute(vscode, fs, pathwork, path, val, table_name = false) {
    var value
    if (table_name !== false) {
        value   = table_name
    }else{
        value   = val
    }
    var date 	 	= new Date()
    var time		= times.leadZeroHours(date)+times.leadZeroMinute(date)+times.leadZeroSecond(date)
    var format		= date.getFullYear()+"-0"+date.getMonth().toString().slice(-2)+"-0"+date.getDate().toString().slice(-2)+"-"+time
    var filename	= `${format}_${value}.php`
    var pathfile 	= path.join(pathwork + "/app/Database/Migrations/"+filename)
    const migration_create = `<?php 
namespace App\\Database\\Migrations;

use CodeIgniter\\Database\\Migration;

class User extends Migration{
    public function up(){

        // Uncomment below if want config
        // $this->forge->addField([
        // 		'id'          		=> [
        // 				'type'           => 'INT',
        // 				'unsigned'       => TRUE,
        // 				'auto_increment' => TRUE
        // 		],
        // 		'title'       		=> [
        // 				'type'           => 'VARCHAR',
        // 				'constraint'     => '100',
        // 		],
        // ]);
        // $this->forge->addKey('id', TRUE);
        $this->forge->createTable('${value}');
    }

    public function down(){
        $this->forge->dropTable('${value}');
    }
}`
    fs.access(pathfile, function(err) {
        if (err) {
            fs.open(pathfile, "w+", function(err, fd) {
                if (err) throw err;
                fs.writeFileSync(fd, migration_create)
                // fs.close(fd)
                var openPath = vscode.Uri.file(pathfile); //A request file path
                vscode.workspace.openTextDocument(openPath).then(function(value) {
                    vscode.window.showTextDocument(value);
                });
            })
            vscode.window.showInformationMessage('Successfully added a migration !');
        }else{
            vscode.window.showWarningMessage("Name already exist !");
        }
    })
}