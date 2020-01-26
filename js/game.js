"use strict";
var url = new URL(location.href);
var gametype = url.searchParams.get("gametype");
console.log(gametype);
