richardwestenra.github.io
===============

My blog/portfolio/homepage. Built with [Jekyll](http://jekyllrb.com/), [Grunt](http://gruntjs.com/) and [Yeoman](http://yeoman.io/) (specifically, [Generator-Jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb/)).

### Hosting

This site is currently hosted with Github Pages: The production repo for this site is over at [github.com/richardwestenra/richardwestenra.github.io](https://github.com/richardwestenra/richardwestenra.github.io). I'm planning on pointing the [richardwestenra.com](http://richardwestenra.com/) url to it once it's finished.

### Design history

This is a port (and very minor redesign) of my old site, which was built in Wordpress in 2010. For the new site, I've adapted the homepage to make it more responsive, optimised the CSS/JS, and updated the content (particularly the portfolio). I've also kept most of the old posts, made them responsive where possible.

### Blog, portfolio and linkblog items

The Blog posts, Portfolio items and Linkblog items are all listed in YAML in the `_data` directory. This isn't the most DRY way of listing the blog posts, but they're all created in different ways (mostly with static html pages instead of posts) so it gives me more control over the order.

Most of the blog posts are built as static html pages rather than using markup files in `_posts`. Many of them have custom images and other assets, and these are in the `img`, `assets` and `fonts` folders: Usually organised in folders named after the post or the font name.