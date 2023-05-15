### Getting Started

```
npm install
node server.js
# or with watch mode
node --watch server.js
```

#### For Docker

```
# Linux/Bash
docker run --rm -it -w /app -v $(pwd):/app -p 8081:8081 node --watch server.js

# CMD/Powershell
docker run --rm -it -w /app -v ${pwd}:/app -p 8081:8081 node --watch server.js

