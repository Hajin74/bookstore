use book_store;

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


INSERT INTO Book (title, sub_title, price, stock, page, size, publish_date, thumbnail_url, publisher, contents, created, updated, sub_category_id)
VALUES ('객체지향의 사실과 오해', '개발자와 개발팀이 함께 읽는 객체지향 도서', 25000, 100, 360, 'B5', 20220115, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998139766.jpg', '인사이트', '객체지향에 대한 오해를 해소하고 실무에서 적용하는 방법을 다룸', '2022-03-05 10:00:00', '2022-03-05 10:00:00', 1);

INSERT INTO Book (title, sub_title, price, stock, page, size, publish_date, thumbnail_url, publisher, contents, created, updated, sub_category_id)
VALUES ('Clean Code', '프로그래머를 위한 클린 코드', 30000, 80, 464, 'B5', 20200125, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966260959.jpg', '인사이트', '깨끗한 코드를 작성하는 방법과 관련된 원칙과 패턴을 설명함', '2022-03-05 10:00:00', '2022-03-05 10:00:00', 1);

INSERT INTO Book (title, sub_title, price, stock, page, size, publish_date, thumbnail_url, publisher, contents, created, updated, sub_category_id)
VALUES ('남아 있는 나날', '감성에세이', 18000, 120, 240, 'A5', 20211210, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788937463884.jpg', '문학동네', '소소한 일상에서 살아가는 행복의 순간을 담은 에세이', '2022-03-05 10:00:00', '2022-03-05 10:00:00', 2);

INSERT INTO Book (title, sub_title, price, stock, page, size, publish_date, thumbnail_url, publisher, contents, created, updated, sub_category_id)
VALUES ('속임수의 섬', '미스터리 소설', 18000 , 100, 480, 'A5', 20211210, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791170610984.jpg', '북다', '이 책이야말로 히가시가와 도쿠야 월드의 집대성이다.', '2022-03-05 10:00:00', '2022-03-05 10:00:00', 2);

INSERT INTO Book (title, sub_title, price, stock, page, size, publish_date, thumbnail_url, publisher, contents, created, updated, sub_category_id)
VALUES ('일본 현지 간식 대백과', '진짜 일본 간식 총집합', 18000 , 100, 480, 'A5', 20211210, 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512693.jpg', '클', '일본 추억의 대백과', '2022-03-05 10:00:00', '2022-03-05 10:00:00', 2);
