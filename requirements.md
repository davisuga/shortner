[x] We must be able to put a URL into the home page and get back a URL of the shortest possible
length.
[x] We must be redirected to the full URL when we enter the short URL (ex: http://localhost:3000/a =>
https://google.com)
[x] There should be a page that shows the top 100 most frequently accessed URLs.
• There must be a background job (separate thread) that crawls the URL being shortened, pulls the

<title> from the website and stores it.
• Display the title with the URL on the top 100 board.
• There must be a README that explains how to setup the application and the algorithm used for
generating the URL short code.

POST /shorten
{
"url": "https://google.com"
}

{
"shorten": "83jeehb"
}

GET /[shorten]
redirect to the full url

<!-- Increment times accessed -->

GET /top
[
{
"url": "https://google.com",
"title": "Google"
},
{
"url": "https://google.com",
"title": "Google"
}
]
