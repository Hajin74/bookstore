INSERT INTO User (user_id, password, username, email, phone_number, birthday)
VALUES ('john_doe', 'password123', 'John Doe', 'john@example.com', '010-1234-5678', '1990-01-01');

INSERT INTO User (user_id, password, username, email, phone_number, birthday)
VALUES ('samadasoo123', 'water123', 'samda', 'samda@gmail.com', '010-3333-3333', '1991-11-31');


INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (1, '우리집', '010-1004-5005', '서울시 강남구 역삼동', '123-456번지', 12345, 0, 1);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (2, '회사', '010-3341-6445', '경기도 성남시 분당구 ', '333-333번지', 53815, 0, 1);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (1, '여기여기', '010-1004-5005', '천안', '123-456번지', 12345, 0, 0);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (1, '저기저기기', '010-1004-5005', '천안', '123-456번지', 12345, 0, 0);
