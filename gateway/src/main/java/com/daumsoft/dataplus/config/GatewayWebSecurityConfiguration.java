// package com.daumsoft.dataplus.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
// import org.springframework.security.config.web.server.ServerHttpSecurity;
// import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
// import org.springframework.security.web.server.SecurityWebFilterChain;
// import org.springframework.security.web.server.header.XFrameOptionsServerHttpHeadersWriter.Mode;

// /**
//  * Spring Cloud Gateway 는 WebFlux 를 사용하여 비동기로 처리하므로 일반적인 WebSecurity 설정은 안된다.
//  * 반드시 WebFluxSecurity 로 사용해야한다.
//  */
// @Configuration
// @EnableWebFluxSecurity
// public class GatewayWebSecurityConfiguration {
  
//   @Bean
//   public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http, ReactiveClientRegistrationRepository clientRegistrationRepository) {
//     // Authenticate through configured keycloak SSO Provider
//     // http.oauth2Login();
//     // Also logout at the keycloak SSO Connect Provider
//     // http.logout(logout -> logout.logoutSuccessHandler(
//     //   new OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository)
//     // ));
//     // Require authentication for all requests
//     http.authorizeExchange().anyExchange().authenticated();
//     // Allow showing /home within a frame
//     http.headers().frameOptions().mode(Mode.SAMEORIGIN);
//     // Disable CSRF in the gateway to prevent conflicts with proxied server CSRF
//     http.csrf().disable();

//     return http.build();
//   }
  
// }