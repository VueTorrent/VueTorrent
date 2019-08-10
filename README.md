
# VueTorrent

  

A modern looking WEBUI for qBittorrent made with Vuejs & express!

(support for more clients coming in the future)

> Vue, Node, Express, qBitorrent

## Screenshots

<p  align="center">

<a  href="https://i.imgur.com/vPBcrK4.png"><img  src="https://i.imgur.com/vPBcrK4.png"  title="Desktop"  alt="Desktop Screenshot" ></a>

</p>

<p  align="center">

<a  href="https://i.imgur.com/SUOEyy9.png"><img  src="https://i.imgur.com/SUOEyy9.png"  title="Mobile"  alt="Mobile Screenshot"  width="320"  height="540"></a>

</p>

  

## Installation
Easiest way is with docker-compose:
``` 
	vuetorrent:
		image: wdaan/vuetorrent
	    container_name: vuetorrent
	    restart: always
	    ports:
	      - "4000:4000"
	    environment:
	      - VUE_APP_DOMAIN=http://172.18.0.4:4000
	      - VUE_APP_WEB_USER=vuetr
	      - VUE_APP_WEB_PASS=vuetr
	      - QBIT_USER=qbit
	      - QBIT_PASS=qbit
	      - QBIT_HOST=http://10.0.0.8:8080
	      - PORT=4000 
 ``` 

## Development

 FRONTEND : Git clone & npm run serve!

SERVER : npm run build & npm run start!


## Features

- viewing sessions stats ( down / upload speed, session uploaded / downloaded )

- adding / removing / pausing / resuming torrents

- sorting by every property shown!

- mobile friendly! (maybe not for thousands of torrents...)

  

## Contributing

  

I'll gladly accept help/pull requests & advice! (this is my first project of this nature, pls be kind 😛 ).

  

## FAQ

  

-  **Why build this??**

- Why not? Most WebUI's look very dated and now it's no longer necessary to search for a remote control app!

  

## Support

  

Reach out to me at one of the following places!

  

-  <a  href="https://m.me/WijnsDaan"  target="_blank">`Facebook Messenger`</a>

- Open up an issue 😛

  

## Credits

  

Dashboard design heavily inspired by: 'https://github.com/iamshaunjp/vuetify-playlist'

Also check out The Net Ninja's Youtube Channel.

  

---

  

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)