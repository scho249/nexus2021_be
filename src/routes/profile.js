const { Router, Request, Response, NextFunction } = require('express')
// const passport = require('passport');
// const { verifyInfo, authJwt } = require("../middlewares");
const ProfileService = require('../services/profile.js');
const { verifyInfo, authJwt } = require("../middlewares");
const { JWT_SECRET, FE_ADDR, DOMAIN } = require('../config/index.js');

module.exports = function(app) {
      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      /**
     * @api {post} api/project/createProfile  Create a new student Profile
     * @apiGroup NexusBuilders
     * @apiName CreateProfile
     *
     * @apiUse JwtHeader
     *
     * @apiParam {String} title                 Project title
     * @apiParam {String} size                  Project size
                                    ['Micro','Small','Medium','Large']
     * @apiParam {String} location              Project location
     * @apiParam {String} duration              Project duration
        ['1-3 months','3-6 months','6-9 months', 'More than 9 months']
     * @apiParam {String} description           Project description
     * @apiParam [{String}] categories          Project categories
     * @apiParam [Array] Roles                  Project roles
              - {String} Title                  Role title
              - [{String}] skill                Role skills
     *
     * @apiSuccess {Number} projectId Project ID
     **/
    app.post("/api/profile/createProfile/:user_id",
          ProfileService.createProfile
    )
    //      [
    //        verifyInfo.checkProfileExists
    //      ],
    //      ProfileService.createProfile
    // );

};
