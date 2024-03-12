package eliceproject.bookstore.cart;

import eliceproject.bookstore.cart.CartService;
import eliceproject.bookstore.user.User;
import eliceproject.bookstore.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/Cart")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    @PostMapping("/carts")
    @ResponseStatus(HttpStatus.CREATED)
    public Response create(@Valid @RequestBody CartRequestDto req) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUserId(authentication.getName()).orElseThrow(UserNotFoundException::new);
        cartService.create(req, user);
        return Response.success();
    }

    @GetMapping("/carts")
    @ResponseStatus(HttpStatus.OK)
    public Response findAll() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow(UserNotFoundException::new);
        return Response.success(cartService.findAll(user));
    }

    @DeleteMapping("/carts/{cartItemId}")
    @ResponseStatus(HttpStatus.OK)
    public Response deleteById(@PathVariable("cartItemId") Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow(UserNotFoundException::new);
        cartService.deleteById(id, user);
        return Response.success();
    }

    @PostMapping("/carts/buying")
    @ResponseStatus(HttpStatus.OK)
    public Response buyingAll() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow(UserNotFoundException::new);
        cartService.buyingAll(user);
        return Response.success();
    }
}