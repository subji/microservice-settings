package com.daumsoft.frontend.main.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MainController {

	@GetMapping(value = { "/" })
	public String viewMain() {
		return "main";
	}

}
