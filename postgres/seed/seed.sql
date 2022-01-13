BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined ) values ('Jessie', 'jessie@gmail.com', 5 , '2018-01-01');
INSERT into login (hash, email) values ('$2a$10$uknT7i3LXILfyynlFhj67uCH8kDjL8.PKbWCIQG0hZWcBuRgVr9VS', 'jessie@gmail.com');

COMMIT;