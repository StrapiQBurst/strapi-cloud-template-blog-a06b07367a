include .env

up:
	docker compose up -d
build-n-up:
	docker compose up -d --build
down:
	docker compose down
down-n-remove-data:
	docker compose down -v 
log:
	docker compose logs -f strapi
transfer:
	yarn strapi transfer --from ${REMOTE_STRAPI_URL} --from-token ${REMOTE_FROM_TOKEN}