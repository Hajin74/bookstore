package eliceproject.bookstore.user;

public interface UserService {
    User save(UserDto userDto);
    String findUsername(UserDto userDto);
    String findPassword(UserDto userDto);
//    boolean login(String username, String password);
    User findByUsername(String username);
    String login(String username, String password);

    void update(UserDto userDto);

    void delete(User user);
//    String login1(String username, String password);
}
