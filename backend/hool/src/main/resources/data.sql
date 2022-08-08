insert into member (created_date, last_modified_date, authority, member_email, member_status, name, nick_name, password, point)
values (now(), now(), 'ROLE_USER', 'aa@naver.com', 'OFFLINE', 'aa', 'aa', '1234', 10000),
       (now(), now(), 'ROLE_USER', 'bb@naver.com', 'OFFLINE', 'bb', 'bb', '1234', 10000),
       (now(), now(), 'ROLE_USER', 'cc@naver.com', 'OFFLINE', 'cc', 'cc', '1234', 10000),
       (now(), now(), 'ROLE_USER', 'dd@naver.com', 'OFFLINE', 'dd', 'dd', '1234', 10000),
       (now(), now(), 'ROLE_ADMIN', 'ee@naver.com', 'OFFLINE', 'ee', 'ee', '1234', 10000);

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

insert into conference (created_date, last_modified_date, conference_category, description, is_active, owner_id, title, total)
values (now(), now(), "SOCCER", "토트넘 아스날 축구경기", true, 1, "토트넘 vs 아스날", 4),
       (now(), now(), "SOCCER", "맨유 맨시티 축구경기입니다", true, 2, "맨시티 vs 맨유", 3),
       (now(), now(), "BASEBALL", "야구 경기~~~", true, 5, "야구 응원방", 6),
       (now(), now(), "BASKETBALL", "농구 경기~~~", false, 1, "농구 응원방", 0);
--
insert into game (created_date, last_modified_date, game_name, game_result, game_status, conference_id)
values (now(), now(), "손흥민 2골 가능?", null, "PROGRESS", 1),
       (now(), now(), "토트넘 4골 가능?", null, "PROGRESS", 2),
       (now(), now(), "맨유 승리?", null, "OVER", 3),
       (now(), now(), "전반전 끝나기 전에 우리나라 한골", null, "OVER", 4);
--
-- insert into deal_history (created_date, last_modified_date, deal_point, seller_member_id, emoji_store_id, member_id)
-- values (now(), now(), 40, 1, 1, 2),
--        (now(), now(), 100, 1, 2, 3),
--        (now(), now(), 50, 2, 3, 1),
--        (now(), now(), 60, 3, 4, 5);
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
-- insert into point_history (created_date, last_modified_date, current_point, deal_point, description, point_type, deal_history_id, game_history_id, member_id)
-- values (now(), now(), 100, 30, "게임 승리", "GAME", null, 1, 1),
--        (now(), now(), 200, 30, "게임 승리", "GAME", null, 2, 2),
--        (now(), now(), 1000, -100, "게임 패배", "GAME", null, 3, 3),
--        (now(), now(), 500, 30, "게임 승리", "GAME", null, 4, 4),
--        (now(), now(), 100, -30, "이모지 구매", "DEAL", 1, null, 1),
--        (now(), now(), 130, 30, "이모지 판매", "DEAL", 2, null, 1),
--        (now(), now(), 1000, 100, "이모지 판매", "DEAL", 3, null, 2),
--        (now(), now(), 500, -30, "이모지 구매", "DEAL", 4, null, 3);
--
insert into member_conference (created_date, last_modified_date, conference_id, member_id)
values (now(), now(), 1, 1),
       (now(), now(), 1, 2),
       (now(), now(), 1, 3),
       (now(), now(), 1, 4);



