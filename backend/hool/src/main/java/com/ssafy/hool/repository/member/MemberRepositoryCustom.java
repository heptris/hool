package com.ssafy.hool.repository.member;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.emoji.DetailMemberEmojiDto;

import java.util.List;

public interface MemberRepositoryCustom {

    List<Member> findAllCustom();

}
