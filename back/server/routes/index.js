// require('dotenv').config();

const express = require('express');
const db = require('../db')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')


router.get('/reports', async (req, res, next)=>{
    try{
        let results = await db.reports();
        res.json(results)

    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
 
router.get('/projects', verify, async (req, res, next)=>{
    try{
        let results = await db.projects();
        res.json(results)
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/users', async (req, res, next)=>{
    try{
        let results = await db.users();
        res.json(results)

    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

const SECRET = "youkey.babe.kissme"

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
                    const accsessToken = jwt.sign({mail: req.body.emailBody}, "" + process.env.JWT_KEY)
                    res.header('auth-token', accsessToken).send({accsessToken});                                
                } 
                   // res.cookie('accsessToken', accsessToken, { httpOnly: true });
            })    
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

router.get('/getToken', verify, (req, res)=> {
    try{
        let userMail = req.user.mail
        console.log(userMail);
        res.send({userMail})  
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})


router.post('/reports',  (req, res)=> {
    try{
        const rep = req.body;
        const sql = "INSERT INTO reports (UserName,UserID,ProjectName,Status,`Date`,`From`,`To`,`Description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"  
        db.postReport(sql, rep);
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

router.post('/projects',  (req, res)=> {
    try{
        const rep = req.body;
        const sql = "INSERT INTO projects (projectName,projectClient, projectStatus, projectManager,projectDate,projectCost) VALUES (?, ?, ?, ?, ?, ?)"  
        db.postProject(sql, rep);
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

router.post('/users', async (req, res)=> {
    try{
        const rep = req.body;
        const sql = `INSERT INTO users (name,password,email,phone) VALUES (?, ?, ?, ?)`;
        await bcrypt.hash(req.body.password,10, function(err,hash){
             db.postUser(sql, {name: req.body.name, password:hash, email: req.body.email, phone: req.body.phone}); 
        })
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

router.delete('/projects',  (req, res)=> {
    try{
        const sql = `DELETE FROM projects WHERE projectID IN (${req.body})`;
        db.deleteProjects(sql);
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

router.delete('/users',  (req, res)=> {
    try{ 
        const sql = `DELETE FROM users WHERE id IN (${req.body})`
        db.deleteUsers(sql);
    }
    catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

router.put('/users/name', (req, res) =>{
    try{
        const sql = `UPDATE users SET name = "${req.body.name}" WHERE id = ${req.body.id}`;
        db.updateUserInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})


router.put('/users/email', (req, res) =>{
    try{
        const sql = `UPDATE users SET email = "${req.body.email}" WHERE id = ${req.body.id}`;
        db.updateUserInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/users/password', (req, res) =>{
    try{
        bcrypt.hash(req.body.password,10, function(err,hash){
        const sql = `UPDATE users SET password = "${hash}" WHERE id = ${req.body.id}`;
        db.updateUserInfo(sql);
        })
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/users/phone', (req, res) =>{
    try{
        const sql = `UPDATE users SET phone = "${req.body.phone}" WHERE id = ${req.body.id}`;
        db.updateUserInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/projects/name', (req, res) =>{
    try{
        const sql = `UPDATE projects SET projectName = "${req.body.name}" WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/projects/client', (req, res) =>{
    try{
        const sql = `UPDATE projects SET projectClient = "${req.body.client}" WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/projects/manager', (req, res) =>{ 
    try{
        const sql = `UPDATE projects SET projectManager = "${req.body.manager}" WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/projects/cost', (req, res) =>{
    try{
        const sql = `UPDATE projects SET projectCost = ${req.body.cost} WHERE projectID = ${req.body.id}`;
        db.updateProjectInfo(sql);
    }
    catch(e){
        res.sendStatus(404);
    }
})

router.put('/status', (req, res) =>{
    try{
        const sqlUser = `UPDATE users SET status = ADDTIME("${req.body.userStatus}" ,"${req.body.status}") WHERE id = ${req.body.userId};`

        const sqlProject = `UPDATE projects SET projectStatus = ADDTIME("${req.body.projectStatus}" ,"${req.body.status}") WHERE projectID = ${req.body.projectId};`
        db.updateProjectInfo(sqlProject);
        db.updateUserInfo(sqlUser);

    }
    catch(e){
        res.sendStatus(404);
    }
})


module.exports = router;