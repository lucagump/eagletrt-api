import 'mocha';
import app from '../../../source/server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
let should = chai.should();

import { DB } from '../../../source/controllers/database/database';


process.env.NODE_ENV = 'test'; 
chai.use(chaiHttp);

export default function (): void {

	describe("Basic API Request", () => {
		it("should return status 200 on call", async () => {
		return chai
			.request(app)
			.get("/")
			.then(res => {
			chai.expect(res.status).to.eql(200);
			});
		});
	});

	//Our parent block
	describe('Users', () => {
		beforeEach((done) => { //Before each test we empty the database
			DB.Models.User.remove({}, (err) => { 
			done();		   
			});		
		});
	/*
	* Test the /GET route
	*/
	describe('/GET User', () => {
		it('it should GET all the users', (done) => {
				chai.request(app)
				.get('/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
				done();
				});
		});
	});
	/*
	* Test the /POST route
	*/
	describe('/POST User', () => {
		it('it should not POST a user without name field', (done) => {
			let user = {
			email: "JeeR@Tolkien.com",
				phone: 1954
			}
				chai.request(app)
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('name');
					res.body.errors.pages.should.have.property('kind').eql('required');
				done();
				});
		});
		it('it should POST a user ', (done) => {
			let user = {
				name: "The Lord of the Rings",
				email: "JeeR@Tolkien.com",
				phone: 1954
			}
				chai.request(app)
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('user successfully added!');
					res.body.user.should.have.property('name');
					res.body.user.should.have.property('email');
					res.body.user.should.have.property('phone');
					res.body.user.should.have.property('creation_date');
				done();
				});
		});
	});
}
//  /*
//   * Test the /GET/:id route
//   */
//   describe('/GET/:id user', () => {
// 	  it('it should GET a user by the given id', (done) => {
// 	  	let user = new user({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
// 	  	user.save((err, user) => {
// 	  		chai.request(server)
// 		    .get('/user/' + user.id)
// 		    .send(user)
// 		    .end((err, res) => {
// 			  	res.should.have.status(200);
// 			  	res.body.should.be.a('object');
// 			  	res.body.should.have.property('title');
// 			  	res.body.should.have.property('author');
// 			  	res.body.should.have.property('pages');
// 			  	res.body.should.have.property('year');
// 			  	res.body.should.have.property('_id').eql(user.id);
// 		      done();
// 		    });
// 	  	});
			
// 	  });
//   });
//  /*
//   * Test the /PUT/:id route
//   */
//   describe('/PUT/:id user', () => {
// 	  it('it should UPDATE a user given the id', (done) => {
// 	  	let user = new user({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
// 	  	user.save((err, user) => {
// 				chai.request(server)
// 			    .put('/user/' + user.id)
// 			    .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
// 			    .end((err, res) => {
// 				  	res.should.have.status(200);
// 				  	res.body.should.be.a('object');
// 				  	res.body.should.have.property('message').eql('user updated!');
// 				  	res.body.user.should.have.property('year').eql(1950);
// 			      done();
// 			    });
// 		  });
// 	  });
//   });
});
  