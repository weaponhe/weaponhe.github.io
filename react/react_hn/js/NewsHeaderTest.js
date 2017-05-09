var $ = require('jquery')
var React = require('react')
var ReactDom = require('react-dom')
var NewsHeader = require('./NewsHeader');

ReactDom.render(<NewsHeader/>, $('#content')[0]);