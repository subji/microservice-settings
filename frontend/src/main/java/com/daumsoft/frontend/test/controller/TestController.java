package com.daumsoft.frontend.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class TestController {
  
  @GetMapping(value = { "/test" })
  public String viewTest()  {
    return "test";
  }

}