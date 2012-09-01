nvconvert
=========

Convert video from command line with node

In order to be able to use this module, make sure you have ffmpeg installed on your system (including all necessary encoding libraries like libmp3lame or libx264).

Example crontab execution:

	5 12 * * * /usr/local/bin/node /home/aykut/GitHub/nvconvert/bin/nvconvert --from.dir=/home/aykut/tmp --to.dir=/tmp --from.type='video/x-f4v' --to.type='video/x-flv' > /tmp/nvconvert.output