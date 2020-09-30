USE marketdino;

SELECT u.*
FROM users u
LEFT JOIN penjual p
ON p.userid = u.id
WHERE p.id IS NULL;

SELECT * FROM users WHERE id NOT IN (SELECT userid FROM penjual); -- sama kek diatas

