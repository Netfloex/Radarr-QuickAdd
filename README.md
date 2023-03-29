<h1 align="center">
	<img src="public/logo.svg" width="128px" alt="logo">
	<br/>
	Radarr Quickadd
</h1>

This program makes downloading movies from Radarr a lot easier. You can search for a movie and it will automatically add them and search for the best release (sorts on peers and finds the first non rejected version), it will then automatically download the movie

### Features

-   Search for movies
-   Quickly download them

### Docker Compose

```yaml
version: "3"
services:
    quickadd:
        image: netfloex/quickadd
        container_name: quickadd
        environment:
            SERVER_URL: http://radarr # As accessible by this container
            API_KEY: radarrapikeyradarrapikey
            ROOT_FOLDER: /media # The root folder for media for Radarr
            QUALITY_PROFILE_ID: 4 # Quality profile id
```
