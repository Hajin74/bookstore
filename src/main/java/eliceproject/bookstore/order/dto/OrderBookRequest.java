package eliceproject.bookstore.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderBookRequest {
    private Long bookId;
    private int stock;
}
