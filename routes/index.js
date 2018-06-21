var express = require('express');
var router = express.Router();
var request = require('request-promise-native');
var knex = require('../knex.js');
var sendMe = {};


getWeather = function() {
  return request({
    method: 'GET',
    uri: 'https://api.darksky.net/forecast/a60a7a79843d5ce63a4cfa7c44a0be78/30.2890,-97.7054',
  }).then(function(response) {
    let weatherData = JSON.parse(response);
    let currentData = {
      currentTemp: weatherData.currently.temperature,
      precipProbability: weatherData.currently.precipProbability,
      weatherIcon: weatherData.currently.icon,
      humidity: weatherData.currently.humidity,
    };
    let dailyData = {
      highTemp: weatherData.daily.data[0].temperatureHigh,
      lowTemp: weatherData.daily.data[0].temperatureLow,
    }
    let weather = {
      dailyData: dailyData,
      currentData: currentData
    };
    sendMe.weather = weather;
    return
  })
};

getNews = function() {
  return request({
    method: 'GET',
    uri: 'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'apiKey=95e5cadce25c4e6997eea61e8b3128f0',
  }).then(function(response) {
    let newsObject = JSON.parse(response);
    let articleA = newsObject.articles[0],
      articleB = newsObject.articles[1],
      articleC = newsObject.articles[2];
    let headlineA = articleA.title,
      headlineB = articleB.title,
      headlineC = articleC.title;
    let urlA = articleA.url,
      urlB = articleB.url,
      urlC = articleC.url;
    let imageA = articleA.urlToImage,
      imageB = articleB.urlToImage,
      imageC = articleC.urlToImage;
    let news = {
      articleA: headlineA,
      articleB: headlineB,
      articleC: headlineC,
      urlA: urlA,
      urlB: urlB,
      urlC: urlC,
      imageA: imageA,
      imageB: imageB,
      imageC: imageC,
    }
    sendMe.news = news;
    return
  })
}
getSports = function() {
  return request({
    method: 'GET',
    uri: 'http://worldcup.sfg.io/matches/today',
  }).then(function(response) {
    let sportsObject = JSON.parse(response);
    let gameA = sportsObject[0],
      gameB = sportsObject[1],
      gameC = sportsObject[2];


    let sports = {
      gameAstatus: gameA.status,
      gameBstatus: gameB.status,
      gameCstatus: gameC.status,
      awayTeamA: gameA.away_team.country,
      awayTeamB: gameB.away_team.country,
      awayTeamC: gameC.away_team.country,
      homeTeamA: gameA.home_team.country,
      homeTeamB: gameB.home_team.country,
      homeTeamC: gameC.home_team.country,
      awayTeamScoreA: gameA.away_team.goals,
      awayTeamScoreB: gameB.away_team.goals,
      awayTeamScoreC: gameC.away_team.goals,
      homeTeamScoreA: gameA.home_team.goals,
      homeTeamScoreB: gameB.home_team.goals,
      homeTeamScoreC: gameC.home_team.goals,
    }
    sendMe.sports = sports;
    return
  })
}

getTodos = function() {
  return knex('todos').where('completed', false).select('todos.text')
    .then(function(response) {
      console.log(response);
      sendMe.todos = response;
    })
}

/* GET home page. */
router.get('/', function(req, res, next) {

  return getSports()
    .then(getWeather())
    .then(getTodos())
    .then(getNews())
    .then(function() {

      res.render('index', {
        sendMe
      })
    })
})



module.exports = router;
