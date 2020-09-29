USE sakila;

SELECT * FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id; -- a = alias dari actor , begitu juga fa alias dari film_actor
SELECT * FROM actor JOIN film_actor ON actor.actor_id = film_actor.actor_id; -- tanpa alias

SELECT count(*) FROM actor a 
JOIN film_actor fa ON a.actor_id = fa.actor_id 
WHERE a.first_name='PENELOPE' 
AND a.last_name='GUINESS';

SELECT * FROM actor a 
JOIN film_actor fa 
ON a.actor_id = fa.actor_id 
JOIN film f
ON fa.film_id = f.film_id
WHERE a.first_name='PENELOPE' 
AND a.last_name='GUINESS';

SELECT f.title,f.release_year FROM actor a 
JOIN film_actor fa 
ON a.actor_id = fa.actor_id 
JOIN film f
ON fa.film_id = f.film_id
WHERE a.first_name='PENELOPE' 
AND a.last_name='GUINESS';

SELECT f.title, a.first_name, a.last_name 
FROM actor a
JOIN film_actor fa
ON fa.actor_id = a.actor_id
JOIN film f
ON f.film_id = fa.film_id
WHERE f.title = 'ACADEMY DINOSAUR';

SELECT f.film_id, f.title, c.category_id, c.name
FROM film f
JOIN film_category fc
ON f.film_id = fc.film_id
JOIN category c
ON fc.category_id = c.category_id
WHERE c.name = 'animation';

SELECT count(*) AS jumlah_film, c.name
FROM film_category fc
JOIN category c
ON c.category_id = fc.category_id
GROUP BY c.name -- ini group by buat pecahin per category
ORDER BY jumlah_film;

SELECT a.first_name, a.last_name, count(*) as jumlah_film, GROUP_CONCAT(title) as films
FROM actor a
JOIN film_actor fa
ON a.actor_id = fa.actor_id
JOIN film f
ON f.film_id = fa.film_id
GROUP BY fa.actor_id
ORDER BY jumlah_film DESC
LIMIT 5;












