package eliceproject.bookstore.cart;

import eliceproject.bookstore.user.User;
import eliceproject.bookstore.book.BookRepository;
import eliceproject.bookstore.book.Book;
import eliceproject.bookstore.exception.BookNotFoundException;
import eliceproject.bookstore.exception.LakingOfBookQuantityException;
import eliceproject.bookstore.exception.CartNotFoundException;
import eliceproject.bookstore.exception.CartItemNotFoundException;
import eliceproject.bookstore.exception.UserNotEqualsException;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public void create(CartRequestDto req, User user) {
        Book book = bookRepository.findById(req.getBook_id())
                .orElseThrow(() -> new BookNotFoundException("Book not found: " + req.getBook_id()));

        if (book.getStock() < req.getQuantity()) {
            throw new LakingOfBookQuantityException("Not enough quantity available for book: " + book.getTitle());
        }

        if (cartRepository.findCartByUser(user).isEmpty()) {
            Cart cart = new Cart(user);
            cartRepository.save(cart);
        }

        Cart cart = cartRepository.findCartByUser(user).get();

        CartItem cartItem = new CartItem(cart, book, req.getQuantity());
        cartItemRepository.save(cartItem);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartItemResponseDto> findAll(User user) {
        Cart cart = cartRepository.findCartByUser(user)
                .orElseThrow(() -> new CartNotFoundException("Cart not found: " + user.getUsername()));

        List<CartItem> items = cartItemRepository.findAllByCart(cart);
        List<CartItemResponseDto> result = new ArrayList<>();

        for(CartItem item : items) {
            Book book = item.getBook();
            result.add(CartItemResponseDto.toDto(item, book.getTitle(), book.getPrice()));
        }
        return result;
    }

    @Override
    @Transactional
    public void deleteById(Long id, User user) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new CartItemNotFoundException("Cart item not found: " + id));
        Cart cart = cartItem.getCart();

        if (!cart.getUser().equals(user)) {
            throw new UserNotEqualsException("User is not the owner of the cart item.");
        }

        cartItemRepository.delete(cartItem);
    }

    @Override
    @Transactional
    public void buyingAll(User user) {
        Cart cart = cartRepository.findCartByUser(user)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for user: " + user.getUsername()));
        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);

        for (CartItem cartItem : cartItems) {
            checkUserCanBuyCartItemForEach(cartItem);
        }

        cartRepository.delete(cart);
    }

    public void checkUserCanBuyCartItemForEach(CartItem cartItem) {
        Book book = cartItem.getBook();

        if (cartItem.getQuantity() > book.getStock()) {
            throw new LakingOfBookQuantityException("Not enough quantity for book: " + book.getId());
        }

        book.setStock(book.getStock() - cartItem.getQuantity());
    }
}