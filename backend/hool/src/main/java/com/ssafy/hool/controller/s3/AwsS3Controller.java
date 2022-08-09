package com.ssafy.hool.controller.s3;

import com.ssafy.hool.domain.s3.AwsS3;
import com.ssafy.hool.service.s3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class AwsS3Controller {

    private final AwsS3Service awsS3Service;

    @PostMapping("/upload")
    public AwsS3 upload(@RequestPart("file")MultipartFile multipartFile) throws IOException {
        return awsS3Service.upload(multipartFile, "emoji");
    }

    @DeleteMapping("/delete")
    public void remove(AwsS3 awsS3){
        awsS3Service.remove(awsS3);
    }
}
