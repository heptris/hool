package com.ssafy.hool.service.point;

import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.dto.point_history.PointHistoryListResponseDto;
import com.ssafy.hool.dto.point_history.PointHistoryRequestDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.member.MemberRepository;
import com.ssafy.hool.repository.point.PointHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class PointHistoryService {

    private final PointHistoryRepository pointHistoryRepository;

    public List<PointHistoryListResponseDto> pointList(Long memberId){
        return pointHistoryRepository.findPointListDto(memberId);
    }
}

