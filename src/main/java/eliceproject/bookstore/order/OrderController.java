package eliceproject.bookstore.order;

import eliceproject.bookstore.order.dto.OrderDTO;
import eliceproject.bookstore.order.dto.OrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /* 주문 전체 조회 */
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrder() {
        return new ResponseEntity<>(orderService.findAll(), HttpStatus.OK);
    }

    /* 주문 아이디로 조회 */
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        Order findOrder = orderService.findById(orderId);
        return new ResponseEntity<>(OrderDTO.toDTO(findOrder), HttpStatus.OK);
    }

}
