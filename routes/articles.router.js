const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articles.controller');
const jwtVerify = require('../helpers/jwtVerify');

/**
 * @api {get} /v1/articles Get articles
 * @apiName GetArticles
 * @apiGroup Articles
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a list of articles. You can query this endpoint with parameter 'news_site' to return
 * articles provided by a particular news site. This endpoint can also be queried with 'search' to search
 * for articles which match your search parameter.
 *
 * Also supports page, limit, offset and sort options.
 *
 * @apiExample Search for articles
 * https://spaceflightnewsapi.net/api/v1/articles?search=dragon
 *
 * @apiExample Search for articles published by SpaceX
 * https://spaceflightnewsapi.net/api/v1/articles?news_site=spacex
 *
 * @apiParam {String} title Title of the article.
 * @apiParam {String} news_site News site that published the article.
 * @apiParam {String} news_site_long Unformatted name of the news site that published the article.
 * @apiParam {String} url URL of the article.
 * @apiParam {String} featured_image Featured image of the article.
 * @apiParam {Number} id ID from the news site.
 * @apiParam {String} _id ID generated by SNAPI.
 * @apiParam {Number} date_published Date when news site added the article
 * @apiParam {Number} date_added Date when article was added to SNAPI
 * @apiParam {Array} categories Array with categories.
 * @apiParam {Array} tags Array with tags.
 *
 * @apiSuccess {String} title Title of the article.
 * @apiSuccess {String} news_site News site that published the article.
 * @apiSuccess {String} news_site_long Unformatted name of the news site that published the article.
 * @apiSuccess {String} url URL of the article.
 * @apiSuccess {String} featured_image Featured image of the article.
 * @apiSuccess {Number} id ID from the news site.
 * @apiSuccess {String} _id ID generated by SNAPI.
 * @apiSuccess {Number} date_published Date when news site added the article.
 * @apiSuccess {Number} date_added Date when article was added to SNAPI.
 * @apiSuccess {Array} categories Array with categories.
 * @apiSuccess {Array} tags Array with tags.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "docs": [
 *     {
 *
 *     }
 *   ],
 *   "totalDocs": 719,
 *   "limit": 10,
 *   "hasPrevPage": false,
 *   "hasNextPage": true,
 *   "page": 1,
 *   "totalPages": 72,
 *   "prevPage": null,
 *   "nextPage": 2
 * }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "Uh-oh, something went wrong. Please try again!"
 *     }
 */
router.get('/', ArticleController.getArticles);

/**
 * @api {post} /v1/articles Post articles
 * @apiName PostArticles
 * @apiGroup Articles
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization A bearer token
 * @apiPermission admin
 *
 * @apiParam {String} title Title of the article.
 * @apiParam {String} news_site News site that published the article.
 * @apiParam {String} news_site_long Unformatted name of the news site that published the article.
 * @apiParam {String} url URL of the article.
 * @apiParam {String} featured_image Featured image of the article.
 * @apiParam {Number} id ID from the news site.
 * @apiParam {String} _id ID generated by SNAPI.
 * @apiParam {Number} date_published Date when news site added the article
 * @apiParam {Number} date_added Date when article was added to SNAPI
 * @apiParam {Array} categories Array with categories.
 * @apiParam {Array} tags Array with tags.
 *
 * @apiSuccess {String} title Title of the article.
 * @apiSuccess {String} news_site News site that published the article.
 * @apiSuccess {String} news_site_long Unformatted name of the news site that published the article.
 * @apiSuccess {String} url URL of the article.
 * @apiSuccess {String} featured_image Featured image of the article.
 * @apiSuccess {Number} id ID from the news site.
 * @apiSuccess {String} _id ID generated by SNAPI.
 * @apiSuccess {Number} date_published Date when news site added the article.
 * @apiSuccess {Number} date_added Date when article was added to SNAPI.
 * @apiSuccess {Array} categories Array with categories.
 * @apiSuccess {Array} tags Array with tags.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *{
 *   "message": "Article saved",
 *   "article": {
 *       "date_published": 1550662153,
 *       "date_added": 1550662153,
 *       "tags": [
 *           "control",
 *           "russian",
 *           "radio",
 *           "telescope",
 *           "satellite",
 *           "lost"
 *       ],
 *       "categories": [
 *           "Space Exploration"
 *       ],
 *       "_id": "5c6d3eb769e4a32ec36c7240",
 *       "news_site": "phys",
 *       "news_site_long": "Phys",
 *       "title": "Control of Russian radio telescopasdasde satellite sdfsdfsdfsdflostsdfgdfgsdfsdfsdfdfssdfsdfdf",
 *       "url": "https://phys.org/news/2019-01-rusasdasdsian-radio-tsdfsdfelescopesdf-satellite-lossdfsddfsdfsdfgdfgft.html",
 *       "featured_image": "https://dummyimage.com/1024x1024/2c3e50/fcfcfc&text=No+Image+Available",
 *       "__v": 0
    }
*}
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 * {
 *   "error": "title, url and _id must be unique"
 * }
 *
 * @apiErrorExample Forbidden-Response:
 *     HTTP/1.1 403 Forbidden
 *     Forbidden
 */
router.post('/', jwtVerify, ArticleController.postArticles);

/**
 * @api {delete} /v1/articles Delete articles
 * @apiName DeleteArticles
 * @apiGroup Articles
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization A bearer token
 * @apiPermission admin
 *
 * @apiParam {String} _id ID's of the articles that you want to delete. Chain to delete multiple at the same time.
 */
router.delete('/', jwtVerify, ArticleController.deleteArticles);

module.exports = router;
