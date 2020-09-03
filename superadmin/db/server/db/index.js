const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '124124124',
    port: '3306',
    database: 'timetrackerdb',
    multipleStatements: true
});


//connect
db.connect((err)=>{
    if(err){
        return console.log('error: '+ err.message);
    }
    console.log("MySQL connected...");
    
})

let timedb ={};

timedb.projects = ()=> {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM Projects`, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.reports = ()=> {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM Reports`, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.users = ()=> {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM Users`, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.superAdmin =()=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM superadmin`, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.adminInfo =()=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM admins`, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.postReport = (sql, rep)=> {
    return new Promise((resolve, reject)=>{
        db.query(sql, [rep.UserName, rep.UserID, rep.ProjectName, rep.ProjectId, rep.Status, rep.Date, rep.From, rep.To, rep.Description], (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.company = (sql, rep)=> {
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.postUser = (sql, rep)=> {
    return new Promise((resolve, reject)=>{
        db.query(sql, [rep.name, rep.password, rep.email, rep.phone, rep.company, rep.adminID], (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.postAdmin = (sql, rep)=> {
    return new Promise((resolve, reject)=>{
        db.query(sql, [rep.name, rep.password, rep.email, rep.company], (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

timedb.postProject =(sql, rep) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, [rep.name, rep.client, rep.status, rep.manager, rep.date, rep.cost, rep.company, rep.adminID], (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.deleteUsers =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.deleteProjects =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.deleteAdmins =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.updateUserInfo =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.updateProjectInfo =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.updateReportInfo =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.updateAdminInfo =(sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

timedb.getHashedPassword = (sql) =>{
    return new Promise((resolve, reject)=>{
        db.query(sql, (err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}

module.exports = timedb;