NAME='robhurley/tablebooker_restaurants'

build:
	docker build -t $(NAME) .

debug:
	docker run -it --rm --entrypoint=/bin/bash $(NAME)

run:
	docker run -it --rm $(NAME)

push:
	docker push $(NAME)
