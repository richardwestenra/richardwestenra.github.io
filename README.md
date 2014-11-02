[richardwestenra.com](http://richardwestenra.com/)
===============

This is my personal website/blog/portfolio. It's built with [Jekyll](http://jekyllrb.com/), [Grunt](http://gruntjs.com/) and [Yeoman](http://yeoman.io/) (specifically, [Generator-Jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb/)). Most of the pages have a custom design, and hence many include additional CSS/JS, either internal or external.

### Hosting

This site is currently hosted with Github Pages: The production repo for this site is over at [github.com/richardwestenra/richardwestenra.github.io](https://github.com/richardwestenra/richardwestenra.github.io) and the live URL is [richardwestenra.github.io](http://richardwestenra.github.io/) / [richardwestenra.com](http://richardwestenra.com/).

### Design history

This is a port (and very minor redesign) of my old site, which was built in Wordpress in 2010. For the new site, I've adapted the homepage to make it more responsive, optimised the CSS/JS, and updated the content (particularly the portfolio). I've also kept most of the old posts, made them responsive where possible.

### Blog, portfolio and linkblog items

The Blog posts, Portfolio items and Linkblog items are all listed in YAML in the `_data` directory. This isn't the most DRY way of listing the blog posts, but they're all created in different ways (mostly with static html pages instead of posts) so it gives me more control over the order.

Most of the blog posts are built as static html pages rather than using markup files in `_posts`. Many of them have custom images and other assets, and these are in the `img`, `assets` and `fonts` folders: Usually organised in folders named after the post or the font name.

### Assets
In order to allow `useminprepare` to detect all of the CSS/JS used in the build, they must be added to a throwaway html file called `useminprepare.html`. This gets scanned during build then deleted before deployment. It's the best [workaround](https://github.com/yeoman/grunt-usemin/pull/382#issuecomment-61409135) that I could find.

Social images must be added to the `/assets/` directory (not `/img/`) otherwise their filenames will be revved and their URLs will be incorrect.