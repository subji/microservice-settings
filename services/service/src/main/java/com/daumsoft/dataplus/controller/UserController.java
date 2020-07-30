package com.daumsoft.dataplus.controller;

import javax.annotation.security.RolesAllowed;

import com.daumsoft.dataplus.dto.UserInfoDTO;
import com.daumsoft.dataplus.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService)	{
		this.userService = userService;
	}

	@RolesAllowed({ "MASTER_ADMIN" })
	@GetMapping(value = "users/{userId}")
	public UserInfoDTO getUserInfo(@PathVariable String userId) throws Exception {
		UserInfoDTO userInfoDTO = new UserInfoDTO();
		userInfoDTO.setId(userId);

		return userService.getUserInfo(userInfoDTO);
	}
	
}