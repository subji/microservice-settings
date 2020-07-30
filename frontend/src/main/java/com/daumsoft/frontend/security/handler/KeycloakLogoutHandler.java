package com.daumsoft.frontend.security.handler;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Propagates logouts to Keycloak.
 * 
 * Necessary because Spring Security 5 (currently) doesn't support
 * end-session-endpoints.
 */
@Slf4j
@RequiredArgsConstructor
public class KeycloakLogoutHandler extends SecurityContextLogoutHandler {

  private final RestTemplate restTemplate;

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    if (authentication == null) {
      log.warn("Cannot log out without authentication");
      
      return;
    } else {
      OidcUser account = (OidcUser)authentication.getPrincipal();
      String endSessionEndpoint = account.getIssuer() + "/protocol/openid-connect/logout";

      try {
        UriComponentsBuilder builder = UriComponentsBuilder //
        .fromUriString(endSessionEndpoint) //
        .queryParam("id_token_hint", account.getIdToken().getTokenValue());

        ResponseEntity<String> logoutResponse = restTemplate.getForEntity(builder.toUriString(), String.class);

        if (logoutResponse.getStatusCode().is2xxSuccessful()) {
          log.debug("Successfulley logged out in Keycloak");
          
          response.sendRedirect("/");
        }
      } catch (IOException e) {
        log.debug("Could not propagate logout to Keycloak");
        throw new RuntimeException(e);
      }
    }

    super.logout(request, response, authentication);
  }
  
}