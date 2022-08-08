insert into member (created_date, last_modified_date, authority, member_email, member_status, name, nick_name, password, point)
values (now(), now(), 'ROLE_USER', 'aa@naver.com', 'OFFLINE', 'aa', 'aa', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       (now(), now(), 'ROLE_USER', 'bb@naver.com', 'OFFLINE', 'bb', 'bb', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       (now(), now(), 'ROLE_USER', 'cc@naver.com', 'OFFLINE', 'cc', 'cc', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       (now(), now(), 'ROLE_USER', 'dd@naver.com', 'OFFLINE', 'dd', 'dd', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       (now(), now(), 'ROLE_ADMIN', 'ee@naver.com', 'OFFLINE', 'ee', 'ee', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000);

insert into friend_request (created_date, last_modified_date, friend_request_status, from_member_id, to_member_id)
values (now(), now(), 'PROCESS', 1, 2),
       (now(), now(), 'PROCESS', 1, 3),
       (now(), now(), 'ACCEPT', 2, 3),
       (now(), now(), 'ACCEPT', 2, 4);

insert into friend (friend_member_id, friend_request_id, member_id)
values (2, 3, 3),
       (3, 3, 2),
       (2, 4, 4),
       (4, 4, 2);
