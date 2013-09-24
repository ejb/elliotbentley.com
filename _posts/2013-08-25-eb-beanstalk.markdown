---
layout: post
title:  "How to set up a cronjob on Amazon Elastic Beanstalk"
date:   2013-08-25 11:27:13
categories: jekyll update
---

It took me weeks to understand the arcane rituals needed to schedule a cronjob on Elastic Beanstalk. This guide explains how to set a cron schedule automatically when an app is deployed.

The scripts below have been cobbled together from AWS' official documentation, variou Stack Overflow answers and the [Hudku blog](http://www.hudku.com/blog/innocuous-looking-evil-devil/#elastic-beanstalk.config).

1. Create a file called `cron_setup.sh` in the top level directory of your project. 
2. Paste the following into `cron_setup.sh`:

        #read cron command into temporary file
        echo "* * * * * cd /var/app/current && ruby send_email.rb" > /tmp/mycron

        #install new cron file
        crontab /tmp/mycron

        #delete unwanted mycron file
        rm /tmp/mycron

    This script reads your cron instructions into a new file, then reads it into cron, and then deletes the file. Note that you'll need to modify the [cron instructions](http://www.nncron.ru/help/EN/working/cron-format.htm) between the quote marks to carry out whatever function needs doing.

3. Make a directory called `.ebextensions` (the period is important) in the top directory of your project.
4. Create a file in `.ebextensions` with the name `example.config` (it can any name, as long as it ends with `.config`).
5. Copy and paste the following code into `example.config`:
 
        # Installing dos2unix in case files are edited on windows PC
            packages:
                    yum:
                    dos2unix: []

            container_commands:
                01-command:
                    command:        dos2unix -k cron_setup.sh
    
                02-command:
                    command:        chmod 700 cron_setup.sh
    
                03-command:
                    command:        bash cron_setup.sh
                    # leader_only prevents problems when EB auto-scales
                    leader_only:    true
         
       
And that's it! <a href="http://twitter.com/elliot_bentley">Tweet at me</a> if you have any problems and I'll try to help.
