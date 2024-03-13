package eliceproject.bookstore.cart;

import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import eliceproject.bookstore.exception.UserNotFoundException;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartServiceImpl cartService;
    private final UserRepository userRepository;

    @Autowired
    public CartController(CartServiceImpl cartService, UserRepository userRepository) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    @PostMapping("/cart")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> create(@Valid @RequestBody CartRequestDto req) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());
        if (user == null) {
            throw new UserNotFoundException("User not found: " + authentication.getName());
        }
        cartService.create(req, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<CartItemResponseDto>> findAll() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());
        if (user == null) {
            throw new UserNotFoundException("User not found: " + authentication.getName());
        }
        List<CartItemResponseDto> cartItems = cartService.findAll(user);
        return ResponseEntity.ok().body(cartItems);
    }

    @DeleteMapping("/carts/{cartItemId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> deleteById(@PathVariable("cartItemId") Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());
        if (user == null) {
            throw new UserNotFoundException("User not found: " + authentication.getName());
        }
        cartService.deleteById(id, user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/carts/buying")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> buyingAll() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());
        if (user == null) {
            throw new UserNotFoundException("User not found: " + authentication.getName());
        }
        cartService.buyingAll(user);
        return ResponseEntity.ok().build();
    }
}