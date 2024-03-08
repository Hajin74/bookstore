package eliceproject.bookstore.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private Long userId;
    private Long addressId;
    private List<OrderBookRequest> orderBookRequestList;
}
