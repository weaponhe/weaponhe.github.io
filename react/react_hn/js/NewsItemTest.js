var $ = require('jquery')
var NewsItem = require('./NewsItem')
var React = require('react')
var ReactDom = require('react-dom')

$.ajax({
    url: '/json/items.json',
}).then(function (items) {
    console.log(items[0])
    ReactDom.render(<NewsItem item={items[0]} rank={1}/>, $('#content')[0])
})