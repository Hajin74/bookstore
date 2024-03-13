package eliceproject.bookstore.exception;

public class UserNotEqualsException extends RuntimeException{
    public UserNotEqualsException() {
        super("User is not the owner of the cart.");
    }
    public UserNotEqualsException(String message) {
        super(message);
    }
}
