# ================================
# Stage 1: Build
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Önce sadece package dosyalarını kopyala (cache optimizasyonu)
COPY package.json package-lock.json ./

RUN npm install

# Kaynak kodları kopyala ve build al
COPY . .

RUN npm run build

# ================================
# Stage 2: Serve (Production)
# ================================
FROM nginx:alpine

# Build çıktısını nginx'e kopyala
COPY --from=builder /app/build /usr/share/nginx/html

# (Opsiyonel) React Router için nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]