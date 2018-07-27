# Bike for Brussels Route Planner

Popular routeplanner apps often do not consider bike-friendly routes and therefore are not optimal to use when cycling in the city. We are building a routeplanning app for bikers in Brussels that considers cycling infrastructure, road quality and other criteria to provide the best route to get to where you want to go.

## Installation Instructions

This web application is a static website, so installation is not required. Simply serving the files over the network will work. To achieve this in our environment Nginx was run on an Ubuntu server.
Our configuration file for Nginx (located in /etc/nginx/sites-available) looks like this:

```
# Server configuration
#
server {

        # SSL configuration (this is generated by certbot)
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;

        root /var/www/bike4brussels;

        index index.html index.htm index.nginx-debian.html;

        server_name bike4brussels.osm.be;
		
		# Serving the static pages from disk
        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                root /var/www/bike4brussels;
                try_files $uri $uri/ =404;
        }

		# We run the bike4brussels-backend on the same server. 
		# Since it's a dotnet application, requests will have to be proxied to the port the application is
		# listening to.
        location /api/ {
                proxy_pass http://localhost:5000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection keep-alive;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_cache_bypass $http_upgrade;
                add_header X-Cache-Status $upstream_cache_status;
        }

		# Deploying a second version of the backend for test purposes is also possible. Just change the port.
        location /test-api/ {
                proxy_pass http://localhost:5001/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection keep-alive;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_cache_bypass $http_upgrade;
                add_header X-Cache-Status $upstream_cache_status;
        }


        # Redirect server error pages to the static page /50x.html
        error_page      500 502 503 504  /50x.html;
        location = /50x.html {
                root    /usr/share/nginx/html;
        }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/bike4brussels.osm.be/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/bike4brussels.osm.be/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

# https redirection (generated by certbot)
server {
    if ($host = bike4brussels.osm.be) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 default_server;
        listen [::]:80 default_server;

        server_name bike4brussels.osm.be;
    return 404; # managed by Certbot


}
```
