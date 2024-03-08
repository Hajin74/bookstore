package eliceproject.bookstore.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

public class OutOfStockException extends Exception{
    public OutOfStockException(String message) {
        super(message);
    }
}
