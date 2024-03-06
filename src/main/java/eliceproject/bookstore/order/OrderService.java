package eliceproject.bookstore.order;

import eliceproject.bookstore.order.dto.OrderDTO;
import eliceproject.bookstore.order.dto.OrderRequest;

import java.util.List;

public interface OrderService {

    Order create(OrderRequest orderRequest);

    List<OrderDTO> findAll();

    Order findById(Long orderId);

}
