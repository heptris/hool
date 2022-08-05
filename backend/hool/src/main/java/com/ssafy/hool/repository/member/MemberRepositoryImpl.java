package com.ssafy.hool.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.member.QMember;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.hool.domain.member.QMember.member;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Member> findAllCustom() {
        return queryFactory.selectFrom(member)
                .fetch();
    }
}
