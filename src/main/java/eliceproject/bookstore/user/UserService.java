package eliceproject.bookstore.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User save(UserDto userDto) {
        validateDuplicateUserId(userDto);
        validateEqualsPassword(userDto);
        validateDuplicateEmail(userDto);
        validateDuplicatePhoneNumber(userDto);

        User user = userDto.toUser();
        return userRepository.save(user);
    }

    private void validateDuplicatePhoneNumber(UserDto userDto) {
        User finduser = userRepository.findByPhoneNumber(userDto.getPhoneNumber());
        if(finduser != null){
            throw new IllegalStateException("동일한 핸드폰 번호로 가입한 계정이 있습니다.");
        }
    }

    private void validateDuplicateEmail(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail());
        if(user != null){
            throw new IllegalStateException("동일한 이메일로 가입한 계정이 있습니다.");
        }
    }

    private void validateEqualsPassword(UserDto userDto) {
        if(!userDto.getPassword().equals(userDto.getPasswordConfirm())){
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }
    }

    private void validateDuplicateUserId(UserDto userDto) {
        User user = userRepository.findByUserId(userDto.getUserId());
        if(user != null){
            throw new IllegalStateException("중복되는 아이디가 있습니다.");
        }
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(long id) {

        User user = userRepository.findById(id).orElse(null);
        if(user==null){
            throw new IllegalStateException("계정 찾기를 실패하였습니다.");
        }
        return user;
    }
}
