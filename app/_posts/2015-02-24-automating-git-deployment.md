---
layout: post
title: Automating Git deployment setup with shell scripts
description: Create a small shell script to automate the process of setting up your staging server directory.
comments: true
featPosts: ['arcus','gruntModernizr','iss']
---

My job involves creating new projects every other week, and pushing them to a live staging server for testing and client presentations. I previously used FTP to upload my projects, but FTP can be risky as it's very easy to accidentally delete/overwrite the wrong files. FTP also makes it difficult to keep track of which files you've changed, so you often end up uploading more files than you need to, which makes deployment take longer than it needs to.

For this reason, I switched to using Git to deploy new projects. Once you've got it set up, all you need to do is run `git push remotename master` (or `grunt deploy` if you use Grunt) to deploy your latest changes to the server, and it will only transmit the code that has changed, reducing upload time. I like [Curtis Blackwell's method](http://curtisblackwell.com/blog/my-deploy-method-brings-most-of-the-boys-to-the-yard), which uses [post-receive hooks](http://gthooks.com/). His article recommends using [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control) for deployment (as do I), but it's not strictly necessary if you'd rather avoid using Grunt.

The only tricky part about using Git for deployment is that setting up each new project requires you to enter several rather unmemorable terminal commands, which is cumbersome and easy to mess up. Since I was doing this frequently, I decided to automate the process with a simple shell script. I've pasted an example below: Feel free to modify it however you like.


### Create a shell script

Copy the following to a text document and save it as a shell file. I called mine **gitsetup.sh**:

    # This script sets up a Git post receive hook for easy deployment.
    # Created by Richard Westenra
    # See http://richardwestenra.com/automating-git-deployment/

    echo "Hey there! This script sets up a Git post-receive hook for easy deployment."
    echo "Please enter the full path for the project, including the project directory."
    echo "Do not include preceding or trailing slashes."
    # Get the folder path
    read path

    # echo verbose commands
    set -x

    # Create the repo directory
    mkdir -p $path/.git
    cd $path/.git

    # Run git init and set up git hooks in the directory
    git init --bare
    cat > hooks/post-receive << EOF
    #!/bin/sh
    GIT_WORK_TREE=/$path git checkout -f
    EOF
    chmod +x hooks/post-receive

    set +x
    # We're done!
    echo "Git post receive hook is set up at $path/.git"

Place this file in the root of your staging server.

### Set up a new directory

Here is the workflow for setting up a new directory to deploy your project to:

1. [SSH into the test server](http://www.wikihow.com/SSH-to-a-Server). You'll want to [generate SSH keys](http://kb.site5.com/shell-access-ssh/how-to-generate-ssh-keys-and-login-to-your-account-with-ssh/?id=185945) to save your password so you don't have to enter it every time, if you haven't already.
2. Assuming that you're already in the same directory as the shell file, execute the command `bash gitsetup.sh` (or whatever you called your file). Enter the full path to the desired directory (e.g. `path/to/project`) when prompted. It will automatically set up the remote git repo for you. Disconnect with Ctrl+D.
3. If using [grunt-build-control](https://blog.5apps.com/2014/05/29/deploying-static-apps-with-grunt-build-control-on-5apps-deploy.html) then follow [Curtis Blackwell's instructions](http://curtisblackwell.com/blog/my-deploy-method-brings-most-of-the-boys-to-the-yard) for adding the remote URL to your Gruntfile. Else, add the new remote url to your local dev repo with `git remote add remotename username@hostname:path/to/project/.git/`.

Now you can use `git push remotename master` (or `grunt deploy`) to deploy! 

If you want to make things even easier, you can create even more shortcuts: For instance, I've created a [bash_profile alias](http://www.moncefbelyamani.com/create-aliases-in-bash-profile-to-assign-shortcuts-for-common-terminal-commands/) for the command to SSH into my staging directory, so that I don't need to remember and type the address to my server.
