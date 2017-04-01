'use strict'
let Book = require('../models/book');

const bodyParser = require('body-parser');

module.exports={

getAllBooks:(req, res) => {
        var response = {}
        Book.find({ isDeleted: 0}, (err, data) => {
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },
  
  findBookByPrice:(req,res)=> {
        var response = {}
        //we specifie the interval of price by req 
        Book.aggregate({$match: { price:{ $gt: 70, $lt: 90 }}}, (err, data) => {
          
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },

    findBookByName:(req,res)=> {
        var response = {}
        //we specifie the interval of price by req 
        Book.aggregate({$match: { name: req.params.name}}, (err, data) => {
          
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },

createBook:(req,res,next)=>{
    let db=new Book(req.body);
   
  var response = {};
 db.save(function(err){
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if(err) {
                return res.send (err)
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
     


},

findBookById:(req,res)=>{

var response={};

Book.findOne({_id: req.params._id}, (err, book) => {
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response =book;
            }
            res.json(response);
        })


},

deleteBook:(req,res)=>{
   
var response={};
    Book.findOneAndUpdate({name: req.params.name }, req.body,(err,book) =>{
        
       if (err) return res.status(400).json(err);
   
      
             else {
                response = book;
            }
            res.json(response);
        });
  }
,
updateBook: (req, res, next) => {
    var response={};
    Book.findOneAndUpdate({ name: req.params.name}, req.body, function(err, book) {
      if (err) return res.status(400).json(err);
   
      
             else {
                response =book;
            }
            res.json(response);
        });
  

}



};