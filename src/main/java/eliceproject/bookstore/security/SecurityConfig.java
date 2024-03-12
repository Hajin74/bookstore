package eliceproject.bookstore.security;

import eliceproject.bookstore.security.jwt.JwtFilter;
import eliceproject.bookstore.security.jwt.JwtUtil;
import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorizeRequest)->authorizeRequest
                        .requestMatchers("/**","login/login.html","register/register.html","user-finder/**").permitAll()
                        .requestMatchers("/register","/username-finder","password-finder","login","/user").permitAll()
                        .requestMatchers("/common/header.js","/register/register.js","/login/login.js").permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .requestMatchers("/css/**").permitAll()
                        .requestMatchers("/user","/api/order/**","/api/address/**").hasRole(User.Role.USER.name())
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtFilter(userRepository,jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
