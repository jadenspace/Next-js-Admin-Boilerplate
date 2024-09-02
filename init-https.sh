#!/bin/bash

# 환경 변수를 로드합니다.
source .env.localhost.target
# 'https://' 부분을 제거합니다.
NEXT_PUBLIC_HOST_URL="${NEXT_PUBLIC_HOST_URL//https:\/\//}"

MKCERT_INSTALLED=$(which mkcert)

if [ -z $MKCERT_INSTALLED ];then
    brew install mkcert
fi

mkcert -install
mkcert -key-file local-key.pem -cert-file local-cert.pem localhost $NEXT_PUBLIC_HOST_URL 127.0.0.1 ::1