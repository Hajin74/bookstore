INSERT INTO User (username, password, name, email, mobile_number, birthday, is_deleted)
VALUES ('john_doe', 'password123', 'John Doe', 'john@example.com', '010-1234-5678', '1990-01-01', 0);

INSERT INTO User (username, password, name, email, mobile_number, birthday, is_deleted)
VALUES ('alice_smith', 'password456', 'Alice Smith', 'alice@example.com', '010-9876-5432', '1995-05-15', 0);

INSERT INTO User (username, password, name, email, mobile_number, birthday, is_deleted)
VALUES ('김철수', 'securepwd123', '김철수', 'chulsoo@example.com', '010-9876-5432', '1985-03-25', 0);


INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (1, '우리집', '010-1004-5005', '서울시 강남구 역삼동', '123-456번지', 12345, 0, 1);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (1, '회사', '02-333-4444', '서울특별시 서초구', '789-101번지', '54321', 0, 0);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (1, '이사간 주소', '010-5678-9012', '대전광역시 서구 계룡로 890번길', '빌라 404호', '45678', 0, 0);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (2, '집', '010-1111-2222', '서울시 종로구 인사동', '789-123번지', 54321, 0, 1);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (2, '친구 집', '010-5555-6666', '경기도 수원시', '111-222번지', '67890', 0, 0);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (3, '부모님 집', '010-7777-8888', '인천광역시 남구', '333-444번지', '98765', 0, 0);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (3, '휴가지', '010-9999-0000', '제주특별자치도 제주시', '555-666번지', '54321', 0, 0);

INSERT INTO Address (user_id, address_name, phone_number, main_address, sub_address, zip_code, is_deleted, is_default)
VALUES (3, '여행지 주소', '010-2345-6789', '부산광역시 해운대구 해운대해변로 123번길', '리조트 303호', '54321', 0, 0);


INSERT INTO Book (title)
VALUES ('귀신들의 땅');

INSERT INTO Book (title)
VALUES ('남아 있는 나날');

INSERT INTO Book (title)
VALUES ('모던 자바 인 액션');

INSERT INTO Book (title)
VALUES ('객체지향의 사실과 오해');

INSERT INTO Book (title)
VALUES ('불안의 서');