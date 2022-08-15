insert into member (created_date, last_modified_date, authority, member_email, member_status, name, nick_name, password, point)
values ('2022-08-12 13:51:39.468000000', '2022-08-12 13:51:39.468000000', 'ROLE_USER', 'aa@naver.com', 'OFFLINE', 'aa', 'aa', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       ('2022-08-12 13:51:39.468000000', '2022-08-12 13:51:39.468000000', 'ROLE_USER', 'bb@naver.com', 'OFFLINE', 'bb', 'bb', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       ('2022-08-12 13:51:39.468000000','2022-08-12 13:51:39.468000000', 'ROLE_USER', 'cc@naver.com', 'ONLINE', 'cc', 'cc', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       ('2022-08-12 13:51:39.468000000','2022-08-12 13:51:39.468000000', 'ROLE_USER', 'dd@naver.com', 'ONLINE', 'dd', 'dd', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000),
       ('2022-08-12 13:51:39.468000000','2022-08-12 13:51:39.468000000', 'ROLE_ADMIN', 'ee@naver.com', 'OFFLINE', 'ee', 'ee', '$2a$10$CeM8t1vXAQODtBKmfI7MA.CnhtBM06F3ejq2DBbDMnGUCJ/RC/KCS', 10000);

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

insert into conference (created_date, last_modified_date, conference_password, conference_category, description, is_active, is_public, owner_id, title, total)
values (now(), now(), "1234", "SOCCER", "토트넘 아스날 축구경기", true, true, 1, "토트넘 vs 아스날", 4),
       (now(), now(), "1234", "SOCCER", "맨유 맨시티 축구경기입니다", true, true, 2, "맨시티 vs 맨유", 3),
       (now(), now(), "1234", "BASEBALL", "야구 경기~~~", true, false, 5, "야구 응원방", 6),
       (now(), now(), "abcd", "BASKETBALL", "농구 경기~~~", false, false, 1, "농구 응원방", 0);
--
insert into game (created_date, last_modified_date, game_name, game_result, game_status, conference_id)
values (now(), now(), "손흥민 2골 가능?", null, "PROGRESS", 1),
       (now(), now(), "토트넘 4골 가능?", null, "PROGRESS", 2),
       (now(), now(), "맨유 승리?", null, "OVER", 3),
       (now(), now(), "전반전 끝나기 전에 우리나라 한골", null, "OVER", 4);

insert into emoji (created_date, last_modified_date, creator_id, description, emoji_animate, name, url)
values (now(), now(), 1, "아스날은 불타야쥐~~", "animate__zoomIn", "불타는 아스날", "https://picsum.photos/200/300"),
       (now(), now(), 1, "맨유는 9위가 맞지 ㅎㅎ", "animate__wobble", "맹구", "https://picsum.photos/200/300"),
       (now(), now(), 2, "토트넘 우승 가즈아~~", "animate__zoomInDown", "토황", "https://picsum.photos/200/300"),
       (now(), now(), 2, "쏘니 화이팅 !!", "animate__slideOutUp", "쏘황", "https://picsum.photos/200/300"),
       (now(), now(), 2, "쏘니 아까비 !!", "animate__rubberBand", "쏘아", "https://picsum.photos/200/300"),
       (now(), now(), 2, "쏘니 할 수 있다 !!", "animate__hinge", "쏘할", "https://picsum.photos/200/300"),
       (now(), now(), 3, "루카쿠 떠나라~~ 우우우", "animate__backInUp", "쓰레기 루카쿠", "https://picsum.photos/200/300"),
       (now(), now(), 4, "뉴캐슬 돈싸대기 !!", "animate__lightSpeedInLeft", "뉴캐슬 돈", "https://picsum.photos/200/300"),
       (now(), now(), 5, "윙백은 리버풀이지 ㅎㅎ", "animate__heartBeat", "리버풀", "https://picsum.photos/200/300"),
       (now(), now(), 5, "쏘니의 골골골~~~", "animate__flip", "쏘골", "https://picsum.photos/200/300");

insert into member_emoji (created_date, last_modified_date, emoji_type, is_favorite, emoji_id, member_id)
values (now(), now(), "DEFAULT", 0, 1, 1),
       (now(), now(), "DEFAULT", 0, 2, 1),
       (now(), now(), "DEFAULT", 0, 1, 2),
       (now(), now(), "DEFAULT", 0, 2, 2),
       (now(), now(), "DEFAULT", 0, 1, 3),
       (now(), now(), "DEFAULT", 0, 2, 3),
       (now(), now(), "DEFAULT", 0, 1, 4),
       (now(), now(), "DEFAULT", 0, 2, 4),
       (now(), now(), "DEFAULT", 0, 1, 5),
       (now(), now(), "DEFAULT", 0, 2, 5),
       (now(), now(), "MADE", 0, 3, 2),
       (now(), now(), "MADE", 0, 4, 2),
       (now(), now(), "MADE", 0, 5, 2),
       (now(), now(), "MADE", 0, 6, 2),
       (now(), now(), "MADE", 0, 7, 3),
       (now(), now(), "MADE", 0, 8, 4),
       (now(), now(), "MADE", 0, 9, 5),
       (now(), now(), "MADE", 0, 10, 5),
       -- 4번 회원이 3번 이모지를 산경우
       (now(), now(), "BUY", 0, 3, 4),
       (now(), now(), "BUY", 0, 5, 4),
       (now(), now(), "BUY", 0, 3, 5);

insert into emoji_shop (created_date, last_modified_date, emoji_price, emoji_id)
values (now(), now(), 1300, 3),
       (now(), now(), 100, 5),
       (now(), now(), 500, 7),
       (now(), now(), 900, 9);

--
insert into deal_history (created_date, last_modified_date, deal_point, seller_member_id, emoji_store_id, member_id)
values (now(), now(), 40, 1, 1, 2),
       (now(), now(), 100, 1, 2, 3),
       (now(), now(), 50, 2, 3, 1),
       (now(), now(), 60, 3, 4, 5);
--
insert into game_history (bett_choice, bett_point, created_date, last_modified_date, game_status, get_point, game_id, member_id)
values (true, 40, now(), now(), "PROGRESS", 30, 1, 1),
       (true, 50, now(), now(), "PROGRESS", 40, 1, 2),
       (false, 100, now(), now(), "PROGRESS", 0, 1, 3),
       (true, 40, now(), now(), "PROGRESS", 30, 1, 4),
       (true, 40, now(), now(), "OVER", 30, 2, 1),
       (true, 50, now(), now(), "OVER", 40, 2, 2),
       (false, 100, now(), now(), "OVER", 0, 2, 3),
       (true, 40, now(), now(), "OVER", 30, 2, 4);
--
insert into point_history (created_date, last_modified_date, current_point, deal_point, description, point_type, deal_history_id, game_history_id, member_id)
values (now(), now(), 100, 30, "게임 승리", "GAME", null, 1, 1),
       (now(), now(), 200, 30, "게임 승리", "GAME", null, 2, 2),
       (now(), now(), 1000, -100, "게임 패배", "GAME", null, 3, 3),
       (now(), now(), 500, 30, "게임 승리", "GAME", null, 4, 4),
       (now(), now(), 100, -30, "이모지 구매", "DEAL", 1, null, 1),
       (now(), now(), 130, 30, "이모지 판매", "DEAL", 2, null, 1),
       (now(), now(), 1000, 100, "이모지 판매", "DEAL", 3, null, 2),
       (now(), now(), 500, -30, "이모지 구매", "DEAL", 4, null, 3);
--
insert into member_conference (created_date, last_modified_date, conference_id, member_id, enter_status)
values (now(), now(), 1, 1, "ENTER"),
       (now(), now(), 1, 2, "ENTER"),
       (now(), now(), 1, 3, "ENTER"),
       (now(), now(), 1, 4, "ENTER");



