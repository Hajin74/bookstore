package eliceproject.bookstore.security;

import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("CustomUserDetailsService.loadUserByUsername");
        User user = userRepository.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException("해당아이디는 존재하지 않음");
        }
        return new CustomUserDetails(user);
    }
}
