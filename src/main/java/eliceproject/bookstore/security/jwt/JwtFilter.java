package eliceproject.bookstore.security.jwt;

import eliceproject.bookstore.security.CustomUserDetails;
import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(authorizationHeader == null){
            filterChain.doFilter(request, response);
            return;
        }

        if(!authorizationHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
        }

        String token = authorizationHeader.split(" ")[1]; // 1로 바꾸기

        if(JwtUtil.isExpired(token)){
            filterChain.doFilter(request, response);
        }

        String username = JwtUtil.getUsername(token);
        User user = userRepository.findByUsername(username);

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication((authToken));

        filterChain.doFilter(request, response);
    }
}
