var $ = require('jquery')
var React = require('react')
var url = require('url')
var moment = require('moment');

class NewsItem extends React.Component {
    getCommentLink() {
        var commentText = 'discuss';
        if (this.props.item.kids && this.props.item.kids.length) {
            commentText = this.props.item.kids.length + ' comments';
        }

        return (
            <a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
        );
    }

    getSubtext() {
        return (
            <div className="newsItem-subtext">
                {this.props.item.score} points by <a
                href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {moment.utc(this.props.item.time * 1000).fromNow()}
                | {this.getCommentLink()}
            </div>
        );
    }

    getTitle() {
        return (
            <div className="newsItem-title">
                {this.props.item.title}({this.getDomain()})
            </div>
        );
    }

    getDomain() {
        return url.parse(this.props.item.url).hostname;
    }


    getRank() {
        return (
            <div className="newsItem-rank">
                {this.props.rank}.
            </div>
        );
    }

    getVote() {
        return (
            <div className="newsItem-vote">
                <a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&whence=news'}>
                    <img src="../img/grayarrow2x.gif" width="10"/>
                </a>
            </div>
        )
    }

    render() {
        return (
            <div className="newsItem">
                {this.getRank()}
                {this.getVote()}
                <div className="newsItem-itemText">
                    {this.getTitle()}
                    {this.getSubtext()}
                </div>
            </div>
        );
    }
}

module.exports = NewsItem