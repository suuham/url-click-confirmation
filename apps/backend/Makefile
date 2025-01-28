.PHONY: help
help:
	@awk -F ':|##' '/^[^\t].+?:.*?##/ { printf "\033[36m%-22s\033[0m %s\n", $$1, $$NF }' $(MAKEFILE_LIST)

.PHONY: up
up: ## ローカルでコンテナを起動する
	docker compose up

.PHONY: connect-db
connect-db: ## ローカルでデータベースに接続する
	docker compose exec -it next-hono-monorepo_database psql -U postgres next-hono-monorepo_database
