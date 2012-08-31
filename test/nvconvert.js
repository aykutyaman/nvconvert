

var should = require('chai').should(),
    expect = require('chai').expect,
    nvconvert = require('../lib/nvconvert'),
    foo = 'bar';  

describe("nvconvert", function() {
  
  it('should be an object', function(done) {
    nvconvert.should.be.a('object');
    done();
  });

  it ("should expose run method", function(done) {
    nvconvert.run.should.be.a('function');
    done(); 
  });

  it("should throw an error when video source directory is not set", function(done) {
    var argv = {
      from: {
        type: "f4v"
      },
      to: {
        dir: "/home",
        type: "flv"
      }
    };
    var cb = function(error){
      if (error) {
        throw Error(error);
      }
    };
    (function(){ //throw uses try/catch so it needs a function to execute.
      nvconvert.run(argv, cb);
    }).should.throw(Error, 'Undefined video source directory');  
    done();
  });

  it("should throw an error when video source type is not set", function(done) {
    var argv = {
      from: {
        dir: "/home"
      },
      to: {
        dir: "/home",
        type: "flv"
      }
    };
    var cb = function(error){
      if (error) {
        throw Error(error);
      }
    };
    (function(){ //throw uses try/catch so it needs a function to execute.
      nvconvert.run(argv, cb);
    }).should.throw(Error, 'Undefined video source type');  
    done();
  });
  it("should throw an error when video destination dir is not set", function(done) {
    var argv = {
      from: {
        dir: "/home",
        type: "f4v"
      },
      to: {
        type: "flv"
      }
    };
    var cb = function(error){
      if (error) {
        throw Error(error);
      }
    };
    (function(){ //throw uses try/catch so it needs a function to execute.
      nvconvert.run(argv, cb);
    }).should.throw(Error, 'Undefined video destination directory');  
    done();
  });
  it("should throw an error when video destination dir is not set", function(done) {
    var argv = {
      from: {
        dir: "/home",
        type: "f4v"
      },
      to: {
        dir: "/home/to"
      }
    };
    var cb = function(error){
      if (error) {
        throw Error(error);
      }
    };
    (function(){ //throw uses try/catch so it needs a function to execute.
      nvconvert.run(argv, cb);
    }).should.throw(Error, 'Undefined video destination type');  
    done();
  });
  it("should set video source and destination attributes", function(done) {
    var argv = {
      from: {
        dir: "/myDir",
        type: "f4v"
      },
      to: {
        dir: "/home",
        type: "flv"
      }
    };
    nvconvert.run(argv);
    nvconvert.arguments.from.should.have.property('dir').to.equal(argv.from.dir);
    nvconvert.arguments.from.should.have.property('type').to.equal(argv.from.type);
    nvconvert.arguments.to.should.have.property('dir').to.equal(argv.to.dir);
    nvconvert.arguments.to.should.have.property('type').to.equal(argv.to.type);
    done();
  });

});