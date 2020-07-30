package com.daumsoft.dataplus.service;

import com.daumsoft.dataplus.dto.UserInfoDTO;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserService {

  @Autowired
  RestTemplate restTemplate;

  @HystrixCommand(commandKey = "userInfo", fallbackMethod = "getUserInfoFallBack", commandProperties = {
    @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
  })
  public UserInfoDTO getUserInfo(UserInfoDTO userInfoDTO) throws InterruptedException {
    userInfoDTO.setPhone("010-1111-1111");
    userInfoDTO.setId(userInfoDTO.getId());
    
    return userInfoDTO;
  }

  // 리턴 타입, 파라미터를 같게 해야한다.
  private UserInfoDTO getUserInfoFallBack (UserInfoDTO userInfoDTO, Throwable t) {
    t.printStackTrace();
    
	  userInfoDTO.setId("fallback");
	  userInfoDTO.setPhone("fallback");
	  return userInfoDTO;
  }

}