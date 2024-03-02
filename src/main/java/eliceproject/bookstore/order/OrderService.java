package eliceproject.bookstore.order;

import eliceproject.bookstore.order.dto.OrderRequest;

import java.util.List;

public interface OrderService {

    Order create(OrderRequest orderRequest);

}
