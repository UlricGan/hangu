##函谷

函谷关，雒邑西大门，扼守雒邑和长安通道的要冲

nginx config
```/etc/nginx/sites-enabled/`yourname`.jinrong.baixing.net```

```
server {
        listen   127.0.0.1:58000;
        root /home/ganhongxiang/jinrong;
        index index.php;
        charset utf-8;
        location / {
                try_files $uri $uri/ /index.php?$args;
        }
        location ~ \.php$ {
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_index index.php;
                include fastcgi_params;
        }
}

server {
        listen    80;
        server_name ganhongxiang.jinrong.baixing.net;
        location /dist/ {
                root /home/ganhongxiang/hangu/static/;
        }
        location /api/ {
                proxy_pass http://127.0.0.1:58000/api/;
        }
        location / {
                proxy_pass http://127.0.0.1:8080/;
        }
}

server {
        listen    3002;
        server_name ganhongxiang.jinrong.baixing.net;
        location / {
                proxy_pass http://127.0.0.1:3001/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
        }
}

```