package eliceproject.bookstore.cart;

import eliceproject.bookstore.user.User;
import eliceproject.bookstore.book.Book;
import eliceproject.bookstore.cart.CartRequestDto;
import eliceproject.bookstore.cart.CartItemResponseDto;

import java.util.List;

public interface CartService {
    void create(CartRequestDto req, User user);
    List<CartItemResponseDto> findAll(User user);
    void deleteById(Long id, User user);
    void buyingAll(User user);
}