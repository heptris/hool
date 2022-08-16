insert into member (created_date, last_modified_date, authority, member_email,
                    member_status, name, nick_name, password, point, profile_image)
values ('2022-08-12 13:51:39.468000000', '2022-08-12 13:51:39.468000000', 'ROLE_ADMIN', 'admin@naver.com', 'OFFLINE', '관리자',
        'admin', '$2a$10$Wo6GV5hJWVP27cnBnwvMH.67Oqx0BSgwX.7y4wupfwdoQ40Ive49S',
        10000, "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/member/default/1.jpg"),
       ('2022-08-12 13:51:39.468000000', '2022-08-12 13:51:39.468000000', 'ROLE_USER', 'bb@naver.com', 'OFFLINE', 'bbb',
        'bbb', '$2a$10$Wo6GV5hJWVP27cnBnwvMH.67Oqx0BSgwX.7y4wupfwdoQ40Ive49S',
        10000, "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/member/default/2.jpg"),
       ('2022-08-12 13:51:39.468000000','2022-08-12 13:51:39.468000000', 'ROLE_USER', 'cc@naver.com', 'OFFLINE', 'ccc', 'ccc',
        '$2a$10$Wo6GV5hJWVP27cnBnwvMH.67Oqx0BSgwX.7y4wupfwdoQ40Ive49S',
        10000, "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/member/default/3.jpg"),
       ('2022-08-12 13:51:39.468000000','2022-08-12 13:51:39.468000000', 'ROLE_USER', 'dd@naver.com', 'OFFLINE', 'ddd', 'ddd',
        '$2a$10$Wo6GV5hJWVP27cnBnwvMH.67Oqx0BSgwX.7y4wupfwdoQ40Ive49S',
        10000, "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/member/default/4.jpg"),
       ('2022-08-12 13:51:39.468000000','2022-08-12 13:51:39.468000000', 'ROLE_USER', 'ee@naver.com', 'OFFLINE', 'eee', 'eee',
        '$2a$10$Wo6GV5hJWVP27cnBnwvMH.67Oqx0BSgwX.7y4wupfwdoQ40Ive49S',
        10000, "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/member/default/5.jpg");

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
values (now(), now(), null, "SOCCER", "토트넘 아스날 축구경기", true, true, 1, "토트넘 vs 아스날", 4),
       (now(), now(), null, "SOCCER", "맨유 맨시티 축구경기입니다", true, true, 2, "맨시티 vs 맨유", 3),
       (now(), now(), "1234", "BASEBALL", "야구 경기~~~", true, false, 5, "야구 응원방", 6),
       (now(), now(), "abcd", "BASKETBALL", "농구 경기~~~", false, false, 1, "농구 응원방", 0);

insert into game (created_date, last_modified_date, game_name, game_result, game_status, conference_id)
values (now(), now(), "손흥민 2골 가능?", null, "PROGRESS", 1),
       (now(), now(), "토트넘 4골 가능?", null, "PROGRESS", 2),
       (now(), now(), "맨유 승리?", null, "OVER", 3),
       (now(), now(), "전반전 끝나기 전에 우리나라 한골", null, "OVER", 4);

insert into emoji (created_date, last_modified_date, creator_id, description, emoji_animate, name, url)
values (now(), now(), 1, "기본이미지1", "animate__wobble", "함박웃음", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/1.png"),
       (now(), now(), 1, "기본이미지2", "animate__wobble", "화남", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/2.png"),
       (now(), now(), 1, "기본이미지3", "animate__wobble", "놀람", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/3.png"),
       (now(), now(), 1, "기본이미지4", "animate__wobble", "못마땅", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/4.png"),
       (now(), now(), 1, "기본이미지5", "animate__wobble", "엄지척", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/5.png"),
       (now(), now(), 1, "기본이미지6", "animate__wobble", "엄지척2", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/6.png"),
       (now(), now(), 1, "기본이미지7", "animate__wobble", "하트", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/7.png"),
       (now(), now(), 1, "기본이미지8", "animate__wobble", "비웃음", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/8.png"),
       (now(), now(), 1, "기본이미지9", "animate__wobble", "파티", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/9.png"),
       (now(), now(), 2, "토트넘 우승 가즈아~~", "animate__zoomInDown", "토황", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/74f0074a-00b2-4ed4-aafa-d03befbb977cTottenham+emo.png"),
       (now(), now(), 2, "쏘니 화이팅 !!", "animate__slideOutUp", "쏘황", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EC%8F%98%EB%8B%88%ED%99%94%EC%9D%B4%ED%8C%85.jpg"),
       (now(), now(), 2, "응애애애애", "animate__rubberBand", "응애 나 애기날두", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/6ae35b75-a6e6-4b1e-ab4d-c6256bb7ed66Ronaldo+emo.png"),
       (now(), now(), 2, "쏘니 아까비 !!", "animate__rubberBand", "쏘아", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EC%8F%98%EB%8B%88%EC%95%84%EA%B9%9D.jpg"),
       (now(), now(), 2, "케황.. ", "animate__slideOutUp", "케황", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/12efb8d5-af40-4b85-a0cf-2e8becb5a614Kane+emo.png"),
       (now(), now(), 2, "쏘니 골~~!!", "animate__lightSpeedInLeft", "쏘또골", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/7a83bc73-4f38-44fc-aea9-b2131c5cfd47jandi.jpg"),
       (now(), now(), 3, "루카쿠 떠나라~~ 우우우", "animate__hinge", "쓰레기 루카쿠", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%A3%A8%EC%B9%B4%EC%BF%A01.jpg"),
       (now(), now(), 3, "저는 말하는 감자입니다", "animate__none", "말하는 감자", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/176f027b-e891-4520-8f9d-75b9a49c72a21nkmqb02.png"),
       (now(), now(), 3, "파란불의 첼시", "animate__rubberBand", "첼시", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Chelsea+emo.png"),
       (now(), now(), 3, "불타는 맨유 ㅎㅎ", "animate__hinge", "맹구", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/manchester+utd+destruction.png"),
       (now(), now(), 3, "갓시 !!", "animate__wobble", "메시", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Messi+emo.png"),
       (now(), now(), 3, "리중딱~~ 리중딱~~", "animate__hinge", "불타는 리버풀", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Liverpool+emo.png"),
       (now(), now(), 4, "득점왕 살라 !!", "animate__wobble", "살라", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/pngwing+5.png"),
       (now(), now(), 4, "뉴캐슬 돈이 남아돈다", "animate__zoomIn", "뉴캐슬 돈", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%89%B4%EC%BA%90%EC%8A%AC%EB%8F%88.jpg"),
       (now(), now(), 4, "Devil Son", "animate__backInUp", "Devil Son", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/7eee5598-9c63-41fb-829f-496d2dbf4d08devil_son-removebg-preview.png"),
       (now(), now(), 5, "윙백은 리버풀이지 ㅎㅎ", "animate__heartBeat", "리버풀", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%A6%AC%EB%B2%84%ED%92%80%EC%9C%99%EB%B0%B1.jpg"),
       (now(), now(), 5, "아스날은 불타야쥐~~", "animate__hinge", "불타는 아스날", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/ce2afe3a-d80e-4027-9d6e-2d78765f824dfire-arsenal-removebg-preview.png"),
       (now(), now(), 5, "토트넘 가야G~~", "animate__heartBeat", "토트넘", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Tottenham+emo.png"),
       (now(), now(), 5, "맨시티", "animate__heartBeat", "맨시티", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%A7%A8%EC%8B%9C%ED%8B%B0.png"),
       (now(), now(), 5, "쏘니의 골골골~~~", "animate__flip", "쏘골", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EC%8F%98%EB%8B%88%EA%B3%A8.jpg");

insert into member_emoji (created_date, last_modified_date, emoji_type, is_favorite, emoji_id, member_id)
values (now(), now(), "DEFAULT", 0, 1, 1),
       (now(), now(), "DEFAULT", 0, 2, 1),
       (now(), now(), "DEFAULT", 0, 3, 1),
       (now(), now(), "DEFAULT", 0, 4, 1),
       (now(), now(), "DEFAULT", 0, 5, 1),
       (now(), now(), "DEFAULT", 0, 6, 1),
       (now(), now(), "DEFAULT", 0, 7, 1),
       (now(), now(), "DEFAULT", 0, 8, 1),
       (now(), now(), "DEFAULT", 0, 9, 1),
       (now(), now(), "DEFAULT", 0, 1, 2),
       (now(), now(), "DEFAULT", 0, 2, 2),
       (now(), now(), "DEFAULT", 0, 3, 2),
       (now(), now(), "DEFAULT", 0, 4, 2),
       (now(), now(), "DEFAULT", 0, 5, 2),
       (now(), now(), "DEFAULT", 0, 6, 2),
       (now(), now(), "DEFAULT", 0, 7, 2),
       (now(), now(), "DEFAULT", 0, 8, 2),
       (now(), now(), "DEFAULT", 0, 9, 2),
       (now(), now(), "DEFAULT", 0, 1, 3),
       (now(), now(), "DEFAULT", 0, 2, 3),
       (now(), now(), "DEFAULT", 0, 3, 3),
       (now(), now(), "DEFAULT", 0, 4, 3),
       (now(), now(), "DEFAULT", 0, 5, 3),
       (now(), now(), "DEFAULT", 0, 6, 3),
       (now(), now(), "DEFAULT", 0, 7, 3),
       (now(), now(), "DEFAULT", 0, 8, 3),
       (now(), now(), "DEFAULT", 0, 9, 3),
       (now(), now(), "DEFAULT", 0, 1, 4),
       (now(), now(), "DEFAULT", 0, 2, 4),
       (now(), now(), "DEFAULT", 0, 3, 4),
       (now(), now(), "DEFAULT", 0, 4, 4),
       (now(), now(), "DEFAULT", 0, 5, 4),
       (now(), now(), "DEFAULT", 0, 6, 4),
       (now(), now(), "DEFAULT", 0, 7, 4),
       (now(), now(), "DEFAULT", 0, 8, 4),
       (now(), now(), "DEFAULT", 0, 9, 4),
       (now(), now(), "DEFAULT", 0, 1, 5),
       (now(), now(), "DEFAULT", 0, 2, 5),
       (now(), now(), "DEFAULT", 0, 3, 5),
       (now(), now(), "DEFAULT", 0, 4, 5),
       (now(), now(), "DEFAULT", 0, 5, 5),
       (now(), now(), "DEFAULT", 0, 6, 5),
       (now(), now(), "DEFAULT", 0, 7, 5),
       (now(), now(), "DEFAULT", 0, 8, 5),
       (now(), now(), "DEFAULT", 0, 9, 5),
       (now(), now(), "MADE", 0, 10, 2),
       (now(), now(), "MADE", 0, 11, 2),
       (now(), now(), "MADE", 0, 12, 2),
       (now(), now(), "MADE", 0, 13, 2),
       (now(), now(), "MADE", 0, 14, 2),
       (now(), now(), "MADE", 0, 15, 2),
       (now(), now(), "MADE", 0, 16, 3),
       (now(), now(), "MADE", 0, 17, 3),
       (now(), now(), "MADE", 0, 18, 3),
       (now(), now(), "MADE", 0, 19, 3),
       (now(), now(), "MADE", 0, 20, 3),
       (now(), now(), "MADE", 0, 21, 3),
       (now(), now(), "MADE", 0, 22, 4),
       (now(), now(), "MADE", 0, 23, 4),
       (now(), now(), "MADE", 0, 24, 4),
       (now(), now(), "MADE", 0, 25, 5),
       (now(), now(), "MADE", 0, 26, 5),
       (now(), now(), "MADE", 0, 27, 5),
       (now(), now(), "MADE", 0, 28, 5),
       (now(), now(), "MADE", 0, 29, 5),
       -- 이모지를 산 경우
       (now(), now(), "BUY", 0, 23, 2),
       (now(), now(), "BUY", 0, 11, 3),
       (now(), now(), "BUY", 0, 29, 2),
       (now(), now(), "BUY", 0, 15, 5);

insert into emoji_shop (created_date, last_modified_date, emoji_price, emoji_id)
values (now(), now(), 1300, 10),
       (now(), now(), 100, 11),
       (now(), now(), 500, 13),
       (now(), now(), 600, 15),
       (now(), now(), 2000, 16),
       (now(), now(), 300, 17),
       (now(), now(), 200, 19),
       (now(), now(), 450, 20),
       (now(), now(), 550, 22),
       (now(), now(), 550, 23),
       (now(), now(), 130, 26),
       (now(), now(), 700, 27),
       (now(), now(), 900, 29);

--
insert into deal_history (created_date, last_modified_date, deal_point, seller_member_id, emoji_store_id, member_id)
values (now(), now(), 550, 4, 10, 2),
       (now(), now(), 100, 2, 2, 3),
       (now(), now(), 900, 5, 13, 2),
       (now(), now(), 600, 2, 4, 5);
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



