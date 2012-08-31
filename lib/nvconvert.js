

var async = require('async'),
    u     = require('underscore'),
    walk  = require('walk'),
    mime = require('mime'),
    fs = require('fs'),
    ffmpeg= require('fluent-ffmpeg');

function Nvconvert() {
  // video source resources
  this.from = {};
  this.arguments = {};
  this.mimeTypeExtensions = {
    'video/x-flv': '.flv'
  };

  var self = this;

  this.runSeriesFuncList = new Array();
  this.runSeriesFuncList.push(function(cb) {  //arguments validation function
    self.validateArguments(function(err) {
      if (err) cb(err);
      else cb(null);
    });
  });

  this.runSeriesFuncList.push(function(cb) {  //set source video files paths
    self.setFromVideoFiles(function(err) {
      if (err) cb(err);
      else cb(null);
    });
  });

  this.runSeriesFuncList.push(function(cb) {  //convert videos
    self.convertVideos(function(err) {
      if (err) cb(err);
      else cb(null);
    });
  });

};

Nvconvert.prototype.run = function(argv, callback) {
  var self = this;
  this.arguments = argv;

  async.series(this.runSeriesFuncList,
  function(error) {
    if(error) callback(error);
  });
};

Nvconvert.prototype.validateArguments =  function(callback) {
  if(!this.arguments.from.dir) callback('Undefined video source directory');
  if(!this.arguments.from.type) callback('Undefined video source type');
  if(!this.arguments.to.dir) callback('Undefined video destination directory');
  if(!this.arguments.to.type) callback('Undefined video destination type');
  callback(null);
};

Nvconvert.prototype.setFromVideoFiles = function(callback) {
  // find all source video file names which has extension of from.type
  var options = {followLinks: false},
      self    = this,
      walker = walk.walk(this.arguments.from.dir, options),
      mimeType   = '',
      name = '',
      ext = '';
  this.arguments.from.files = [];

  walker.on("file", function(root, fileStats, next) {
    mimeType = mime.lookup(fileStats.name);
    if (mimeType == self.arguments.from.type) {
      name = self.getVideoName(fileStats.name);
      ext = self.getVideoExt(fileStats.name);
      self.arguments.from.files.push({root:root, name:name, ext: ext});
    }
    next();
  });
  walker.on("end", function() {
    callback(null);
  });
};

Nvconvert.prototype.convertVideos = function(callback) {
  var self = this;
  async.forEachSeries(this.arguments.from.files, function(video, callback) {
    self.convertVideo(video, callback);
  }, function(error) {
    if(error) callback(error);
    else
      console.log('Conversion operations are completed ');
  });
};

Nvconvert.prototype.convertVideo = function(video,callback) {
  //console.log(video);

  var sourceName = video.root + '/' + video.name + video.ext,
      outputExt = this.mimeTypeExtensions[this.arguments.to.type],
      outputName = this.arguments.to.dir + '/' + video.name + outputExt;

  var proc = new ffmpeg({ source: sourceName,timeout: 10000 })
        .saveToFile(outputName, function(retcode, error) {
          console.log('file has been converted succesfully');
          callback(null); 
        }); 
};

Nvconvert.prototype.getVideoExt = function(video) {
    var i = video.lastIndexOf('.');
    return (i < 0) ? '' : video.substr(i);
};
Nvconvert.prototype.getVideoName = function(video) {
  var i = video.lastIndexOf('.');
  var name = video.substring(0, i);
  return name;
};

module.exports = exports = new Nvconvert();