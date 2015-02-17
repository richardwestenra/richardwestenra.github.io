---
layout: post
title:  Adding non-core feature-detects with Grunt-Modernizr
description: A quick guide on how to use Modernizr's community feature detects with grunt-modernizr.
comments: true
socialImg: assets/social/grunt-modernizr.png
featPosts: ['arcus','dailymail','iss']
---

<style>
	.post h2 {
		font-size: 2.4em;
	}
	.post h3 {
		font-size: 1.5em;
	}
</style>

[Modernizr](http://modernizr.com/) is a JavaScript library which detects HTML5 and CSS3 features in users' browsers, and makes it easy to take advantage of cutting-edge techniques without abandoning users on older browsers. It also has a modular [build tool](http://modernizr.com/download/), which is great for optimising its file size and improving page speed. However using this in your website can make your code-base less maintainable. This is because it can be a little hard to keep track of which features you're using where, which can be tricky when you need to add new feature-detects.

This is where [Grunt-Modernizr](https://github.com/Modernizr/grunt-modernizr) comes in. This tool automatically sifts through your project files looking for references to Modernizr tests, and generates a custom Modernizr file containing only the bits that you need. It's basically magic, and it has revolutionised the way I use Modernizr.

Unfortunately, one of the trickier aspects of using grunt-modernizr is adding non-core feature detects. There are some really useful tests (such as [CSS pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)) which aren't currently part of the core feature set, so they aren't tested by default. You must add them manually.

This is very simple once you know how, but I recently spent more time than I'd care to admit trying to figure out the 'right' way to do it. There aren't many instructions online so I'm posting this for future reference, and in case others run into the same problem.

**Nota bene:** I use a variation of Yeoman's [Webapp generator](https://github.com/yeoman/generator-webapp) as my standard project boilerplate, so these instructions assume a similar setup using Bower, grunt-usemin, etc.


<br/>

### Step 1: Set up the test in your local dev environment

Assuming that you've installed Modernizr with Bower, open Modernizr's [feature-detects directory](https://github.com/Modernizr/Modernizr/tree/master/feature-detects) (which should be in `bower_components/modernizr/feature-detects/`. If you don't use Bower, then you might need to download the right test file from [Github](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Find the script with the feature detect that you need, and copy the path to the file. Include this script in your header next to the regular Modernizr script. It should look a bit like this:

    <!-- build:js scripts/vendor/modernizr.js -->
    <script src="bower_components/modernizr/modernizr.js"></script>
    <script src="bower_components/modernizr/feature-detects/css-pointerevents.js"></script>
    <!-- endbuild -->


<br/>

### Step 2: Add the test to your production build

Update the options in your Gruntfile's Modernizr config block, so that it includes your custom tests in the production build. You should be okay to just add `matchCommunityTests: true` and let it automatically find your non-core tests, but if you want to be certain then add your tests to the `tests` array:

    modernizr: {
      dist: {
      	// Other options here...
        matchCommunityTests: true, // Set this to true to auto-detect non-core tests
        tests: [ 'csspointerevents' ]  // Manually add tests here
      }
    }

<br/>

That's it, you're done. If this post helps you out or you run into any issues, please let me know in the comments!
<br/>