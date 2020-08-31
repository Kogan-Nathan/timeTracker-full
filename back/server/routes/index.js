// require('dotenv').config();

const express = require('express');
const db = require('../db')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')

// GET //----------------------------------------------------------

router.get('/adminInfo', async (req, res)=>{
    try{
        let results = await db.adminInfo();
        res.json(results)
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
})


router.get('/allreports', async (req, res, next)=>{
    try{
        let results = await db.reports();
        res.json(results)

    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});

router.get('/reports', verify, async (req, res, next)=>{
    try{
        let results = await db.reports();
        let filtered = results.filter(report=> report.UserId===req.user.id)

        res.json(filtered)

    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});

router.get('/reportsByUser', async (req, res, next)=>{
    const user = parseInt(req.header('user-id'))
    try{
        let results = await db.reports();
        let filtered = results.filter(report=> report.UserId===user)
        res.json(filtered)

    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});

router.get('/reportsByProject', async (req, res, next)=>{
    const project = parseInt(req.header('project-id'))
    try{
        let results = await db.reports();
        let filtered = results.filter(report=> report.ProjectId===project)
        res.json(filtered)

    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});
 
router.get('/projects', async (req, res, next)=>{
    try{
        let results = await db.projects();
        res.json(results)
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});

router.get('/users', async (req, res, next)=>{
    try{
        let results = await db.users();
        res.json(results)

    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});

router.get('/getIndex',verify, (req, res, next)=>{
    try{
        res.json(req.user.id)
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "Internal Server Error", status: 500})
    }
});

router.get('/getToken', verify, (req, res)=> {
    try{
        let userMail = req.user.mail
        res.send({userMail})  
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

// POST //----------------------------------------------------------

router.post('/usershash', async (req, res)=> {
    try{
        let sql = `SELECT password FROM users WHERE email="${req.body.emailBody}"`  
        let hashed =  await db.getHashedPassword(sql, req);
        let hashStr = hashed[0].password;
        bcrypt.compare(req.body.passwordBody,hashStr, function(err,result){ 
            if(err){
                throw (err)
            }
            if(result){   
                const accsessToken = jwt.sign({id: req.body.id}, "" + process.env.JWT_KEY)  
                res.header('auth-token', accsessToken).send({accsessToken:accsessToken})
            } 
            if(!result){
                res.status(403).json({message: "Forbidden", status: 403})
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.post('/reports',  (req, res)=> {
    try{
        const rep = req.body;
        const sql = "INSERT INTO reports (UserName,UserID,ProjectName,ProjectId,Status,`Date`,`From`,`To`,`Description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"  
        db.postReport(sql, rep);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.post('/projects',  (req, res)=> {
    try{
        const rep = req.body;
        const sql = "INSERT INTO projects (projectName,projectClient, projectStatus, projectManager,projectDate,projectCost) VALUES (?, ?, ?, ?, ?, ?)"  
        db.postProject(sql, rep);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.post('/users', async (req, res)=> {  
    try{
        const sql = `INSERT INTO users (name,password,email,phone) VALUES (?, ?, ?, ?)`;
        await bcrypt.hash(req.body.password,10, function(err,hash){
             db.postUser(sql, {name: req.body.name, password:hash, email: req.body.email, phone: req.body.phone}); 
        })
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

// DELETE //----------------------------------------------------------

router.delete('/projects',  (req, res)=> {
    try{
        const sql = `DELETE FROM projects WHERE projectID IN (${req.body})`;
        db.deleteProjects(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.delete('/users',  (req, res)=> {
    try{ 
        const sql = `DELETE FROM users WHERE id IN (${req.body})`
        db.deleteUsers(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        console.log(e);
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

// PUT //----------------------------------------------------------

router.put('/users/name', (req, res) =>{
    try{
        const sqlUsers = `UPDATE users SET name = "${req.body.name}" WHERE id = ${req.body.id}`;
        const sqlReports = `UPDATE reports SET UserName = "${req.body.name}" WHERE UserId = ${req.body.id}`;
        db.updateUserInfo(sqlUsers);
        db.updateReportInfo(sqlReports);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/users/email', (req, res) =>{
    try{
        const sql = `UPDATE users SET email = "${req.body.email}" WHERE id = ${req.body.id}`;
        db.updateUserInfo(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/users/password', (req, res) =>{
    try{
        bcrypt.hash(req.body.password,10, function(err,hash){
            const sql = `UPDATE users SET password = "${hash}" WHERE id = ${req.body.id}`;
            db.updateUserInfo(sql);
        })
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/users/phone', (req, res) =>{
    try{
        const sql = `UPDATE users SET phone = "${req.body.phone}" WHERE id = ${req.body.id}`;
        db.updateUserInfo(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/projects/name', (req, res) =>{
    try{
        const sqlProject = `UPDATE projects SET projectName = "${req.body.name}" WHERE projectID = ${req.body.id}`;
        const sqlReport = `UPDATE reports SET ProjectName = "${req.body.name}" WHERE ProjectID = ${req.body.id}`;
        db.updateProjectInfo(sqlProject);
        db.updateReportInfo(sqlReport);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/projects/client', (req, res) =>{
    try{
        const sql = `UPDATE projects SET projectClient = "${req.body.client}" WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/projects/manager', (req, res) =>{ 
    try{
        const sql = `UPDATE projects SET projectManager = "${req.body.manager}" WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/projects/cost', (req, res) =>{
    try{
        const sql = `UPDATE projects SET projectCost = ${req.body.cost} WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

router.put('/status', (req, res) =>{
    try{
        const sqlUser = `UPDATE users SET status = ADDTIME("${req.body.userStatus}" ,"${req.body.status}") WHERE id = ${req.body.userId};`

        const sqlProject = `UPDATE projects SET projectStatus = ADDTIME("${req.body.projectStatus}" ,"${req.body.status}") WHERE projectID = ${req.body.projectId};`
        db.updateProjectInfo(sqlProject);
        db.updateUserInfo(sqlUser);
        res.status(200).json({message: "Success", status: 200})
    }
    catch(e){
        res.status(404).json({message: "Page Not Found", status: 404})
    }
})

module.exports = router;