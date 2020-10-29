# Radio Control

This is a little node service I wrote to live on a raspberry pi which is running `mpd` ([music player daemon](https://www.musicpd.org/)) and playing audio via an FM transmitter in my apartment.

This is just so I can hit the pi in a browser and go next/back, otherwise it shuffles and repeats forever.

- `/` shows the currently playing song
- `/next` plays the next song
- `/prev` plays the previous song

## Web Controls

This also supplies a basic one-page "Now Playing" view with next / previous controls, running on port `8080`. Customize `view.html` if you want. The `{{ARTIST}}` and `{{TITLE}}` strings in the view will be replaced by the currently playing artist and song title, respectively.
