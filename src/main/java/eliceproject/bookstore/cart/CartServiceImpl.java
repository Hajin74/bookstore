package eliceproject.bookstore.cart;

import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import eliceproject.bookstore.cart.CartItemRepository;
import eliceproject.bookstore.book.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public void create(CartRequestDto req, User user) {
        Book book = bookRepository.findById(req.getBook_id()).orElseThrow(BookNotFoundException::new);

        if (book.getQuantity() < req.getQuantity()) {
            throw new LakingOfBookQuantity();
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
        Cart cart = cartRepository.findCartByUser(user).orElseThrow(CartNotFoundException::new);

        List<CartItem> items = cartItemRepository.findAllByCart(cart);
        List<CartItemResponseDto> result = new ArrayList<>();

        for(CartItem item : items) {
            Book book = item.getBook();
            result.add(new CartItemResponseDto().toDto(item, book.getName(), book.getPrice()));
        }
        return result;
    }

    @Override
    @Transactional
    public void deleteById(Long id, User user) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(CartItemNotFoundException::new);
        Cart cart = cartItem.getCart();

        if (!cart.getUser().equals(user)) {
            throw new UserNotEqualsException();
        }

        cartItemRepository.delete(cartItem);
    }

    @Override
    @Transactional
    public void buyingAll(User user) {
        Cart cart = cartRepository.findCartByUser(user).orElseThrow(CartNotFoundException::new);
        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);

        cartItems.stream().forEach(cartItem -> {
            Book book = cartItem.getBook();

            checkUserCanBuyCartItemForEach(book, user, cartItem);

            book.setQuantity(book.getQuantity() - cartItem.getQuantity());
        });
        checkUserCanBuyCartItemAll(user);
        cartRepository.delete(cart);
    }

    @Override
    public boolean checkUserCanBuyCartItemForEach(Book book, User user, CartItem cartItem) {
        if (cartItem.getQuantity() > book.getQuantity()) {
            throw new LakingOfBookQuantity();
        }
        return true;
    }
}