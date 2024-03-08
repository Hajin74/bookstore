package eliceproject.bookstore.order.dto;

import eliceproject.bookstore.address.Address;
import eliceproject.bookstore.address.AddressDTO;
import eliceproject.bookstore.order.Order;
import eliceproject.bookstore.order.OrderBook;
import eliceproject.bookstore.order.OrderStatus;
import eliceproject.bookstore.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class OrderDTO {
    private Long id;
    private User user;
    private Address address;
    private List<OrderBook> orderBookList;
    private OrderStatus orderStatus;
    private LocalDateTime orderDate;

    public static OrderDTO toDTO(Order order) {
        OrderDTO dto =  OrderDTO.builder()
                .id(order.getId())
                .user(order.getUser())
                .address(order.getAddress())
                .orderBookList(order.getOrderBookList())
                .orderStatus(order.getOrderStatus())
                .orderDate(order.getOrderDate())
                .build();

        System.out.println(dto);
        return dto;
    }
}


