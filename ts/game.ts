const url: URL = new URL(location.href);
const gametype: string | null = url.searchParams.get("gametype");
console.log(gametype);
