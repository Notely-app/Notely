FROM oven/bun:latest
WORKDIR /app

RUN apt-get update \
    && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock* ./
RUN bun install --verbose --ignore-scripts

COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]