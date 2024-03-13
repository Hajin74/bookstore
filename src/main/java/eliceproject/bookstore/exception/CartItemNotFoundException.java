package eliceproject.bookstore.exception;

public class CartItemNotFoundException extends RuntimeException{
    public CartItemNotFoundException() {
        super("Cart item not found.");
    }

    public CartItemNotFoundException(String message) {
        super(message);
    }
}
