create table conference (
       conference_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        conference_password varchar(30),
        conference_category varchar(10),
        description varchar(140),
        is_active bit,
        is_public bit,
        owner_id bigint,
        title varchar(140),
        total integer not null,
        primary key (conference_id)
    ) engine=InnoDB;

create table deal_history (
       deal_history_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        deal_point integer not null,
        seller_member_id bigint,
        emoji_store_id bigint,
        member_id bigint,
        primary key (deal_history_id)
    ) engine=InnoDB;
    
create table emoji (
       emoji_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        creator_id bigint,
        description varchar(255),
        emoji_animate varchar(255),
        name varchar(255),
        url varchar(255),
        primary key (emoji_id)
    ) engine=InnoDB;
    
create table emoji_shop (
       emoji_store_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        emoji_price integer not null,
        emoji_id bigint,
        primary key (emoji_store_id)
    ) engine=InnoDB;
    
create table friend (
       friend_id bigint not null auto_increment,
        friend_member_id bigint,
        friend_request_id bigint,
        member_id bigint,
        primary key (friend_id)
    ) engine=InnoDB;
    
create table friend_request (
       friend_request_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        friend_request_status varchar(10),
        from_member_id bigint,
        to_member_id bigint,
        primary key (friend_request_id)
    ) engine=InnoDB;
    
 create table game (
       game_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        game_status varchar(255),
        game_name varchar(255),
        game_result bit,
        conference_id bigint,
        primary key (game_id)
    ) engine=InnoDB;
    
 create table game_history (
       game_history_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        bett_choice bit,
        bett_point integer not null,
        game_status varchar(255),
        get_point integer not null,
        game_id bigint,
        member_id bigint,
        primary key (game_history_id)
    ) engine=InnoDB;
    
create table member (
       member_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        authority varchar(10),
        member_email varchar(50) not null,
        member_status varchar(10),
        name varchar(20) not null,
        nick_name varchar(30) not null,
        password varchar(100) not null,
        point integer not null,
        profile_image varchar(255),
        primary key (member_id)
    ) engine=InnoDB;
    
 create table member_conference (
       member_conference_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        enter_status varchar(10),
        conference_id bigint,
        member_id bigint,
        primary key (member_conference_id)
    ) engine=InnoDB;
    
  create table member_emoji (
       member_emoji_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        emoji_type varchar(255),
        is_favorite bit,
        emoji_id bigint,
        member_id bigint,
        primary key (member_emoji_id)
    ) engine=InnoDB;
    
  create table point_history (
       point_history_id bigint not null auto_increment,
        created_date datetime(6),
        last_modified_date datetime(6),
        current_point integer not null,
        deal_point integer not null,
        description varchar(255),
        point_type varchar(255),
        deal_history_id bigint,
        game_history_id bigint,
        member_id bigint,
        primary key (point_history_id)
    ) engine=InnoDB;
    
insert into member (created_date, last_modified_date, authority, member_email,
                    member_status, name, nick_name, password, point, profile_image)
values ('2022-08-12 13:51:39.468000000', '2022-08-12 13:51:39.468000000', 'ROLE_ADMIN', 'admin@naver.com', 'OFFLINE', '?????????',
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
values (now(), now(), "1234", "SOCCER", "????????? ????????? ????????????", true, false, 1, "????????? vs ?????????", 4),
       (now(), now(), "1234", "SOCCER", "?????? ????????? ?????????????????????", true, false, 2, "????????? vs ??????", 3),
       (now(), now(), "1234", "BASEBALL", "?????? ??????~~~", true, false, 5, "?????? ?????????", 6),
       (now(), now(), "abcd", "BASKETBALL", "?????? ??????~~~", false, false, 1, "?????? ?????????", 0),
       (now(), now(), "1234", "BASEBALL", "KT vs ?????? ?????? ?????????~", true, false, 1, "KT vs ??????", 1),
       (now(), now(), "1234", "BASEBALL", "NC ??????????????????~~", true, false, 1, "NC vs ??????", 1),
       (now(), now(), "1234", "BASEBALL", "???????????? ????????????!", true, false, 1, "?????? vs ??????", 1),
       (now(), now(), "1234", "BASEBALL", "??? ??? ??? ??? !!!", true, false, 1, "?????? vs ??????", 1),
       (now(), now(), "1234", "BASEBALL", "?????? LG ?????????~~!!!", true, false, 1, "LG vs SSG", 1),
       (now(), now(), "1234", "BASEBALL", "????????? ??????????????????.", true, false, 1, "LG vs SSG", 1),
       (now(), now(), "1234", "BASEBALL", "?????? ?????????~~~ ?????? ?????????~~~", true, false, 1, "????????? ??????", 1),
       (now(), now(), "1234", "BASEBALL", "?????? vs ?????? ?????? ?????? ????????? ?????????~~", true, false, 1, "?????? vs ?????? ?????? ????????????@@", 1),
       (now(), now(), "1234", "SOCCER", "????????? ?????? ?????? ???????????? Come", true, false, 1, "????????? ?????? ????????? (vs ?????????)", 1),
       (now(), now(), "1234", "SOCCER", "@@@???????????? ?????? ????????????@@@", true, false, 1, "???????????? vs ????????????", 1),
       (now(), now(), "1234", "SOCCER", "????????? ??????", true, false, 1, "?????? ??????????????? vs ???????????????", 1),
       (now(), now(), "1234", "SOCCER", "?????? ?????? ??????!!!", true, false, 1, "?????? vs ????????? ??????", 1),
       (now(), now(), "1234", "SOCCER", "????????? ?????????!!!", true, false, 1, "????????? vs ?????? (????????? ?????? ??????)", 1),
       (now(), now(), "1234", "SOCCER", "????????? ?????? ?????? ??????", true, false, 1, "????????? ?????? ?????? ????????????~", 1),
       (now(), now(), "1234", "BASEBALL", "?????? ?????? ??????????????????", true, false, 1, "?????? ?????? ?????????????????? ", 1),
       (now(), now(), "1234", "SOCCER", "???~~???~~???~~???~~", true, false, 1, "???????????? vs ????????? (U20???)", 1),
       (now(), now(), "1234", "SOCCER", "???????????? ?????????!!!", true, false, 1, "U-20(???) ???????????? vs ????????? ?????? ??????~", 1),
       (now(), now(), "1234", "VOLLEYBALL", "???????????? ?????????~~", true, false, 1, "?????????????????? vs ????????????", 1),
       (now(), now(), "1234", "VOLLEYBALL", "KGC?????? ?????? ?????????~!", true, false, 1, "???????????? vs KGC????????????", 1),
       (now(), now(), "1234", "ESPORTS", "?????? ?????? ?????? ????????? ??????~~", true, false, 1, "???????????? vs KT", 1),
       (now(), now(), "1234", "BASEBALL", "@@@@??????????????? ?????? ????????????@@@@", true, false, 1, "??????????????? vs ????????????", 1),
       (now(), now(), "1234", "BASEBALL", "????????? ?????????!!!", true, false, 1, "??????????????? vs ???????????? (????????? ????????????)", 1),
       (now(), now(), "1234", "BASEBALL", "??? ??? ??? !!!", true, false, 1, "@@@????????? ?????? ????????????@@@", 1),
       (now(), now(), "1234", "SOCCER", "----????????? ?????????----", true, false, 1, "????????? vs ????????? (????????? ??????)", 1),
       (now(), now(), "1234", "SOCCER", "Super Sonny!!", true, false, 1, "Son ?????? ????????????", 1),
       (now(), now(), "1234", "SOCCER", "????????? ??? Come on", true, false, 1, "????????? vs ????????? (????????? ?????????)", 1),
       (now(), now(), "1234", "BASEBALL", "????????? ????????? ?????????~~~", true, false, 1, "NC vs KIA (?????? ?????????)", 1),
       (now(), now(), "1234", "SOCCER", "????????? ?????? ?????? ????????????", true, false, 1, "????????? vs ????????? ????????????", 1),
       (now(), now(), "1234", "BASEBALL", "SSG ?????? ??????~~", true, false, 1, "LG vs SSG (SSG ?????????)", 1),
       (now(), now(), "1234", "BASEBALL", "????????? ?????? ??????!!", true, false, 1, "KT vs ?????? (?????? ?????????)", 1);

insert into game (created_date, last_modified_date, game_name, game_result, game_status, conference_id)
values (now(), now(), "????????? 2??? ???????", null, "PROGRESS", 1),
       (now(), now(), "????????? 4??? ???????", null, "PROGRESS", 2),
       (now(), now(), "?????? ???????", null, "OVER", 3),
       (now(), now(), "????????? ????????? ?????? ???????????? ??????", null, "OVER", 4);

insert into emoji (created_date, last_modified_date, creator_id, description, emoji_animate, name, url)
values (now(), now(), 1, "???????????????1", "animate__wobble", "????????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/1.png"),
       (now(), now(), 1, "???????????????2", "animate__wobble", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/2.png"),
       (now(), now(), 1, "???????????????3", "animate__wobble", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/3.png"),
       (now(), now(), 1, "???????????????4", "animate__wobble", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/4.png"),
       (now(), now(), 1, "???????????????5", "animate__wobble", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/5.png"),
       (now(), now(), 1, "???????????????6", "animate__wobble", "?????????2", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/6.png"),
       (now(), now(), 1, "???????????????7", "animate__wobble", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/7.png"),
       (now(), now(), 1, "???????????????8", "animate__wobble", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/8.png"),
       (now(), now(), 1, "???????????????9", "animate__wobble", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/default/9.png"),
       (now(), now(), 2, "????????? ?????? ?????????~~", "animate__zoomInDown", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/74f0074a-00b2-4ed4-aafa-d03befbb977cTottenham+emo.png"),
       (now(), now(), 2, "?????? ????????? !!", "animate__slideOutUp", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EC%8F%98%EB%8B%88%ED%99%94%EC%9D%B4%ED%8C%85.jpg"),
       (now(), now(), 2, "???????????????", "animate__rubberBand", "?????? ??? ????????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/6ae35b75-a6e6-4b1e-ab4d-c6256bb7ed66Ronaldo+emo.png"),
       (now(), now(), 2, "?????? ????????? !!", "animate__rubberBand", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EC%8F%98%EB%8B%88%EC%95%84%EA%B9%9D.jpg"),
       (now(), now(), 2, "??????.. ", "animate__slideOutUp", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/12efb8d5-af40-4b85-a0cf-2e8becb5a614Kane+emo.png"),
       (now(), now(), 2, "?????? ???~~!!", "animate__lightSpeedInLeft", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/7a83bc73-4f38-44fc-aea9-b2131c5cfd47jandi.jpg"),
       (now(), now(), 3, "????????? ?????????~~ ?????????", "animate__hinge", "????????? ?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%A3%A8%EC%B9%B4%EC%BF%A01.jpg"),
       (now(), now(), 3, "?????? ????????? ???????????????", "animate__none", "????????? ??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/176f027b-e891-4520-8f9d-75b9a49c72a21nkmqb02.png"),
       (now(), now(), 3, "???????????? ??????", "animate__rubberBand", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Chelsea+emo.png"),
       (now(), now(), 3, "????????? ?????? ??????", "animate__hinge", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/manchester+utd+destruction.png"),
       (now(), now(), 3, "?????? !!", "animate__wobble", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Messi+emo.png"),
       (now(), now(), 3, "?????????~~ ?????????~~", "animate__hinge", "????????? ?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Liverpool+emo.png"),
       (now(), now(), 4, "????????? ?????? !!", "animate__wobble", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/pngwing+5.png"),
       (now(), now(), 4, "????????? ?????? ????????????", "animate__zoomIn", "????????? ???", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%89%B4%EC%BA%90%EC%8A%AC%EB%8F%88.jpg"),
       (now(), now(), 4, "Devil Son", "animate__backInUp", "Devil Son", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/7eee5598-9c63-41fb-829f-496d2dbf4d08devil_son-removebg-preview.png"),
       (now(), now(), 5, "????????? ??????????????? ??????", "animate__heartBeat", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%A6%AC%EB%B2%84%ED%92%80%EC%9C%99%EB%B0%B1.jpg"),
       (now(), now(), 5, "???????????? ????????????~~", "animate__hinge", "????????? ?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/ce2afe3a-d80e-4027-9d6e-2d78765f824dfire-arsenal-removebg-preview.png"),
       (now(), now(), 5, "????????? ??????G~~", "animate__heartBeat", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/Tottenham+emo.png"),
       (now(), now(), 5, "?????????", "animate__heartBeat", "?????????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EB%A7%A8%EC%8B%9C%ED%8B%B0.png"),
       (now(), now(), 5, "????????? ?????????~~~", "animate__flip", "??????", "https://hool-bucket.s3.ap-northeast-2.amazonaws.com/emoji/%EC%8F%98%EB%8B%88%EA%B3%A8.jpg");

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
       -- ???????????? ??? ??????
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
values (now(), now(), 100, 30, "?????? ??????", "GAME", null, 1, 1),
       (now(), now(), 200, 30, "?????? ??????", "GAME", null, 2, 2),
       (now(), now(), 1000, -100, "?????? ??????", "GAME", null, 3, 3),
       (now(), now(), 500, 30, "?????? ??????", "GAME", null, 4, 4),
       (now(), now(), 100, -30, "????????? ??????", "DEAL", 1, null, 1),
       (now(), now(), 130, 30, "????????? ??????", "DEAL", 2, null, 1),
       (now(), now(), 1000, 100, "????????? ??????", "DEAL", 3, null, 2),
       (now(), now(), 500, -30, "????????? ??????", "DEAL", 4, null, 3);
--
insert into member_conference (created_date, last_modified_date, conference_id, member_id, enter_status)
values (now(), now(), 1, 1, "ENTER"),
       (now(), now(), 1, 2, "ENTER"),
       (now(), now(), 1, 3, "ENTER"),
       (now(), now(), 1, 4, "ENTER");


