package eliceproject.bookstore.exception;

public class LakingOfBookQuantityException extends RuntimeException{
    public LakingOfBookQuantityException(String message) {
        super(message);
    }
}
