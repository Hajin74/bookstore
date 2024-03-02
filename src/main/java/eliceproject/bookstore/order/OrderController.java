package eliceproject.bookstore.order;

import eliceproject.bookstore.order.dto.OrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/myroom/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /* 주문 생성 */
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        return new ResponseEntity<>(orderService.create(orderRequest), HttpStatus.OK);
    }

}
