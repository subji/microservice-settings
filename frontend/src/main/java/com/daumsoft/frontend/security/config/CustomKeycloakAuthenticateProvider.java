package com.daumsoft.frontend.security.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.keycloak.adapters.springsecurity.account.KeycloakRole;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class CustomKeycloakAuthenticateProvider implements AuthenticationProvider {
  
  private GrantedAuthoritiesMapper grantedAuthoritiesMapper;

  public void setGrantedAuthoritiesMapper(GrantedAuthoritiesMapper grantedAuthoritiesMapper) {
    this.grantedAuthoritiesMapper = grantedAuthoritiesMapper;
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) authentication;
    List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

    // Save AccessToken string at session attribute
    ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession().setAttribute("jwt", 
      token.getAccount().getKeycloakSecurityContext().getTokenString()
    );

    Set<String> roles = token.getAccount().getRoles();

    if (roles != null)  {
      grantedAuthorities.addAll(
        roles.stream().map(
          role -> new KeycloakRole(role)
        ).collect(Collectors.toList())
      );
    }

    Map<String, AccessToken.Access> resourceAccess = token.getAccount().getKeycloakSecurityContext().getToken().getResourceAccess();
    
    if (resourceAccess != null) {
      grantedAuthorities.addAll(
        resourceAccess.entrySet().stream().flatMap(
          access -> access.getValue().getRoles().stream().map(
            // role -> access.getKey() + ":" + role
            role -> role
          )
        ).map(
          role -> new KeycloakRole(role)
        ).collect(Collectors.toList())
      );
    }

    System.out.println("\n");
    System.out.println(grantedAuthorities);
    System.out.println("\n");

    return new KeycloakAuthenticationToken(token.getAccount(), token.isInteractive(), mapAuthorities(grantedAuthorities));
  }

  private Collection<? extends GrantedAuthority> mapAuthorities(Collection<? extends GrantedAuthority> authorities)  {
    return grantedAuthoritiesMapper != null ? grantedAuthoritiesMapper.mapAuthorities(authorities) : authorities;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return KeycloakAuthenticationToken.class.isAssignableFrom(authentication);
  }

}