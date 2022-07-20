package com.ssafy.hool.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class MemberController {

    @PostMapping("/join")
    public void join() {
        
    }
}
