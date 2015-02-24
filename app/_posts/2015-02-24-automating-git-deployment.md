---
layout: post
title:  Automating Git deployment setup
description: Create a bash script to automate the process of setting up your staging server directory.
comments: true
socialImg: assets/social/grunt-modernizr.png
featPosts: ['arcus','gruntModernizr','iss']
---
 
<style>
	.post h2 {
		font-size: 2.4em;
	}
	.post h3 {
		font-size: 1.5em;
	}
</style>

My job involves creating new projects nearly every week, and pushing them to a live staging server for testing and to show the team and the client.

...tbc/nbed...


nbed... Note: This post uses the [method recommended by Curtis Blackwell](http://curtisblackwell.com/blog/my-deploy-method-brings-most-of-the-boys-to-the-yard). If you need help setting up SSH keys to save your password so you don't have to enter it every time , see [this link](http://kb.site5.com/shell-access-ssh/how-to-generate-ssh-keys-and-login-to-your-account-with-ssh/?id=185945). Note that there are already SSH public keys stored in /.ssh/authorized_keys on the server, so please don't overwrite these: Instead, [add your new one to the end of the list](http://www.cyberciti.biz/tips/linux-multiple-ssh-key-based-authentication.html).

### Create a bash file to automate the process:

Copy the following to a text document and save it as a shell file. I called mine `gitsetup.sh`:

    # This script sets up a Git post receive hook for easy deployment.
    # Created by Richard Westenra
    # See http://richardwestenra.com/automating-git-deployment/

    echo "Hey there! This script sets up a Git post-receive hook for easy deployment."
    # Get the client and project name
    echo "Please enter the full path for the project, including the project name."
    echo "Do not include preceding or trailing slashes."
    read path

    # echo verbose commands
    set -x

    # Create the repo directory.
    mkdir -p $path/.git
    cd $path/.git

    # Run git init and set up git hooks in the directory.
    git init --bare
    cat > hooks/post-receive << EOF
    #!/bin/sh
    GIT_WORK_TREE=/$path git checkout -f
    EOF
    chmod +x hooks/post-receive

    set +x
    # We're done!
    echo "Git post receive hook is set up at $path/.git"

Place this file in the root of your staging server directory.

### Setting up a folder to deploy to:
1. ssh into test server. See [this link](http://ankitahuja.com/blog/2011/05/06/deploying-on-dreamhost-using-git/) if you need help getting ssh set up.
2. Assuming that you're already in the same directory as the shell file, execute the command `bash gitsetup.sh` (or whatever you called your file). It will ask you for the full path to the desired directory, then automatically set up the remote git repo.
3. Add the new remote url to your local dev repo: `git remote add remotename username@hostname:path/to/folder/.git/`. If you use prefer to use grunt then I recommend [grunt-build-control](https://blog.5apps.com/2014/05/29/deploying-static-apps-with-grunt-build-control-on-5apps-deploy.html).

Now you can `git push remotename` (or `grunt deploy`) to deploy!

