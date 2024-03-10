package eliceproject.bookstore.order;

import eliceproject.bookstore.exception.OutOfStockException;
import eliceproject.bookstore.order.dto.OrderDTO;
import eliceproject.bookstore.order.dto.OrderRequest;

import java.util.List;
import java.util.Map;

public interface OrderService {

    Order create(OrderRequest orderRequest) throws OutOfStockException;

    List<OrderDTO> findAll();

    Order findById(Long orderId);

    List<OrderDTO> findByUserId(Long userId);
}
