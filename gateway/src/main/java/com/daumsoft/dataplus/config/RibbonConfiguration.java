package com.daumsoft.dataplus.config;

import com.netflix.loadbalancer.BestAvailableRule;
import com.netflix.loadbalancer.IPing;
import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.PingUrl;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.context.annotation.Bean;

@RibbonClient(name = "service", configuration = RibbonConfiguration.class)
public class RibbonConfiguration {
  
  @Bean
  public IRule ribbonRule() {
    return new BestAvailableRule();
  }

  @Bean
  public IPing ribbonPing() {
    return new PingUrl();
  }

}