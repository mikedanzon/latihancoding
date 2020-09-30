-- show databases;

-- CREATE TABLE karyawan;

-- INSERT INTO karyawan VALUES
-- (null,'Andi Santosa',42,78,'Jakarta',2011,current_timestamp()),
-- (null,'Budi Permana',32,88,'Jakarta',2011,current_timestamp())
-- ;

-- UPDATE karyawan SET Th=2010 WHERE no=8;
-- where no(ga musti no, contoh nama juga bisa) bisa digunain di semua buat sebuah index

-- SELECT nama,usia FROM karyawan; // keluar semua nama usia yg ada di karyawan
-- SELECT nama,usia FROM karyawan limit 3; // keluar hanya 3 pertama nama usia yg ada di karyawan
-- SELECT > FROM > WHERE ... > LIMIT;karyawan
-- SELECT nama,usia,0.5*berat AS separoberat FROM karyawan LIMIT 3;
-- SELECT nama,usia,55-usia AS pensiun FROM karyawan LIMIT 3;
-- SELECT nama,usia FROM karyawan ORDER BY usia; // kalo mau dibalik dari besar ke kecil kasi DESC di belakang usia
-- SELECT nama,usia FROM karyawan ORDER BY usia DESC,nama DESC; // di cek usia dulu baru nama belakangan
-- SELECT nama,usia FROM karyawan ORDER BY field(kota,'Jakarta','Medan'); // di cek melalui kota dulu
-- SELECT nama,usia FROM karyawan WHERE usia > 30; // hanya ditampilin yang diatas 30 usianya
-- buat yang lain" bisa liat doc mysql https://dev.mysql.com/doc

SELECT * FROM toko.karyawan;

SELECT * FROM mysql.user;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'esCpGY9Fy3sy9ZmB';