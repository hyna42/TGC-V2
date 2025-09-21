start :
	docker-compose -f docker-compose.yml up --build

stop : 
	docker-compose down

clean :
	docker-compose down -v --rmi all
