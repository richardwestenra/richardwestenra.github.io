[richardwestenra.com](http://richardwestenra.com/)
===============

This is my personal website/blog/portfolio. It's built with [Jekyll](http://jekyllrb.com/) and runs on GitHub Pages. Most of the pages have a custom design, and hence many include additional CSS/JS, either internal in the HTML, or in separate files.

### Development

Install Ruby (with rbenv ideally), then run `bundle install` to install dependencies. Then run `bundle exec jekyll serve` to start development.

### Hosting

This site is currently hosted with Github Pages: The live URL is [richardwestenra.github.io](https://richardwestenra.github.io/) / [richardwestenra.com](https://www.richardwestenra.com/).

### Design history

#### 2010
I built the site in Wordpress. It was my second portfolio site, and I was moving to London soon and needed to get a job, and I wanted to jump on that "magazine-style bespoke blog-post layout" trend I'd be hearing so much about.

#### 2014
Smartphones became too common to ignore, so the site needed to be made responsive. Also, Github Pages and static site generators were getting big, and I wanted to stop having to pay for shared PHP web hosting when I could get free super-fast static hosting on GitHub instead. Also also, I was using Grunt and Yeoman for everything, so why should this site be any different? So I moved the site to [Jekyll](http://jekyllrb.com/)/[Grunt](http://gruntjs.com/)/[Yeoman](http://yeoman.io/) (specifically, [Generator-Jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb/)).

#### 2019
It's been a few years since Grunt was popular, and it's starting to lose support. I only update this site about once a year or so, and every time I do, I need to fix the tooling first, because inevitably it's stopped working. It's probably easier to switch to a standard Jekyll setup, because at least it'll be low-maintenance, even if it is Ruby. Ideally I'd use Gatsby or Eleventy, but that seems like a lot of work, and an extra build step.

### Blog, portfolio and linkblog items

The Blog posts, Portfolio items and Linkblog items are all listed in YAML in the `_data` directory. This isn't the most DRY way of listing the blog posts, but they're all created in different ways (mostly with static html pages instead of posts) so it gives me more control over the order.

Most of the blog posts are built as static html pages rather than using markup files in `_posts`. Many of them have custom images and other assets, and these are in the `img`, `assets` and `fonts` folders: Usually organised in folders named after the post or the font name.

### Assets
In order to allow `useminprepare` to detect all of the CSS/JS used in the build, they must be added to a throwaway html file called `useminprepare.html`. This gets scanned during build then deleted before deployment. It's the best [workaround](https://github.com/yeoman/grunt-usemin/pull/382#issuecomment-61409135) that I could find.

Social images must be added to the `/assets/` directory (not `/images/`) otherwise their filenames will be revved and their URLs will be incorrect.
