package com.ssafy.hool.controller.point;

import com.ssafy.hool.dto.point_history.PointHistoryListRequestDto;
import com.ssafy.hool.dto.point_history.PointHistoryListResponseDto;
import com.ssafy.hool.dto.point_history.PointHistoryRequestDto;
import com.ssafy.hool.dto.response.ResponseDto;
import com.ssafy.hool.service.point.PointHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/point")
public class PointController {

    private final PointHistoryService pointHistoryService;

    @PostMapping
    public ResponseEntity pointList(@RequestBody PointHistoryListRequestDto pointHistoryListRequestDto){
        return new ResponseEntity<ResponseDto>(new ResponseDto<List<PointHistoryListResponseDto>>(200, "success", pointHistoryService.pointList(pointHistoryListRequestDto.getMemberId())), HttpStatus.OK);
    }
}
