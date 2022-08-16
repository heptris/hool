package com.ssafy.hool.service.point;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.point.PointType;
import com.ssafy.hool.domain.point.Point_history;
import com.ssafy.hool.dto.point_history.PointHistoryCreateDto;
import com.ssafy.hool.dto.point_history.PointHistoryListResponseDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.exception.ex.ErrorCode;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.MEMBER_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class PointHistoryService {

    private final PointHistoryRepository pointHistoryRepository;
    private final MemberRepository memberRepository;

    public void signUpPoint(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        PointHistoryCreateDto pointHistoryCreateDto = new PointHistoryCreateDto("회원가입 보너스 포인트", 10000, member.getPoint() + 10000, PointType.USER);
        Point_history signUpPointHistory = Point_history.createPointHistory(pointHistoryCreateDto, member, null, null);
        pointHistoryRepository.save(signUpPointHistory);
    }

    public List<PointHistoryListResponseDto> pointList(Long memberId){
        return pointHistoryRepository.findPointListDto(memberId);
    }
}

